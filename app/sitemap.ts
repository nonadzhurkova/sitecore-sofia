import { MetadataRoute } from "next";
import { events } from "@/app/data/events";
import { getAllBlogPosts } from "@/app/utils/blogs";

const BASE_URL = "https://sitecore-sofia.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/past-events`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/blogs`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/community`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/materials`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const eventRoutes: MetadataRoute.Sitemap = Object.keys(events).map((slug) => ({
    url: `${BASE_URL}/past-events/${slug}`,
    lastModified: new Date(events[slug].date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: `${BASE_URL}/blogs/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...eventRoutes, ...blogRoutes];
}
