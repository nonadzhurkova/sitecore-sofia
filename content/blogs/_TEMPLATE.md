---
title: "Your Post Title Here"
date: "July 6, 2026"
author: "Your Name"
tags: ["Sitecore", "Next.js"]
coverImage: "/blogs/your-slug/cover.jpg"
excerpt: "One or two sentences summarizing the post — shown on the blog listing card."
---

Write your post body here using regular Markdown: **bold**, _italics_, `inline code`,
[links](https://example.com), lists, and fenced code blocks all work.

## A section heading

More content...

```ts
console.log("code blocks are supported too");
```

<!--
How to publish a post:
1. Copy this file to content/blogs/<your-slug>.md (filename becomes the URL slug).
2. Fill in the frontmatter above. `author` should match a name in app/data/community.ts
   to automatically pick up your headshot + LinkedIn link; any other name still works,
   it just falls back to initials.
3. Drop any images in public/blogs/<your-slug>/ and reference them with that path.
4. Open a PR. Files starting with "_" (like this template) are ignored by the blog list.
-->
