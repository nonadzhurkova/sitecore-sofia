import Image from "next/image";
import Link from "next/link";
import { members } from "@/app/data/community";

export interface BlogCardProps {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  coverImage?: string;
  readTimeMinutes: number;
}

export default function BlogCard({
  slug,
  title,
  date,
  author,
  excerpt,
  tags,
  coverImage,
  readTimeMinutes,
}: BlogCardProps) {
  const authorInfo = members.find((m) => m.name === author);

  return (
    <Link href={`/blogs/${slug}`} className="group block h-full">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 group-hover:-translate-y-1 border-t-2 border-transparent group-hover:border-[#E42325] h-full flex flex-col">
        <div className="relative h-48 flex-shrink-0">
          {coverImage ? (
            <Image src={coverImage} alt={title} fill className="object-cover" />
          ) : (
            <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
              <span className="text-[#E42325] font-bold text-lg">Sitecore Sofia UG</span>
            </div>
          )}
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h2 className="text-xl font-semibold text-zinc-900 mb-2 group-hover:text-[#E42325] transition-colors">
            {title}
          </h2>
          <p className="text-zinc-600 text-sm line-clamp-3 flex-grow">{excerpt}</p>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-amber-50 text-amber-700 border border-amber-200 text-xs px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-100">
            <div className="flex items-center gap-2">
              {authorInfo?.headshot ? (
                <div className="w-8 h-8 rounded-full overflow-hidden relative flex-shrink-0">
                  <Image src={authorInfo.headshot} alt={author} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#E42325] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {authorInfo?.initials ?? author.slice(0, 2).toUpperCase()}
                </div>
              )}
              <span className="text-sm text-zinc-700">{author}</span>
            </div>
            <span className="text-xs text-zinc-400 whitespace-nowrap">
              {date} · {readTimeMinutes} min read
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
