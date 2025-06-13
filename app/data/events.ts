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