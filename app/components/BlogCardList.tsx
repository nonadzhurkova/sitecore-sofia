"use client";

import { useEffect, useRef, useState } from "react";
import BlogCard, { BlogCardProps } from "./BlogCard";

export interface BlogCardListProps {
  posts: BlogCardProps[];
}

export default function BlogCardList({ posts }: BlogCardListProps) {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleCards((prev) => new Set(prev).add(i));
            }, i * 100);
            obs.unobserve(el);
          }
        },
        { threshold: 0.1 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [posts.length]);

  if (posts.length === 0) {
    return (
      <p className="text-zinc-500 text-center py-12">
        No blog posts yet — be the first to share one!
      </p>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post, i) => (
        <div
          key={post.slug}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className={`transition-all duration-700 ease-out ${
            visibleCards.has(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <BlogCard {...post} />
        </div>
      ))}
    </div>
  );
}
