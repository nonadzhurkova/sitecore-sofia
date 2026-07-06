---
title: "Finding Duplicate Media Library Items in Sitecore (Properly)"
date: "July 6, 2026"
author: "Yonko Borisov"
tags: ["Sitecore", "PowerShell", "Media Library"]
excerpt: "A client asked us to find duplicate media under a specific path — a name check wasn't enough, so we built a size-then-hash script using Sitecore PowerShell Extensions."
---

A recent client request sounded simple on paper: check the Media Library under a specific path for duplicate items.
In practice, "duplicate" turned out to be the hard part to define.

## Why a name check isn't enough

The obvious first instinct is to just look for items with the same name. That falls apart quickly in a real Media
Library:

- Editors re-upload the exact same image under a different name all the time (`hero-final.jpg`, `hero-final-v2.jpg`,
  `hero-final-USE-THIS-ONE.jpg` — you know the drill).
- Two completely different images can happen to share a generic name (`banner.png` in ten different folders).

So a name match is neither necessary nor sufficient for "this is a duplicate." What we actually want is: **are these
two items byte-for-byte the same file?** I looked for an existing script that did this properly and couldn't find
one, so I wrote it.

## The approach

Hashing every single media stream in a large tree is expensive — it means reading every blob off the database just
to compare files that were never going to match anyway. The script avoids that with a two-pass strategy:

1. **Group by the stored `Size` field first.** This is a cheap, no-I/O comparison — two files with different byte
   sizes can never be identical, so this eliminates almost everything without touching a single media stream.
2. **Only within a same-size group, compute an MD5 hash of the actual media stream.** This is where we pay the
   I/O cost, but only for items that already passed the cheap filter. Matching hashes confirm the files are
   genuinely identical, not just coincidentally the same size.

MD5 is fine here — this isn't a security context, just a content fingerprint to confirm two blobs are the same.

The script runs in the **Sitecore PowerShell Extensions (SPE)** console, groups results into duplicate sets, prints
a readable summary, and renders a `Show-ListView` grid (with CSV export) so you can hand the report straight to the
client or a content editor to clean up.

## The script

```powershell
# ==============================================================================
#  Find-DuplicateMediaItems.ps1
#  Run in Sitecore PowerShell Extensions (SPE) console.
#
#  Strategy:
#    1. Collect all non-folder media items under $rootPath.
#    2. Group by the stored "Size" field value (fast, no I/O).
#    3. Within each same-size group, compute an MD5 hash of the actual media
#       stream to confirm the files are byte-for-byte identical.
#    4. Display results in a grid and print a summary to the console.
# ==============================================================================

# ── CONFIGURE ──────────────────────────────────────────────────────────────────
$rootPath = "master:/"   # change as needed
$database = "master"
# ──────────────────────────────────────────────────────────────────────────────

function Get-MD5Hash {
    param([System.IO.Stream]$stream)
    $md5    = [System.Security.Cryptography.MD5]::Create()
    $bytes  = $md5.ComputeHash($stream)
    $md5.Dispose()
    return ([System.BitConverter]::ToString($bytes)).Replace("-", "")
}

Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "  Duplicate Media Finder" -ForegroundColor Cyan
Write-Host "  Root : $rootPath" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan

# Step 1 – collect all media items (skip folders, skip items with no size)
Write-Host "`n[1/3] Collecting media items..." -ForegroundColor Yellow

$allMedia = Get-ChildItem -Path $rootPath -Recurse |
    Where-Object {
        # Folder templates end with "Folder"; media files have a numeric Size field
        -not $_.TemplateName.ToLower().Contains("folder") -and
        $_["Size"] -match "^\d+$" -and
        [int]$_["Size"] -gt 0
    }

Write-Host "      $($allMedia.Count) media item(s) found." -ForegroundColor Gray

if ($allMedia.Count -eq 0) {
    Write-Host "`nNo media items found under the specified path." -ForegroundColor Green
    return
}

# Step 2 – pre-filter: only size groups with 2+ items need hashing
Write-Host "`n[2/3] Grouping by file size..." -ForegroundColor Yellow

$sizeGroups = $allMedia |
    Group-Object { $_["Size"] } |
    Where-Object { $_.Count -gt 1 }

Write-Host "      $($sizeGroups.Count) size group(s) with potential duplicates." -ForegroundColor Gray

if ($sizeGroups.Count -eq 0) {
    Write-Host "`nNo files share the same size — no duplicates exist." -ForegroundColor Green
    return
}

# Step 3 – compute MD5 hash for every item in a same-size group
Write-Host "`n[3/3] Computing MD5 hashes to confirm duplicates..." -ForegroundColor Yellow

$report        = [System.Collections.Generic.List[PSCustomObject]]::new()
$duplicateGroup = 1
$errors        = 0

