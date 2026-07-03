export interface Person {
  name: string;
  title: string;
  company: string;
  linkedin: string;
  initials: string;
  headshot?: string;
  topics: string[];
}

export const members: Person[] = [
  {
    name: "Nona Dzhurkova",
    title: "Software Engineer",
    company: "Americaneagle.com",
    linkedin: "https://www.linkedin.com/in/nona-dzhurkova-3221b812/",
    initials: "ND",
    headshot: "/NonaHeadshot.jpg",
    topics: ["AI Tools for Developers", "SUGCON Recaps", "Next.js & Vercel"],
  },
  {
    name: "Yonko Borisov",
    title: "Software Engineer",
    company: "Americaneagle.com",
    linkedin: "https://www.linkedin.com/in/yonko-borisov-9aa509101/",
    initials: "YB",
    headshot: "/YonkoHeadshot.jpg",
    topics: ["SUGCON Recaps", "Sitecore Content Hub"],
  },
  {
    name: "Stefan Zhuntovski",
    title: "Software Engineer",
    company: "Americaneagle.com",
    linkedin: "https://www.linkedin.com/in/stefan-stz/",
    initials: "SZ",
    headshot: "/StefanHeadshot.jpg",
    topics: ["Sitecore CDP & Personalize"],
  },
];
