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
        title="Sitecore User Group Sofia: Fall 2025 Edition"
        subtitle="​We’re thrilled to invite you to the second edition of the Sitecore Sofia User Group Event, hosted by Americaneagle.com!"
        details={[
          "6:30–7:00 — Sitecore for non‑technical audiences",
          "7:15–7:45 — Inside Sitecore Search: extractor & search flow",
          "7:45–8:30 — Networking & Q&A",
          "Food and drinks provided",
          "Special merch giveaways",
        ]}
        location="Campus X, Sofia"
        time="September 30th, 2025"
        registrationLink="https://lu.ma/tn8ocr2d?fbclid=IwY2xjawMU-ntleHRuA2FlbQIxMQBicmlkETBqTTE2UEdRcU12ZWZQUFpSAR5Z3g75yQ_hnyHeSJ2CC3Vjj5sjuR7JaM-XKq2g5t-UBvxxbRZvNO2zeAV1aw_aem_Oc2yaJY1jVMt_myotDnesA"
        backgroundImage="/events/june-2025-meetup/gallery/Image (3).jpg"
        isPast={false}
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
