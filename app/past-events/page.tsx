import Link from 'next/link';
import Image from 'next/image';
import { events } from '../data/events';

export default function PastEvents() {
  // Convert events object to array and sort by date in descending order
  const sortedEvents = Object.entries(events)
    .map(([slug, event]) => ({
      ...event,
      slug
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-zinc-900 mb-8">Past Events</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedEvents.map((event) => (
          <Link 
            href={`/past-events/${event.slug}`} 
            key={event.id}
            className="group"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
              <div className="relative h-48">
                <Image
                  src={event.thumbnail}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-zinc-900 mb-2 group-hover:text-[#E42325] transition-colors">
                  {event.title}
                </h2>
                <div className="flex items-center text-zinc-600 text-sm mb-3">
                  <span className="mr-4">📅 {event.date}</span>
                  <span>📍 {event.location}</span>
                </div>
                <p className="text-zinc-600 text-sm line-clamp-3">
                  {event.shortDescription}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 