"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="bg-white text-zinc-600 py-12 w-full border-t-4 border-[#E42325]">
            <div className="max-w-6xl mx-auto px-4 w-full">
                <div className="mb-8">
                    <Link href="/" className="inline-block">
                        <Image
                            src="/download_logo_v2.png"
                            alt="Sitecore Sofia User Group Logo"
                            width={180}
                            height={70}
                            className="object-contain"
                        />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Connect With Us */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-zinc-900">Connect With Us</h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="https://www.facebook.com/groups/555972777367779/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-zinc-600 hover:text-[#E42325] transition-colors"
                                >
                                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                    </svg>
                                    <span>Facebook Group</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.linkedin.com/groups/10117145/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-zinc-600 hover:text-[#E42325] transition-colors"
                                >
                                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                    </svg>
                                    <span>LinkedIn Group</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.youtube.com/@SUGBulgaria"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-zinc-600 hover:text-[#E42325] transition-colors"
                                >
                                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                    </svg>
                                    <span>YouTube</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://community.sitecore.com/community?id=community_forum&sys_id=55ac15e5c365ea90e813349f050131de"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-zinc-600 hover:text-[#E42325] transition-colors"
                                >
                                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M4 4h16v12H5.17L4 17.17V4m0-2c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H4zm2 10h12v2H6v-2zm0-3h12v2H6V9zm0-3h12v2H6V6z"/>
                                    </svg>
                                    <span>Community Forum</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Community */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-zinc-900">Community</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="https://community.sitecore.com/" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-[#E42325] transition-colors">
                                    Sitecore Community
                                </a>
                            </li>
                            <li>
                                <a href="https://sitecore.stackexchange.com/" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-[#E42325] transition-colors">
                                    Stack Exchange
                                </a>
                            </li>
                            <li>
                                <a href="https://doc.sitecore.com/" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-[#E42325] transition-colors">
                                    Documentation
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Events */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-zinc-900">Events</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="/#about" className="text-zinc-600 hover:text-[#E42325] transition-colors">About Us</a>
                            </li>
                            <li>
                                <Link href="/materials" className="text-zinc-600 hover:text-[#E42325] transition-colors">Materials</Link>
                            </li>
                            <li>
                                <Link href="/past-events" className="text-zinc-600 hover:text-[#E42325] transition-colors">Past Events</Link>
                            </li>
                            <li>
                                <Link href="/community" className="text-zinc-600 hover:text-[#E42325] transition-colors">Community</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-zinc-100 flex items-center justify-between">
                    <p className="text-zinc-500 text-sm">
                        © {new Date().getFullYear()} Sitecore Sofia User Group. All rights reserved.
                    </p>
                    <button
                        onClick={scrollToTop}
                        className="text-zinc-500 hover:text-[#E42325] text-sm transition-colors"
                    >
                        Back to top ↑
                    </button>
                </div>
            </div>
        </footer>
    );
}
