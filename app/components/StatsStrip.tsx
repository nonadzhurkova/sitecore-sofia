"use client";

import Link from "next/link";
import { useInView } from "../hooks/useInView";

interface Stat {
    icon: string;
    value: string;
    label: string;
    href?: string;
}

const stats: Stat[] = [
    { icon: "📅", value: "4", label: "Events" },
    { icon: "🎤", value: "8+", label: "Speakers", href: "/community" },
    { icon: "🏙️", value: "2", label: "Cities" },
    { icon: "📆", value: "June 2025", label: "Since" },
];

export default function StatsStrip() {
    const { ref, isVisible } = useInView();

    return (
        <section
            ref={ref}
            className={`bg-zinc-800 text-white py-12 transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
            <div className="max-w-4xl mx-auto px-4 flex flex-wrap justify-center items-center gap-y-8">
                {stats.map((stat, i) => (
                    <div key={stat.label} className="flex items-center">
                        {stat.href ? (
                            <Link href={stat.href} className="text-center px-6 md:px-10 group">
                                <div className="text-3xl md:text-4xl font-bold group-hover:text-[#E42325] transition-colors">
                                    {stat.icon} {stat.value}
                                </div>
                                <div className="text-zinc-400 text-sm mt-1 group-hover:text-zinc-300 transition-colors">
                                    {stat.label}
                                </div>
                            </Link>
                        ) : (
                            <div className="text-center px-6 md:px-10">
                                <div className="text-3xl md:text-4xl font-bold">
                                    {stat.icon} {stat.value}
                                </div>
                                <div className="text-zinc-400 text-sm mt-1">{stat.label}</div>
                            </div>
                        )}
                        {i < stats.length - 1 && (
                            <div className="hidden md:block w-px h-10 bg-zinc-700" />
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
