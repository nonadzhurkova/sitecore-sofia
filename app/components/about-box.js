"use client";

import { useInView } from "../hooks/useInView";

const highlights = [
    { icon: "🎤", label: "Expert Talks", text: "Deep dives from practitioners in the field" },
    { icon: "🛠️", label: "Hands-on Workshops", text: "Build and experiment together" },
    { icon: "🤝", label: "Networking", text: "Connect with peers over food and drinks" },
    { icon: "🌐", label: "Online & In-Person", text: "Events in Sofia and streamed globally" },
];

export default function AboutBox() {
    const { ref, isVisible } = useInView();

    return (
        <div id="about" className="relative max-w-4xl mx-auto -mt-16 px-4 z-10 pb-16">
            <div
                ref={ref}
                className={`bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#E42325] transition-all duration-700 ease-out ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
            >
                <h2 className="text-2xl font-bold text-zinc-900 mb-6">About Sitecore Sofia User Group</h2>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4 text-zinc-600">
                        <p>
                            Sitecore Sofia User Group is a vibrant community-driven meetup, bringing together professionals and enthusiasts passionate about Sitecore. We host regular events featuring expert talks, hands-on workshops, and valuable networking opportunities, all while enjoying great conversations over food and drinks.
                        </p>
                        <p>
                            Our community welcomes everyone interested in the Sitecore Experience Platform, whether you're a seasoned developer, a curious marketer, or just starting your journey. From technical deep-dives to content strategy discussions, we create a space where programmers, marketers, content authors, and CMS users can learn, share, and grow together.
                        </p>
                    </div>
                    <div className="space-y-4">
                        {highlights.map((item) => (
                            <div key={item.label} className="flex items-start gap-3 border-l-2 border-[#E42325] pl-4 py-1">
                                <span className="text-xl flex-shrink-0">{item.icon}</span>
                                <div>
                                    <p className="font-semibold text-zinc-900">{item.label}</p>
                                    <p className="text-sm text-zinc-500">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
