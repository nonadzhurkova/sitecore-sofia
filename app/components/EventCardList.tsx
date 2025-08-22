import EventCard, { EventCardProps } from "./EventCard";

export interface EventCardListProps {
  title: string;
  subtitle?: string;
  events: EventCardProps[];
}

export default function EventCardList({
  title,
  subtitle,
  events,
}: EventCardListProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-zinc-900 mb-2">{title}</h2>
      {subtitle ? <p className="text-zinc-600 mb-8">{subtitle}</p> : null}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <EventCard key={event.href} {...event} />
        ))}
      </div>
    </section>
  );
}
