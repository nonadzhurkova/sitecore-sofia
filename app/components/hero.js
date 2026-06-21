"use client";

import Link from "next/link";

export default function Hero({ title, subtitle, backgroundImage }) {
    return (
        <section className="relative h-[85vh] overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center grayscale-[60%] brightness-[65%] animate-kenburns"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="relative flex items-end h-full pb-28 pl-6 md:pl-12 pr-6">
                <div className="max-w-2xl">
                    <h1 className="text-[#E42325] text-3xl md:text-5xl font-bold">
                        {title}
                    </h1>
                    <p className="text-white text-lg md:text-xl mt-4">
                        {subtitle}
                    </p>
                    <Link
                        href="/past-events"
                        className="inline-block mt-6 bg-[#E42325] text-white font-bold px-6 py-3 rounded-full hover:bg-[#c41f21] transition-colors"
                    >
                        View Past Events
                    </Link>
                </div>
            </div>
        </section>
    );
}
