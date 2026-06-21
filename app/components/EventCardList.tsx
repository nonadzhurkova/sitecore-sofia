"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import EventCard, { EventCardProps } from "./EventCard";

export interface EventCardListProps {
  title: string;
  subtitle?: string;
  events: EventCardProps[];
  showViewAll?: boolean;
}

export default function EventCardList({
  title,
  subtitle,
  events,
  showViewAll = false,
}: EventCardListProps) {
  const headingRef = useRef<HTMLDivElement>(null);
  const [headingVisible, setHeadingVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeadingVisible(true); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

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
  }, [events.length]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div
        ref={headingRef}
        className={`transition-all duration-700 ease-out ${
          headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <h2 className="text-4xl font-bold text-zinc-900 mb-2">{title}</h2>
        {subtitle ? <p className="text-zinc-600 mb-8">{subtitle}</p> : null}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, i) => (
          <div
            key={event.href}
            ref={(el) => { cardRefs.current[i] = el; }}
            className={`transition-all duration-700 ease-out ${
              visibleCards.has(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <EventCard {...event} />
          </div>
        ))}
      </div>

      {showViewAll && (
        <div className="text-center mt-10">
          <Link
            href="/past-events"
            className="inline-block bg-[#E42325] text-white font-bold px-6 py-3 rounded-full hover:bg-[#c41f21] transition-colors"
          >
            View All Events →
          </Link>
        </div>
      )}
    </section>
  );
}
