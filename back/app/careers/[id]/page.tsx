"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@heroui/react";
import CareerChatbot from "@/components/career-chatbot";

// Mock Database of Career Data (Ideally would be moved into a separate data file/JSON)
const careersData: Record<string, any> = {
    "software-engineer": {
        title: "Software Engineer",
        division: "Stark Industries / AI Division",
        description: "Developing advanced autonomous systems and neural interfaces. Inspired by Tony Stark's engineering genius, you'll build the next generation of JARVIS-level intelligence.",
        clearance: "Level 9 (Stark Prime)",
        color: "red",
        salary: "$145,000 - $220,000",
        prerequisites: ["B.S. in Computer Science or Quantum Engineering", "Proficiency in C++, Rust, and J.A.R.V.I.S. Architecture"],
        dailyTasks: [
            "Optimizing Mark 50 Armor neural pathways.",
            "Developing firewall protocols against Ultron-level threats.",
            "Collaborating with the Arc Reactor containment teams."
        ]
    },
    "chief-surgeon": {
        title: "Chief Surgeon",
        division: "Medical / Bio-Science Wing",
        description: "Mastering the arts of life-saving medicine and experimental bio-tech. Like Stephen Strange, your precision and dedication will push the boundaries of human recovery.",
        clearance: "Level 8 (Medical)",
        color: "orange",
        salary: "$210,000 - $350,000",
        prerequisites: ["M.D. with specialty in Experimental Neurology", "Experience in high-stress trauma situations"],
        dailyTasks: [
            "Performing micro-surgery on cybernetic enhancements.",
            "Consulting on regenerative cradle tech with Dr. Cho.",
            "Studying mystical healing arts (optional but recommended)."
        ]
    },
    "lead-illustrator": {
        title: "Lead Illustrator",
        division: "Creative Arts / Archives",
        description: "Capturing the history and essence of heroism through visual storytelling. Following Steve Rogers' artistic roots, you'll document the legacy of the Avengers Initiative.",
        clearance: "Level 6 (Communications)",
        color: "blue",
        salary: "$95,000 - $130,000",
        prerequisites: ["B.F.A in Illustration or Graphic Design", "Portfolio demonstrating historical accuracy and propaganda style"],
        dailyTasks: [
            "Designing S.H.I.E.L.D collateral and mission patches.",
            "Documenting high-profile combat operations visually.",
            "Updating the Captain America exhibit at the Smithsonian."
        ]
    },
    "ui-ux-designer": {
        title: "UI/UX Designer",
        division: "Stark Tech / Visual Systems",
        description: "Crafting intuitive holographic interfaces for tactical HUDs. Channelling Janet van Dyne's eye for design, you'll make high-tech complexity feel seamless and beautiful.",
        clearance: "Level 7 (Design)",
        color: "purple",
        salary: "$120,000 - $165,000",
        prerequisites: ["Degree in Human-Computer Interaction", "Experience with 3D Holographic Prototyping"],
        dailyTasks: [
            "Refining the Iron Man helmet heads-up display.",
            "Designing Wakandan Kimoyo bead interfaces.",
            "Running user-testing on Quinjet navigation controls."
        ]
    },
    "bio-geneticist": {
        title: "Bio-Geneticist",
        division: "Gamma Radiation Research",
        description: "Investigating the fundamental building blocks of cellular mutation. Like Bruce Banner, your research will unlock the secrets of superhuman biology and regenerative medicine.",
        clearance: "Omega Level",
        color: "green",
        salary: "$160,000 - $240,000",
        prerequisites: ["Ph.D. in Genetics or Radiology", "Extreme stress-management skills"],
        dailyTasks: [
            "Monitoring global gamma radiation spikes.",
            "Analyzing Inhuman and Mutant DNA samples safely.",
            "Developing rapid cellular regeneration serums."
        ]
    },
    "quantum-physicist": {
        title: "Quantum Physicist",
        division: "Asgardian Liaison / Research",
        description: "Bridging the gap between human science and cosmic reality. Following Jane Foster's lead, you'll study the Einstein-Rosen bridges and multiversal anomalies.",
        clearance: "Level 8+",
        color: "yellow",
        salary: "$175,000 - $280,000",
        prerequisites: ["Ph.D. in Theoretical or Quantum Physics", "Clearance to view SHIELD '0-8-4' files"],
        dailyTasks: [
            "Calibrating the Pym Particle generators.",
            "Monitoring multiversal incursions.",
            "Translating Asgardian cosmological maps."
        ]
    }
};

const colorMap: Record<string, { border: string; bg: string; text: string; glow: string }> = {
    red: { border: "border-red-500", bg: "bg-red-500", text: "text-red-400", glow: "shadow-[0_0_30px_rgba(239,68,68,0.3)]" },
    blue: { border: "border-blue-500", bg: "bg-blue-500", text: "text-blue-400", glow: "shadow-[0_0_30px_rgba(59,130,246,0.3)]" },
    orange: { border: "border-orange-500", bg: "bg-orange-500", text: "text-orange-400", glow: "shadow-[0_0_30px_rgba(249,115,22,0.3)]" },
    purple: { border: "border-purple-500", bg: "bg-purple-500", text: "text-purple-400", glow: "shadow-[0_0_30px_rgba(168,85,247,0.3)]" },
    green: { border: "border-green-500", bg: "bg-green-500", text: "text-green-400", glow: "shadow-[0_0_30px_rgba(34,197,94,0.3)]" },
    yellow: { border: "border-yellow-400", bg: "bg-yellow-400", text: "text-yellow-400", glow: "shadow-[0_0_30px_rgba(250,204,21,0.3)]" },
};