foreach ($sizeGroup in $sizeGroups) {
    $hashBuckets = @{}

    foreach ($item in $sizeGroup.Group) {
        try {
            $mediaItem   = [Sitecore.Data.Items.MediaItem]$item
            $media       = [Sitecore.Resources.Media.MediaManager]::GetMedia($mediaItem)
            $mediaStream = $media.GetStream()

            if ($null -eq $mediaStream -or $null -eq $mediaStream.Stream) {
                Write-Warning "No stream for: $($item.Paths.FullPath)"
                continue
            }

            $hash = Get-MD5Hash -stream $mediaStream.Stream
            $mediaStream.Stream.Dispose()

            if (-not $hashBuckets.ContainsKey($hash)) {
                $hashBuckets[$hash] = [System.Collections.Generic.List[PSCustomObject]]::new()
            }

            $hashBuckets[$hash].Add([PSCustomObject]@{
                "Group"        = 0                                              # set below
                "Name"         = $item.Name
                "Extension"    = $item["Extension"]
                "Size (bytes)" = [int]$item["Size"]
                "Size (KB)"    = [math]::Round([int]$item["Size"] / 1KB, 1)
                "MD5 Hash"     = $hash
                "Full Path"    = $item.Paths.FullPath
                "Item ID"      = $item.ID.ToString()
                "Updated"      = $item.Statistics.Updated.ToString("yyyy-MM-dd HH:mm")
                "Updated By"   = $item.Statistics.UpdatedBy
            })
        }
        catch {
            Write-Warning "Error reading $($item.Paths.FullPath): $_"
            $errors++
        }
    }

    # Only keep buckets with 2+ identical files
    foreach ($hash in $hashBuckets.Keys) {
        $bucket = $hashBuckets[$hash]
        if ($bucket.Count -lt 2) { continue }

        foreach ($row in $bucket) { $row.Group = $duplicateGroup }
        $report.AddRange($bucket)
        $duplicateGroup++
    }
}

# ── Output ──────────────────────────────────────────────────────────────────

Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan

if ($report.Count -eq 0) {
    Write-Host "  No true duplicates found." -ForegroundColor Green
    Write-Host "  (Size matches were false positives — hashes differed.)" -ForegroundColor Gray
}
else {
    $totalGroups = $duplicateGroup - 1
    Write-Host "  $totalGroups duplicate group(s) found — $($report.Count) items involved." -ForegroundColor Yellow

    # Console summary grouped by duplicate set
    Write-Host ""
    $prevGroup = -1
    $report | Sort-Object Group, "Full Path" | ForEach-Object {
        if ($_.Group -ne $prevGroup) {
            Write-Host ""
            Write-Host "  ── Group $($_.Group)  [$($_.'MD5 Hash')]  $($_.'Size (KB)') KB ──" -ForegroundColor Red
            $prevGroup = $_.Group
        }
        Write-Host "     $($_.'Full Path')" -ForegroundColor White
    }

    $props = @{
        InfoTitle       = "Duplicate Media Items"
        InfoDescription = "Found $totalGroups duplicate group(s) — $($report.Count) items involved. Items in the same group are byte-for-byte identical (confirmed by MD5 hash). Use the export button above the list to download as CSV."
        PageSize        = 25
    }

    $report |
        Sort-Object Group, "Full Path" |
        Show-ListView @props -Property `
            @{Label="Group";       Expression={$_.Group}},
            @{Label="Name";        Expression={$_.Name}},
            @{Label="Extension";   Expression={$_.Extension}},
            @{Label="Size (KB)";   Expression={$_."Size (KB)"}},
            @{Label="MD5 Hash";    Expression={$_."MD5 Hash"}},
            @{Label="Full Path";   Expression={$_."Full Path"}},
            @{Label="Updated";     Expression={$_.Updated}},
            @{Label="Updated By";  Expression={$_."Updated By"}},
            @{Label="Item ID";     Expression={$_."Item ID"}}
}

if ($errors -gt 0) {
    Write-Host "`n  $errors item(s) could not be read — check warnings above." -ForegroundColor DarkYellow
}

Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""
```

## Using it

1. Open the SPE console (or a saved script in the Script Library) against the environment you want to check.
2. Set `$rootPath` to the Media Library path you care about — it doesn't have to be the whole tree, which matters
   if you're only cleaning up one client's section of a shared instance.
3. Run it. The console prints a live summary as it works through each size group, then opens a grid view of every
   duplicate group found, exportable to CSV for handing off to whoever owns the cleanup.

## Caveats

- This only catches **exact** duplicates. A resized, re-compressed, or re-saved copy of the same image will have a
  different hash and won't be flagged — this is a byte-identity check, not a perceptual/visual similarity check.
- It reads the actual blob for every item in a same-size group, so a path with a huge number of same-sized files
  (e.g. a folder full of similarly-sized PDFs) will take longer than one with mostly unique sizes. In practice this
  was still fast enough for a full client media tree.
