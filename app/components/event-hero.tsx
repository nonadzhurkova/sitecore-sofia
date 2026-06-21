"use client";

import { useCallback, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import Link from 'next/link';
import Image from 'next/image';
import { useInView } from '../hooks/useInView';

interface EventHeroProps {
    title: string;
    subtitle: string;
    details: string[];
    location: string;
    time: string;
    registrationLink: string;
    backgroundImage: string;
    isUpcoming?: boolean;
    isPast?: boolean;
    eventLink?: string;
}

export default function EventHero({
    title,
    subtitle,
    details = [],
    location,
    time,
    registrationLink,
    backgroundImage,
    isUpcoming = false,
    isPast = false,
    eventLink = ""
}: EventHeroProps) {
    // Rest of the component stays exactly the same
    const [isHovering, setIsHovering] = useState(false);
    const hoverTimerRef = useRef<NodeJS.Timeout>(null);
    const { ref: inViewRef, isVisible: inViewVisible } = useInView();
    
    const triggerConfetti = useCallback(() => {
        const count = 200;
        const defaults = {
            origin: { y: 0.7 },
            zIndex: 100,
        };

        function fire(particleRatio: number, opts: any) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio),
            });
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });

        fire(0.2, {
            spread: 60,
        });

        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8,
        });

        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2,
        });

        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });
    }, []);

    const handleMouseEnter = useCallback(() => {
        setIsHovering(true);
        hoverTimerRef.current = setTimeout(() => {
            triggerConfetti();
        }, 500);
    }, [triggerConfetti]);

    const handleMouseLeave = useCallback(() => {
        setIsHovering(false);
        if (hoverTimerRef.current) {
            clearTimeout(hoverTimerRef.current);
        }
    }, []);

    if (isPast) {
        return (
            <section className="relative bg-zinc-900">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-8 py-12 px-4">
                    {/* Text Content */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="inline-block bg-zinc-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                Past Event
                            </span>
                        </div>
                        <h1 className="text-[#E42325] text-2xl md:text-3xl font-bold">
                            {title}
                        </h1>
                        <p className="text-zinc-200 text-base md:text-lg">
                            {subtitle}
                        </p>
                        
                        <div className="space-y-4">
                            {details.length > 0 && (
                                <>
                                    <p className="text-lg font-semibold text-white">What happened:</p>
                                    <ul className="space-y-3 text-zinc-300 text-base">
                                        {details.map((detail, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <span className="text-[#E42325]">▸</span>
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                            <div className="space-y-2 text-zinc-300">
                                <p className="flex items-center gap-2">
                                    <span className="text-[#E42325]">📍</span>
                                    {location}
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="text-[#E42325]">🕰️</span>
                                    {time}
                                </p>
                            </div>
                        </div>
                        
                        <Link 
                            href={registrationLink}
                            className="inline-block bg-[#E42325] text-white px-6 py-2.5 rounded-full text-base font-semibold hover:bg-[#c41f21] transition-colors"
                        >
                            View Event Details
                        </Link>
                    </div>

                    {/* Image */}
                    <div className="order-first md:order-last relative h-[300px] md:h-[400px] rounded-xl overflow-hidden">
                        <Image
                            src={backgroundImage}
                            alt={title}
                            fill
                            className="object-cover transition-all duration-500 hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    </div>
                </div>
            </section>
        );
    }

    const [showAllDetails, setShowAllDetails] = useState(false);
    const maxPreviewItems = 4;
    const hasMore = details.length > maxPreviewItems;
    const visibleDetails = showAllDetails ? details : details.slice(0, maxPreviewItems);

    if (isUpcoming) {
        return (
            <section
                ref={inViewRef}
                className={`bg-zinc-900 py-16 transition-all duration-700 ease-out ${
                    inViewVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
            >
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-10 items-start">
                        <div className="space-y-5">
                            <span
                                className={`inline-block bg-[#F59E0B] text-zinc-900 px-3 py-1 rounded-full text-sm font-medium transition-transform ${isHovering ? 'scale-110' : ''}`}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onTouchStart={handleMouseEnter}
                                onTouchEnd={handleMouseLeave}
                            >
                                Upcoming Event
                            </span>
                            <h2 className="text-white text-xl md:text-2xl font-bold">
                                {title}
                            </h2>
                            <p className="text-zinc-300 text-base">
                                {subtitle}
                            </p>
                            <div className="flex flex-wrap gap-4 text-zinc-400 text-sm">
                                <p className="flex items-center gap-2">
                                    <span className="text-[#F59E0B]">📍</span>
                                    {location}
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="text-[#F59E0B]">🕰️</span>
                                    {time}
                                </p>
                            </div>
                            {visibleDetails.length > 0 && (
                                <>
                                    <ul className="space-y-2 text-zinc-300 text-sm">
                                        {visibleDetails.map((detail, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <span className="text-[#F59E0B]">▸</span>
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                    {hasMore && !showAllDetails && (
                                        <button
                                            onClick={() => setShowAllDetails(true)}
                                            className="text-[#F59E0B] text-sm hover:underline"
                                        >
                                            View full agenda →
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                        <div className="flex flex-col items-center justify-center bg-zinc-700 rounded-xl p-8 space-y-4">
                            <p className="text-white text-lg font-semibold text-center">Join us for this event</p>
                            <button
                                disabled
                                className="border-2 border-[#F59E0B] text-[#F59E0B] rounded-full px-6 py-2 font-semibold cursor-not-allowed opacity-60"
                            >
                                Registration Coming Soon
                            </button>
                            <a
                                href="https://www.linkedin.com/groups/10117145/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-400 hover:text-white text-sm transition-colors"
                            >
                                Follow us on LinkedIn for updates →
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="relative bg-zinc-900">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center py-12 px-4">
                {/* Text Content */}
                <div className="space-y-6 pr-8">
                    <h1 className="text-[#E42325] text-2xl md:text-3xl font-bold">
                        {title}
                    </h1>
                    <p className="text-zinc-200 text-base md:text-lg">
                        {subtitle}
                    </p>
                    
                    <div className="space-y-4">
                        {details.length > 0 && (
                            <>
                                <p className="text-lg font-semibold text-white">What to expect:</p>
                                <ul className="space-y-3 text-zinc-300 text-base">
                                    {details.map((detail, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <span className="text-[#E42325]">▸</span>
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                        <div className="space-y-2 text-zinc-300">
                            <p className="flex items-center gap-2">
                                <span className="text-[#E42325]">📍</span>
                                {location}
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="text-[#E42325]">🕰️</span>
                                {time}
                            </p>
                        </div>
                    </div>
                    
                    <a 
                        href={registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-[#E42325] text-white px-6 py-2.5 rounded-full text-base font-semibold hover:bg-[#c41f21] transition-colors"
                    >
                        Register for Free
                    </a>
                </div>

                {/* Image */}
                <div className="relative h-[400px] rounded-xl overflow-hidden">
                    <Image
                        src={backgroundImage}
                        alt={title}
                        fill
                        className="object-cover transition-all duration-500 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                </div>
            </div>
        </section>
    );
} 