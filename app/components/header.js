"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MessageSquare } from "lucide-react";

const navLinks = [
    { href: "/", label: "Home", exact: true },
    { href: "/#about", label: "About" },
    { href: "/materials", label: "Materials" },
    { href: "/past-events", label: "Past Events" },
    { href: "/community", label: "Community" },
];

function FacebookIcon({ size = 20 }) {
    return (
        <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
    );
}

function LinkedinIcon({ size = 20 }) {
    return (
        <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
    );
}

const socials = [
    { href: "https://www.facebook.com/groups/555972777367779/", Icon: FacebookIcon, label: "Facebook" },
    { href: "https://www.linkedin.com/groups/10117145/", Icon: LinkedinIcon, label: "LinkedIn" },
    { href: "https://community.sitecore.com/community?id=community_forum&sys_id=55ac15e5c365ea90e813349f050131de", Icon: MessageSquare, label: "Community Forum" },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        document.body.classList.toggle("overflow-hidden", menuOpen);
        return () => document.body.classList.remove("overflow-hidden");
    }, [menuOpen]);

    function isActive(link) {
        if (link.href === "/#about") return pathname === "/" && typeof window !== "undefined" && window.location.hash === "#about";
        if (link.exact) return pathname === link.href;
        return pathname.startsWith(link.href);
    }

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

                    {/* Desktop nav */}
                    <nav className="hidden md:block">
                        <ul className="flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    {link.href.startsWith("/#") ? (
                                        <a
                                            href={link.href}
                                            className={`transition-colors ${
                                                isActive(link)
                                                    ? "text-[#E42325] font-semibold"
                                                    : "text-zinc-600 hover:text-[#E42325]"
                                            }`}
                                        >
                                            {link.label}
                                        </a>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className={`transition-colors ${
                                                isActive(link)
                                                    ? "text-[#E42325] font-semibold"
                                                    : "text-zinc-600 hover:text-[#E42325]"
                                            }`}
                                        >
                                            {link.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Hamburger button */}
                    <button
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="md:hidden p-2 text-zinc-600 hover:text-[#E42325] transition-colors"
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                    >
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile dropdown */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    menuOpen ? "max-h-[28rem] border-t border-zinc-100 shadow-lg" : "max-h-0"
                }`}
            >
                <nav className="bg-white">
                    {navLinks.map((link) => {
                        const active = isActive(link);
                        const className = `block py-4 px-6 text-base font-medium border-b border-zinc-50 last:border-0 transition-colors ${
                            active
                                ? "text-[#E42325] font-semibold"
                                : "text-zinc-700 hover:text-[#E42325] hover:bg-zinc-50"
                        }`;

                        return link.href.startsWith("/#") ? (
                            <a
                                key={link.href}
                                href={link.href}
                                className={className}
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.label}
                            </a>
                        ) : (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={className}
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                    <div className="flex items-center gap-6 px-6 py-4 border-t border-zinc-100">
                        {socials.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-400 hover:text-[#E42325] transition-colors"
                                aria-label={social.label}
                            >
                                <social.Icon size={20} />
                            </a>
                        ))}
                    </div>
                </nav>
            </div>
        </div>
    );
}
