import Image from "next/image";
import Header from "./components/header";
import Footer from "./components/footer";
import Hero from "./components/hero";
import About from "./components/about-box";
import EventHero from "./components/event-hero";
export default function Home() {
  const currentEventDetails = [
    "Talks about the latest in web development",
    "How to launch a web app in minutes with Next.js + Vercel",
    "Networking with great people from IT and digital world",
    "And... a raffle for a brand new iPad! 🎁"
  ];

  return (
   <div className="overflow-x-hidden">
      <Header/>
      <main className="pt-4"> 
      <Hero 
          title="Welcome to Sitecore Sofia User Group"
          subtitle="Join Our Community of Sitecore Developers, Architects, and Enthusiasts"
          backgroundImage="/sofia.jpg"
        />
        <About/>

        <EventHero  
          title="Join Our Next Event - June 11th"
          subtitle="Love technology? Want to hear about the latest in web development and meet awesome people from the industry?"
          details={currentEventDetails}
          location="Campus X, Sofia"
          time="June 11th, 6:00 PM"
          registrationLink="https://lu.ma/zqpmiuj4"
          backgroundImage="/campusx.webp"
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
      </main>
      <Footer/>
       
    </div>
  );
}
