"use client";

export default function Hero({ title, subtitle, backgroundImage }) {
    return (
        <section className="relative h-[70vh]">
            <div 
                className="absolute inset-0 bg-cover bg-center grayscale-[60%] brightness-[65%]"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            />
            <div className="relative flex items-center justify-center h-full">
                <div className="text-center bg-black/80 px-8 py-10 rounded-lg">
                    <h1 className="text-[#E42325] text-4xl md:text-5xl font-bold">
                        {title}
                    </h1>
                    <p className="text-white text-lg md:text-xl mt-4">
                        {subtitle}
                    </p>
                </div>
            </div>
        </section>
    );
}
