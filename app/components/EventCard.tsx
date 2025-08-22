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
  return (
    <Link href={href} className="group block w-full max-w-sm mx-auto my-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
        <div className="relative h-48">
          <Image src={thumbnail} alt={title} fill className="object-cover" />
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
        </div>
      </div>
    </Link>
  );
}
