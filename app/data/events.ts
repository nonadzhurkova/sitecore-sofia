import { getEventGalleryImages, GalleryImage } from '../utils/gallery';

export interface Resource {
  title: string;
  url: string;
  icon: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  thumbnail: string;
  shortDescription: string;
  description: string;
  coverImage: string;
  resources: Resource[];
}

export interface EventMap {
  [key: string]: Event;
}

export const events: EventMap = {
  'may-2026': {
    id: '4',
    title: 'Lunch & Learn: AI Tools for Developers + Sitecore Content Hub Deep Dive',
    date: 'May 27, 2026',
    location: 'Sofia',
    thumbnail: '/events/may-2026/gallery/PXL_20260527_090346689.jpg',
    shortDescription: 'A Lunch & Learn featuring two sessions: AI-powered developer tools (Jira aggregator, timecard generator, and Project Estimator) and a deep dive into Sitecore Content Hub development.',
    description: `A Lunch & Learn session featuring two exciting presentations from our community members.

🎤 AI Tools for Developers — Nona Dzhurkova
Nona showcased two AI tools built to solve real developer pain points — a personal command center that aggregates your Jira tickets across all projects, combines them with your calendar meetings, and generates your timecard, and the Project Estimator, which uses AI to estimate story complexity in seconds.

🎤 Sitecore Content Hub Deep Dive — Yonko Borisov
Yonko shared hands-on experience from a real client project, covering:
• Triggers, Actions & Scripts — how C# scripts automate workflows, validate data, and send notifications
• Email Notifications — including a fun discovery that email templates have no Create button in the UI (Postman to the rescue)
• Validation & Security Patterns — role-based field editing, file type enforcement, and policy owner validation
• External Components — building React + Vite components that extend the Content Hub UI
• Platform Limitations — real issues hit in production and how they were worked around with Sitecore support`,
    coverImage: '/events/may-2026/gallery/PXL_20260527_090346689.jpg',
    resources: []
  },
  'april-2026-meetup': {
    id: '3',
    title: 'SUGCON Recap + CDP & Personalize',
    date: 'April 24, 2026',
    location: 'Online',
    thumbnail: '/mcp.jpg',
    shortDescription: 'An online event in two parts: a SUGCON recap covering Sitecore AI, post-quantum cryptography, MCP, architecture, and publishing — followed by a dedicated CDP & Personalize session.',
    description: `An online event in two parts — a SUGCON Europe recap and a dedicated Sitecore CDP & Personalize session.

🎤 SUGCON Recap — Nona Dzhurkova & Yonko Borisov
Fresh from SUGCON Europe in London, Nona and Yonko shared firsthand insights and key takeaways from the sessions they attended:
• Four Pillars, Four Platforms: A Practical Comparison of Sitecore AI and Its Main Competitors
• Post-Quantum Cryptography — Why It Matters for Sitecore Developers (Right Now)
• The Sitecore AI Migration Middle State Nobody Talks About
• Exploring Sitecore AI Publishing — How to Make Your Authors Love Publishing Again
• MC-what-the-P is that? And how does it relate to Sitecore
• How ChatGPT, Gemini & Co. "see" your Sitecore site

🎤 Sitecore CDP & Personalize — Stefan Zhuntovski
Stefan Zhuntovski, Software Engineer at Americaneagle.com, led a deep dive into Sitecore CDP and Sitecore Personalize, exploring how these powerful tools help businesses deliver more meaningful, data-driven customer experiences.`,
    coverImage: '/mcp.jpg',
    resources: [
      {
        title: 'Event Recording',
        url: 'https://www.youtube.com/watch?v=ppouRKKj92E',
        icon: '🎥'
      },
      {
        title: 'Event Presentation',
        url: '/events/april-2026/SUGCON-2026%20FINAL.pptx',
        icon: '📑'
      }
    ]
  },
  'september-2025-meetup': {
    id: '2',
    title: 'Sitecore User Group Sofia: Fall 2025 Edition',
    date: 'September 30, 2025',
    location: 'Campus X, Sofia',
    thumbnail: '/events/june-2025-meetup/gallery/Image (3).jpg',
    shortDescription: 'The second edition of Sitecore Sofia User Group, hosted by Americaneagle.com. Sessions covered Sitecore for non-technical audiences and an in-depth look at Sitecore Search — extractor & search flow.',
    description: `The second edition of the Sitecore Sofia User Group Event was hosted by Americaneagle.com at Campus X, Sofia.

The evening featured two engaging sessions. The first session focused on making Sitecore accessible to non-technical audiences, breaking down complex concepts into relatable language for business stakeholders. The second session dived deep inside Sitecore Search, exploring the extractor pipeline and the end-to-end search flow.

The event wrapped up with a networking session, Q&A, food, drinks, and special merch giveaways — bringing the Sitecore community closer together.`,
    coverImage: '/events/june-2025-meetup/gallery/Image (3).jpg',
    resources: []
  },
  'june-2025-meetup': {
    id: '1',
    title: 'Sitecore Sofia User Group June 2025',
    date: 'June 11, 2025',
    location: 'Campus X, Sofia',
    thumbnail: '/events/june-2025-meetup/gallery/Image (1).jpg',
    shortDescription: 'A dual-session meetup that featured SUGCON 2025 highlights and a live coding demo where we built this website with Next.js and Vercel. An evening of insights, practical development, and community building.',
    description: `An engaging evening packed with two exciting sessions that brought our community together.

In the first session, we took attendees through the highlights of SUGCON 2025, sharing personal experiences and key takeaways from the most inspiring sessions we attended. The presentation covered not just the technical insights, but also our journey and experiences at the conference, giving everyone a firsthand perspective of what made these sessions particularly impactful.

For our second session, we did something special - a live coding demonstration where we built this very website! We showed how to rapidly develop and deploy a modern web application using Next.js and Vercel. The audience watched as we took the project from initial setup to live deployment in minutes, demonstrating the power of modern web development tools and practices.

The site is now open source! The GitHub repository is available for anyone interested in seeing how it's built, and contributions are welcome. The meetup successfully brought together both Sitecore insights from SUGCON and practical web development, creating value for everyone in our community.`,
    coverImage: '/events/june-2025-meetup/gallery/Image (2).jpg',
    resources: [
      {
        title: 'Event Presentation',
        url: 'https://sitecore-sofia.vercel.app/events/june-2025-meetup/AE_SUGCON.pptx',
        icon: '📑'
      },
      {
        title: 'GitHub Repository',
        url: 'https://github.com/nonadzhurkova/sitecore-sofia',
        icon: '💻'
      },
      {
        title: 'SUGCON 2025 Playlist',
        url: 'https://www.youtube.com/playlist?list=PLvwdDTmlDsRy5DRArU-nmWNlWED0vHuJS',
        icon: '🎥'
      }
    ]
  }
  // To add a new event, just add another entry here with a new slug as the key
  // Example:
  // 'september-2025-meetup': {
  //   id: '2',
  //   title: 'Sitecore Sofia User Group September 2025',
  //   ...
  // }
}; 