import { use } from "react";

export default function CareerPage(props: { params: Promise<{ id: string }> }) {
    const params = use(props.params);
    const career = careersData[params.id];

    if (!career) {
        notFound();
    }

    const theme = colorMap[career.color] || colorMap.blue;

    return (
        <div className="min-h-screen flex flex-col md:flex-row items-start justify-center py-24 px-6 md:px-12 gap-8 relative z-10 max-w-[1600px] mx-auto">

            {/* Background Decor */}
            <div className={`fixed top-[10%] left-[5%] text-[15vw] font-black italic text-white/5 opacity-5 pointer-events-none select-none`}>
                {career.division.split(" ")[0]}
            </div>

            {/* Main Info Card (Left) */}
            <div className={`flex-1 w-full bg-black/60 backdrop-blur-2xl border ${theme.border}/40 rounded-xl ${theme.glow} p-8 md:p-14 relative overflow-hidden`}>

                {/* Holographic Scanline */}
                <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-${theme.bg}/5 to-transparent h-[10px] w-full animate-[scan_5s_linear_infinite] pointer-events-none`} />

                {/* Back Button */}
                <Button
                    as={Link}
                    href="/"
                    variant="light"
                    className="mb-8 text-white/60 hover:text-white uppercase tracking-widest text-[10px] font-mono flex items-center gap-2"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                    Return to Hub
                </Button>

                {/* Header Section */}
                <header className="border-b border-white/10 pb-8 mb-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <p className={`text-[12px] ${theme.text} uppercase tracking-[0.4em] font-mono mb-2`}>{career.division}</p>
                            <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase">
                                {career.title}
                            </h1>
                        </div>
                        <div className="flex flex-col gap-2 p-4 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm min-w-[200px]">
                            <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                                <span className="uppercase">Clearance:</span>
                                <span className={`${theme.text} font-bold`}>{career.clearance}</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                                <span className="uppercase">Compensation:</span>
                                <span className="text-green-400 font-bold">{career.salary}</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* File Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-4">

                    {/* Main Description */}
                    <div className="md:col-span-2 space-y-10">
                        <section className="bg-black/20 border border-white/5 p-6 rounded-xl relative group">
                            <div className={`absolute top-0 left-0 w-8 h-px ${theme.bg} opacity-50`} />
                            <div className={`absolute top-0 left-0 w-px h-8 ${theme.bg} opacity-50`} />

                            <h2 className={`text-sm ${theme.text} uppercase tracking-widest font-black mb-4 flex items-center gap-3`}>
                                <div className={`w-1.5 h-1.5 ${theme.bg} animate-pulse`} />
                                Mission Overview
                            </h2>
                            <p className="text-gray-300 leading-relaxed text-sm md:text-base font-mono">
                                {career.description}
                            </p>
                        </section>

                        <section className="relative">
                            <h2 className={`text-sm ${theme.text} uppercase tracking-widest font-black mb-6 flex items-center gap-3`}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>
                                Current Operations
                            </h2>
                            <ul className="space-y-4">
                                {career.dailyTasks.map((task: string, idx: number) => (
                                    <li key={idx} className="flex items-center gap-4 text-gray-300 text-sm bg-black/40 border border-white/10 p-4 rounded-lg hover:border-white/30 hover:bg-white/5 transition-all group">
                                        <div className={`w-8 h-8 rounded shrink-0 flex items-center justify-center bg-white/5 border border-white/10 group-hover:${theme.border} group-hover:bg-white/10 transition-colors`}>
                                            <span className={`text-[10px] font-mono ${theme.text}`}>0{idx + 1}</span>
                                        </div>
                                        <span className="font-mono">{task}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    {/* Sidebar Info */}
                    <aside className="space-y-6">
                        <section className="bg-black/40 border border-white/10 p-6 rounded-lg">
                            <h2 className={`text-[10px] text-white/50 uppercase tracking-[0.2em] font-mono mb-4`}>
                                Required Credentials
                            </h2>
                            <ul className="space-y-4">
                                {career.prerequisites.map((req: string, idx: number) => (
                                    <li key={idx} className="flex items-center gap-3 text-xs text-gray-300 font-mono">
                                        <div className={`w-1 h-3 ${theme.bg} rounded-full`} />
                                        {req}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <Button
                            className={`w-full ${theme.bg} text-black font-black uppercase tracking-widest py-6 border-none hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(255,255,255,0.1)]`}
                        >
                            Submit Application
                        </Button>
                    </aside>

                </div>
            </div>

            {/* Specialist AI Mentor Chatbot (Right Panel, outside the Main Card) */}
            <aside className="w-full md:w-[400px] shrink-0 sticky top-24 space-y-4">
                <div className={`bg-black/60 backdrop-blur-2xl border ${theme.border}/40 rounded-xl p-6 ${theme.glow}`}>
                    <h2 className={`text-xs ${theme.text} uppercase tracking-[0.3em] font-black mb-4 flex items-center gap-2`}>
                        <span className="relative flex h-3 w-3">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${theme.bg} opacity-75`}></span>
                            <span className={`relative inline-flex rounded-full h-3 w-3 ${theme.bg}`}></span>
                        </span>
                        Ask AI Instructor
                    </h2>
                    <p className="text-xs text-gray-400 font-mono mb-6 leading-relaxed">
                        Direct neural uplink established with the senior AI advisor for the <span className="text-white">{career.title}</span> division.
                    </p>
                    <CareerChatbot
                        careerTitle={career.title}
                        division={career.division}
                        themeColor={career.color}
                    />
                </div>
            </aside>

        </div>
    );
}