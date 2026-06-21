import Image from "next/image";
import Link from "next/link";

export interface EventCardProps {
  href: string;
  title: string;
  date: string;
  location: string;
  shortDescription: string;
  thumbnail: string;
}

export default function EventCard({
  href,
  title,
  date,
  location,
  shortDescription,
  thumbnail,
}: EventCardProps) {
  const isOnline = location.toLowerCase() === "online";

  return (
    <Link href={href} className="group block w-full">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 group-hover:-translate-y-1 border-t-2 border-transparent group-hover:border-[#E42325]">
        <div className="relative h-48">
          {thumbnail ? (
            <Image src={thumbnail} alt={title} fill className="object-cover" />
          ) : (
            <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
              <span className="text-[#E42325] font-bold text-lg">Sitecore Sofia UG</span>
            </div>
          )}
          <span
            className={`absolute top-2 right-2 text-white text-xs px-2 py-0.5 rounded-full ${
              isOnline ? "bg-blue-600" : "bg-green-600"
            }`}
          >
            {isOnline ? "Online" : "In-Person"}
          </span>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-zinc-900 mb-2 group-hover:text-[#E42325] transition-colors">
            {title}
          </h2>
          <div className="flex items-center text-zinc-600 text-sm mb-3">
            <span className="mr-4">📅 {date}</span>
            <span>📍 {location}</span>
          </div>
          <p className="text-zinc-600 text-sm line-clamp-3">
            {shortDescription}
          </p>
          <span className="inline-block mt-3 text-[#E42325] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View Recap →
          </span>
        </div>
      </div>
    </Link>
  );
}
