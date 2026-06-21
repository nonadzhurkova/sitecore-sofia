import About from "./components/about-box";
import CookieConsentBanner from "./components/CookieConsentBanner";
import EventCardList from "./components/EventCardList";
import EventHero from "./components/event-hero";
import Hero from "./components/hero";
import StatsStrip from "./components/StatsStrip";
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
        subtitle="Sofia's Sitecore community — real people, real code, real talk."
        backgroundImage="/sofia.jpg"
      />
      <About />

      <StatsStrip />

      <EventHero
        title="Sitecore Sofia User Group: June 2026 Edition"
        subtitle="An online session on Claude Code — from core workflow to power features."
        details={[
          "How Claude fits into your workflow",
          "Surfaces & models (Code, API, chat)",
          "The core loop",
          "CLAUDE.md — what, where, what goes inside",
          ".claudeignore — the honest answer",
          "Optimisations & context hygiene",
          "Power features: slash commands, subagents, hooks, MCP, skills",
          "Common pitfalls",
          "API best practices",
          "Cheat sheet",
        ]}
        location="Online"
        time="June 2026"
        registrationLink=""
        backgroundImage="/sofia.jpg"
        isUpcoming={true}
      />

      <EventCardList
        title="Past Events"
        subtitle="Browse highlights, recordings, and resources from previous meetups."
        events={eventCards}
        showViewAll={true}
      />
      <CookieConsentBanner />
    </div>
  );
}
