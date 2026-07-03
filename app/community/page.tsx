import { Metadata } from "next";
import Image from "next/image";
import { members, Person } from "../data/community";

export const metadata: Metadata = {
  title: "Our Community — Sitecore Sofia User Group",
  description:
    "The people behind Sitecore Sofia User Group.",
};

function PersonCard({ person }: { person: Person }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center">
      {person.headshot ? (
        <div className="w-20 h-20 rounded-full overflow-hidden relative flex-shrink-0">
          <Image
            src={person.headshot}
            alt={person.name}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="bg-[#E42325] text-white text-xl font-bold w-20 h-20 rounded-full flex items-center justify-center">
          {person.initials}
        </div>
      )}
      <p className="text-lg font-bold text-zinc-900 mt-3">{person.name}</p>
      <p className="text-sm text-zinc-500">{person.title}</p>
      <p className="text-sm text-zinc-400">{person.company}</p>
      <a
        href={person.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 text-zinc-400 hover:text-[#0A66C2] transition-colors"
        aria-label={`${person.name} on LinkedIn`}
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      </a>
      {person.topics.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1.5 mt-3">
          {person.topics.map((topic) => (
            <span
              key={topic}
              className="bg-amber-50 text-amber-700 border border-amber-200 text-xs px-2 py-0.5 rounded-full"
            >
              {topic}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CommunityPage() {
  return (
    <div>
      <section className="bg-zinc-900 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-3">Our Community</h1>
          <p className="text-zinc-400 text-lg">
            The people behind Sitecore Sofia User Group
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((person) => (
            <PersonCard key={person.name} person={person} />
          ))}
        </div>
      </div>
    </div>
  );
}
