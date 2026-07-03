import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Session Materials — Sitecore Sofia User Group",
  description:
    "Slides, recordings, and resources from all our meetups.",
};

interface Session {
  speaker: string;
  title: string;
}

interface MaterialResource {
  icon: string;
  label: string;
  href: string;
  comingSoon?: boolean;
}

interface EventMaterial {
  title: string;
  date: string;
  location: string;
  link: string;
  sessions: Session[];
  resources: MaterialResource[];
  noMaterials?: boolean;
}

const eventMaterials: EventMaterial[] = [
  {
    title: "Claude for Developers: Best Practices",
    date: "June 22, 2026",
    location: "Online",
    link: "/past-events/june-2026",
    sessions: [
      { speaker: "Nona Dzhurkova", title: "Claude for Developers: Best Practices" },
    ],
    resources: [
      { icon: "📑", label: "Event Presentation", href: "/events/june-2026/Claude Presentation.pptx" },
    ],
  },
  {
    title: "Lunch & Learn: AI Tools for Developers + Sitecore Content Hub Deep Dive",
    date: "May 27, 2026",
    location: "Sofia",
    link: "/past-events/may-2026",
    sessions: [
      { speaker: "Nona Dzhurkova", title: "AI Tools for Developers" },
      { speaker: "Yonko Borisov", title: "Sitecore Content Hub Deep Dive" },
    ],
    resources: [],
  },
  {
    title: "SUGCON Recap + CDP & Personalize",
    date: "April 24, 2026",
    location: "Online",
    link: "/past-events/april-2026-meetup",
    sessions: [
      { speaker: "Nona Dzhurkova & Yonko Borisov", title: "SUGCON Recap" },
      { speaker: "Stefan Zhuntovski (Americaneagle.com)", title: "CDP & Personalize" },
    ],
    resources: [
      { icon: "🎥", label: "Event Recording", href: "https://www.youtube.com/watch?v=ppouRKKj92E" },
      { icon: "📑", label: "Event Presentation", href: "/events/april-2026/SUGCON-2026%20FINAL.pptx" },
    ],
  },
  {
    title: "Sitecore User Group Sofia: Fall 2025 Edition",
    date: "September 30, 2025",
    location: "Campus X, Sofia",
    link: "/past-events/september-2025-meetup",
    sessions: [
      { speaker: "", title: "Sitecore for Non-Technical Audiences" },
      { speaker: "", title: "Sitecore Search: Extractor & Search Flow" },
    ],
    resources: [],
    noMaterials: true,
  },
  {
    title: "Sitecore Sofia User Group June 2025",
    date: "June 11, 2025",
    location: "Campus X, Sofia",
    link: "/past-events/june-2025-meetup",
    sessions: [
      { speaker: "Nona Dzhurkova & Yonko Borisov", title: "SUGCON 2025 Highlights" },
      { speaker: "Nona Dzhurkova & Yonko Borisov", title: "Live Build: This Website with Next.js & Vercel" },
    ],
    resources: [
      { icon: "📑", label: "Event Presentation", href: "https://sitecore-sofia.vercel.app/events/june-2025-meetup/AE_SUGCON.pptx" },
      { icon: "💻", label: "GitHub Repository", href: "https://github.com/nonadzhurkova/sitecore-sofia" },
      { icon: "🎥", label: "SUGCON 2025 Playlist", href: "https://www.youtube.com/playlist?list=PLvwdDTmlDsRy5DRArU-nmWNlWED0vHuJS" },
    ],
  },
];

export default function MaterialsPage() {
  return (
    <div>
      {/* Page header */}
      <section className="bg-zinc-900 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-3">
            Session Materials
          </h1>
          <p className="text-zinc-400 text-lg">
            Slides, recordings, and resources from all our meetups
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {eventMaterials.map((event, i) => (
          <div
            key={event.link}
            className={`py-8 ${i < eventMaterials.length - 1 ? "border-b border-zinc-100" : ""}`}
          >
            <Link
              href={event.link}
              className="text-xl font-bold text-[#E42325] hover:underline"
            >
              {event.title}
            </Link>
            <p className="text-zinc-500 text-sm mt-1">
              {event.date} · {event.location}
            </p>

            {/* Sessions */}
            <div className="mt-3 space-y-1">
              {event.sessions.map((session) => (
                <p key={session.title} className="text-zinc-600 text-sm">
                  <span className="font-medium">{session.title}</span>
                  {session.speaker && (
                    <span className="text-zinc-400"> — {session.speaker}</span>
                  )}
                </p>
              ))}
            </div>

            {/* Resources */}
            <div className="mt-4">
              {event.noMaterials ? (
                <p className="text-zinc-400 text-sm italic">
                  No recordings or slides available for this event
                </p>
              ) : event.resources.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {event.resources.map((resource) => (
                    <a
                      key={resource.label}
                      href={resource.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-zinc-300 rounded-full px-4 py-1.5 text-sm flex items-center gap-2 hover:border-[#E42325] hover:text-[#E42325] transition-colors text-zinc-700"
                    >
                      <span>{resource.icon}</span>
                      <span>{resource.label}</span>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-400 text-sm">Coming Soon</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
