"use client";
import Image from "next/image";

export default function Header() {
    return (
        <div className="bg-white z-50">
            <div className="max-w-6xl mx-auto px-4 h-[45px]">
                <div className="flex items-center h-full">
                    <Image
                        src="/download_logo_v2.png"
                        alt="Sitecore Sofia User Group Logo"
                        width={220}
                        height={85}
                        className="object-contain"
                        priority
                    />
                </div>
            </div>
        </div>
    );
} 