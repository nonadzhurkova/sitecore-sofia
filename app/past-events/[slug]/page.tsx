import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ImageGallery from '@/app/components/ImageGallery';
import { events } from '@/app/data/events';
import { getEventGalleryImages } from '@/app/utils/gallery';

interface Resource {
  title: string;
  url: string;
  icon: string;
}

interface EventData {
  title: string;
  date: string;
  location: string;
  description: string;
  coverImage: string;
  resources: Resource[];
  gallery: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
}

interface EventDataMap {
  [key: string]: EventData;
}

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = events[slug];

  if (!event) {
    return {
      title: 'Event Not Found',
      description: 'The requested event could not be found.',
    };
  }

  return {
    title: event.title,
    description: event.shortDescription,
    openGraph: {
      title: event.title,
      description: event.shortDescription,
      url: `https://sitecore-sofia.vercel.app/past-events/${slug}`,
      siteName: 'Sitecore Sofia User Group',
      images: [
        {
          url: event.coverImage,
          width: 1200,
          height: 630,
          alt: event.title
        }
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: event.title,
      description: event.shortDescription,
      images: [event.coverImage],
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(events).map((slug) => ({
    slug,
  }));
}

export default async function EventPage({ params }: Props) {
  // Await the params object
  const { slug } = await params;
  const event = events[slug];

  if (!event) {
    notFound();
  }

  const galleryImages = getEventGalleryImages(slug, event.title);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Back button */}
      <Link 
        href="/past-events"
        className="inline-flex items-center text-zinc-600 hover:text-[#E42325] mb-8"
      >
        ← Back to Past Events
      </Link>

      {/* Event header */}
      <div className="relative h-[40vh] rounded-xl overflow-hidden mb-8">
        <Image
          src={event.coverImage}
          alt={event.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
            <div className="flex justify-center gap-6 text-lg">
              <span>📅 {event.date}</span>
              <span>📍 {event.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Event description */}
      <div className="prose max-w-none mb-12">
        {event.description.split('\n\n').map((paragraph, index) => (
          <p key={index} className="text-lg text-zinc-600 mb-6 last:mb-0">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Resources section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 mb-6">Useful Resources</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {event.resources.map((resource, index) => (
            <a
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <span className="text-2xl">{resource.icon}</span>
              <span className="text-zinc-900">{resource.title}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Gallery section */}
      {galleryImages.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 mb-6">Event Gallery</h2>
          <ImageGallery images={galleryImages} />
        </div>
      )}
    </div>
  );
} 