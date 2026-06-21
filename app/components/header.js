"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div
            className={`sticky top-0 z-50 shadow-sm transition-colors duration-300 ${
                scrolled ? "bg-white/90 backdrop-blur-md" : "bg-white"
            }`}
        >
            <div className="max-w-6xl mx-auto px-4 h-[76px]">
                <div className="flex items-center justify-between h-full">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/download_logo_v2.png"
                            alt="Sitecore Sofia User Group Logo"
                            width={220}
                            height={85}
                            className="object-contain"
                            priority
                        />
                    </Link>

                    <nav>
                        <ul className="flex items-center space-x-8">
                            <li>
                                <Link
                                    href="/"
                                    className="text-zinc-600 hover:text-[#E42325] transition-colors"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="/#about"
                                    className="text-zinc-600 hover:text-[#E42325] transition-colors"
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <Link
                                    href="/materials"
                                    className="text-zinc-600 hover:text-[#E42325] transition-colors"
                                >
                                    Materials
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/past-events"
                                    className="text-zinc-600 hover:text-[#E42325] transition-colors"
                                >
                                    Past Events
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/community"
                                    className="text-zinc-600 hover:text-[#E42325] transition-colors"
                                >
                                    Community
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}
