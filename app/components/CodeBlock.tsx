"use client";

import { useState } from "react";

function getTextContent(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getTextContent).join("");
  if (
    node &&
    typeof node === "object" &&
    "props" in node &&
    (node as { props?: { children?: React.ReactNode } }).props?.children !== undefined
  ) {
    return getTextContent((node as { props: { children: React.ReactNode } }).props.children);
  }
  return "";
}

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  node?: unknown;
}

export default function CodeBlock({ node, children, ...rest }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = getTextContent(children).replace(/\n$/, "");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable — no-op
    }
  };

  return (
    <div className="relative group">
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy code to clipboard"
        className="absolute top-2 right-2 text-xs font-medium px-2 py-1 rounded-md bg-zinc-700/80 text-zinc-100 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity hover:bg-zinc-600"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <pre {...rest}>{children}</pre>
    </div>
  );
}
