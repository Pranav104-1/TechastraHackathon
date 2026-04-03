"use client";
import { useEffect, useState } from "react";

export default function MarvelBackground() {
    const [sparks, setSparks] = useState<{ id: number; left: string; delay: string; duration: string; size: string }[]>([]);

    useEffect(() => {
        // Generate Doctor Strange Magic Sparks (Floating Embers)
        const generatedSparks = Array.from({ length: 45 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            delay: `${Math.random() * 8}s`,
            duration: `${4 + Math.random() * 6}s`,
            size: `${2 + Math.random() * 5}px`,
        }));
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSparks(generatedSparks);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
            {/* Wakandan / Quantum Hexagonal Tech Grid */}
            <div
                className="absolute inset-0 animate-pulse-slow"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='104' viewBox='0 0 60 104' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 17 L60 52 L30 69 L0 52 L0 17 Z M30 104 L60 87 L60 52 L30 69 Z M0 87 L30 104 Z' fill='none' stroke='%2300d2ff' stroke-width='1.5'/%3E%3C/svg%3E")`,
                    backgroundSize: "60px 104px",
                    maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)",
                    WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)"
                }}
            />

            {/* Doctor Strange Sling Ring Embers */}
            {sparks.map((spark) => (
                <div
                    key={spark.id}
                    className="absolute bottom-0 rounded-full bg-yellow-400"
                    style={{
                        left: spark.left,
                        width: spark.size,
                        height: spark.size,
                        animation: `floatUp ${spark.duration} linear ${spark.delay} infinite`,
                        opacity: 0,
                        boxShadow: "0 0 8px 2px #ff6a00, 0 0 15px #ff0000"
                    }}
                />
            ))}

            {/* Hyper-space / Captain Marvel Energy Streaks */}
            <div className="absolute inset-0 flex justify-between px-[10%] opacity-30 mix-blend-screen">
                <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-blue-400 to-transparent blur-[1px] animate-[hyperspaceStreak_7s_ease-in-out_infinite]" />
                <div className="w-[2px] h-40 bg-gradient-to-b from-transparent via-purple-500 to-transparent blur-[2px] animate-[hyperspaceStreak_11s_ease-in-out_infinite_2s]" />
                <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-red-500 to-transparent blur-[1px] animate-[hyperspaceStreak_9s_ease-in-out_infinite_5s]" />
                <div className="w-[2px] h-48 bg-gradient-to-b from-transparent via-yellow-400 to-transparent blur-[2px] animate-[hyperspaceStreak_13s_ease-in-out_infinite_1s]" />
                <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-green-400 to-transparent blur-[1px] animate-[hyperspaceStreak_8s_ease-in-out_infinite_7s]" />
            </div>
        </div>
    );
}
