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
        title="SUGCON Recap: Sitecore AI, Architecture & Digital Experience"
        subtitle="Sitecore Sofia User Group is organizing an online event to share key takeaways from SUGCON, focusing on Sitecore AI, architecture, and the evolving digital experience landscape."
        details={[
          "Four Pillars, Four Platforms: A Practical Comparison of Sitecore AI and Its Main Competitors",
          "Post-Quantum Cryptography — Why It Matters for Sitecore Developers (Right Now)",
          "The Sitecore AI Migration Middle State Nobody Talks About",
          "Exploring Sitecore AI Publishing — How to Make Your Authors Love Publishing Again",
          "MC-what-the-P is that? And how does it relate to Sitecore",
          "How ChatGPT, Gemini & Co. \"see\" your Sitecore site",
          "CDP & Personalize highlights",
        ]}
        location="Online"
        time="April 24, 12:00 (Sofia time)"
        registrationLink="https://forms.gle/zd5cXxR9dt3tT9NQ7"
        backgroundImage="/mcp.jpg"
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
