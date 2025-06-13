"use client";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <div className="bg-white z-50 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 h-[65px]">
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
                                <Link 
                                    href="/past-events" 
                                    className="text-zinc-600 hover:text-[#E42325] transition-colors"
                                >
                                    Past Events
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
} 