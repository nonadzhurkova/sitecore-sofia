import { Metadata } from "next";
import BlogCardList from "@/app/components/BlogCardList";
import { getAllBlogPosts } from "@/app/utils/blogs";

export const metadata: Metadata = {
  title: "Blog — Sitecore Sofia User Group",
  description: "Write-ups, deep dives, and lessons learned from the Sitecore Sofia community.",
};

export default function BlogsPage() {
  const posts = getAllBlogPosts();

  return (
    <div>
      <section className="bg-zinc-900 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-3">Blog</h1>
          <p className="text-zinc-400 text-lg">
            Write-ups, deep dives, and lessons learned from the community
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <BlogCardList
          posts={posts.map((post) => ({
            slug: post.slug,
            title: post.title,
            date: post.date,
            author: post.author,
            excerpt: post.excerpt,
            tags: post.tags,
            coverImage: post.coverImage,
            readTimeMinutes: post.readTimeMinutes,
          }))}
        />
      </div>
    </div>
  );
}
