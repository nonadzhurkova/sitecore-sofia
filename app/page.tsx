import About from "./components/about-box";
import CookieConsentBanner from "./components/CookieConsentBanner";
import EventCardList from "./components/EventCardList";
import EventHero from "./components/event-hero";
import Hero from "./components/hero";
import { events } from "./data/events";

export default function Home() {
  const eventCards = Object.entries(events).map(([slug, event]) => ({
    href: `/past-events/${slug}`,
    title: event.title,
    date: event.date,
    location: event.location,
    shortDescription: event.shortDescription,
    thumbnail: event.thumbnail,
  }));
  return (
    <div className="overflow-x-hidden">
      <Hero
        title="Welcome to Sitecore Sofia User Group"
        subtitle="Join Our Community of Sitecore Developers, Architects, and Enthusiasts"
        backgroundImage="/sofia.jpg"
      />
      <About />

      <EventHero
        title="Sitecore Sofia User Group: June 2026 Edition"
        subtitle="We're planning an in-person event in June — details coming soon. Stay tuned!"
        details={[]}
        location="Sofia"
        time="June 2026"
        registrationLink=""
        backgroundImage="/sofia.jpg"
        isUpcoming={true}
      />

      <EventCardList
        title="Past Events"
        subtitle="Browse highlights, recordings, and resources from previous meetups."
        events={eventCards}
      />
      <CookieConsentBanner />
    </div>
  );
}
