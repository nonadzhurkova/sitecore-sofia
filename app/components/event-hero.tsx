"use client";

import { useCallback, useRef, useState } from 'react';
import confetti from 'canvas-confetti';

interface EventHeroProps {
    title: string;
    subtitle: string;
    details: string[];
    location: string;
    time: string;
    registrationLink: string;
    backgroundImage: string;
    isUpcoming?: boolean;
}

export default function EventHero({ 
    title, 
    subtitle, 
    details = [], 
    location, 
    time, 
    registrationLink, 
    backgroundImage, 
    isUpcoming = false 
}: EventHeroProps) {
    // Rest of the component stays exactly the same
    const [isHovering, setIsHovering] = useState(false);
    const hoverTimerRef = useRef<NodeJS.Timeout>(null);
    
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

    if (isUpcoming) {
        return (
            <div className="relative max-w-4xl mx-auto px-4 mt-16 mb-24">
                <div className="bg-white rounded-lg p-8 border-2 border-[#E42325]">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span 
                                className={`inline-block bg-[#E42325] text-white px-3 py-1 rounded-full text-sm font-medium transition-transform ${isHovering ? 'scale-110' : ''}`}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onTouchStart={handleMouseEnter}
                                onTouchEnd={handleMouseLeave}
                            >
                                Upcoming Event
                            </span>
                            <span className="h-px flex-1 bg-zinc-200"></span>
                        </div>
                        <h2 className="text-[#E42325] text-xl md:text-2xl font-bold">
                            {title}
                        </h2>
                        <p className="text-zinc-600 text-base">
                            {subtitle}
                        </p>
                        <div className="flex flex-wrap gap-4 text-zinc-500 text-sm">
                            <p className="flex items-center gap-2">
                                <span className="text-[#E42325]">📍</span>
                                {location}
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="text-[#E42325]">🕰️</span>
                                {time}
                            </p>
                        </div>
                        <button 
                            disabled
                            className="inline-block bg-zinc-100 text-zinc-500 px-6 py-2 rounded-full text-sm font-semibold cursor-not-allowed border border-zinc-200"
                        >
                            Registration Coming Soon
                        </button>
                    </div>
                </div>
            </div>
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
                    <div 
                        className="absolute inset-0 bg-cover bg-center grayscale-[60%] brightness-[65%] hover:grayscale-0 hover:brightness-90 transition-all duration-500"
                        style={{ 
                            backgroundImage: `url(${backgroundImage})`
                        }}
                    />
                </div>
            </div>
        </section>
    );
} 