import Image from "next/image";
import Link from "next/link";
import Hero from "./components/hero";
import About from "./components/about-box";
import EventHero from "./components/event-hero";
import CookieConsentBanner from "./components/CookieConsentBanner";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero 
        title="Welcome to Sitecore Sofia User Group"
        subtitle="Join Our Community of Sitecore Developers, Architects, and Enthusiasts"
        backgroundImage="/sofia.jpg"
      />
      <About/>

      <EventHero  
        title="SUGCON 2025 Highlights & Live Coding - June 11th"
        subtitle="This event has passed. Check out the presentation, resources, and photo gallery from our exciting evening featuring SUGCON insights and live website development!"
        details={[
          "SUGCON 2025 key takeaways and experiences",
          "Live coding demo of this website",
          "Photo gallery from the event",
          "Presentation and resources available"
        ]}
        location="Campus X, Sofia"
        time="June 11th, 2025"
        registrationLink="/past-events/june-2025-meetup"
        backgroundImage="/events/june-2025-meetup/gallery/Image (1).jpg"
        isPast={true}
      />

      <EventHero 
        title="Save the Date - September 2025"
        subtitle="Our next big event is coming! Stay tuned for more details about this exciting gathering of the Sitecore community."
        details={[]}
        location="Sofia, Bulgaria"
        time="September 2025"
        registrationLink="#"
        backgroundImage="/sofia.jpg"
        isUpcoming={true}
      />
      <CookieConsentBanner />
    </div>
  );
}
