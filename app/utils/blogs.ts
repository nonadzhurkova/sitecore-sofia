import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOGS_DIR = path.join(process.cwd(), "content", "blogs");
const WORDS_PER_MINUTE = 200;

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  tags: string[];
  coverImage?: string;
  excerpt: string;
  content: string;
  readTimeMinutes: number;
}

function parseBlogFile(slug: string, raw: string): BlogPost {
  const { data, content } = matter(raw);
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    author: data.author ?? "Unknown",
    tags: data.tags ?? [],
    coverImage: data.coverImage,
    excerpt: data.excerpt ?? "",
    content,
    readTimeMinutes: Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE)),
  };
}

export function getAllBlogPosts(): BlogPost[] {
  let files: string[];
  try {
    files = fs.readdirSync(BLOGS_DIR);
  } catch {
    return [];
  }

  return files
    .filter((file) => file.endsWith(".md") && !file.startsWith("_"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(BLOGS_DIR, file), "utf8");
      return parseBlogFile(slug, raw);
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOGS_DIR, `${slug}.md`);
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return parseBlogFile(slug, raw);
  } catch {
    return null;
  }
}
