import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { members } from "@/app/data/community";
import { getAllBlogPosts, getBlogPost } from "@/app/utils/blogs";
import CodeBlock from "@/app/components/CodeBlock";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://sitecore-sofia.vercel.app/blogs/${slug}`,
      siteName: "Sitecore Sofia User Group",
      images: post.coverImage
        ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }]
        : undefined,
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const authorInfo = members.find((m) => m.name === post.author);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/blogs" className="inline-flex items-center text-zinc-600 hover:text-[#E42325] mb-8">
        ← Back to Blog
      </Link>

      {post.coverImage && (
        <div className="relative h-[40vh] rounded-xl overflow-hidden mb-8">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
        </div>
      )}

      <h1 className="text-4xl font-bold text-zinc-900 mb-4">{post.title}</h1>

      <div className="flex items-center gap-3 mb-8 pb-8 border-b border-zinc-100">
        {authorInfo?.headshot ? (
          <div className="w-10 h-10 rounded-full overflow-hidden relative flex-shrink-0">
            <Image src={authorInfo.headshot} alt={post.author} fill className="object-cover" />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#E42325] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
            {authorInfo?.initials ?? post.author.slice(0, 2).toUpperCase()}
          </div>
        )}
        <div>
          <p className="text-zinc-900 font-medium text-sm">{post.author}</p>
          <p className="text-zinc-500 text-sm">
            {post.date} · {post.readTimeMinutes} min read
          </p>
        </div>
      </div>

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-8">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-amber-50 text-amber-700 border border-amber-200 text-xs px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="prose prose-zinc max-w-none prose-a:text-[#E42325] prose-headings:text-zinc-900">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ pre: CodeBlock }}>
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
