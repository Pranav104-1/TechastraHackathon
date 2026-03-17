

import CareerCard from "@/components/career-card";

export default function Home() {
  const careers = [
    {
      title: "Software Engineer",
      division: "Stark Industries / AI Division",
      description: "Developing advanced autonomous systems and neural interfaces. Inspired by Tony Stark's engineering genius, you'll build the next generation of JARVIS-level intelligence.",
      clearance: "Level 9 (Stark Prime)",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00d2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_rgba(0,210,255,0.6)]">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      )
    },
    {
      title: "Chief Surgeon",
      division: "Medical / Bio-Science Wing",
      description: "Mastering the arts of life-saving medicine and experimental bio-tech. Like Stephen Strange, your precision and dedication will push the boundaries of human recovery.",
      clearance: "Level 8 (Medical)",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00d2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_rgba(0,210,255,0.6)]">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      )
    },
    {
      title: "Lead Illustrator",
      division: "Creative Arts / Archives",
      description: "Capturing the history and essence of heroism through visual storytelling. Following Steve Rogers' artistic roots, you'll document the legacy of the Avengers Initiative.",
      clearance: "Level 6 (Communications)",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00d2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_rgba(0,210,255,0.6)]">
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="M2 2l5 5" />
          <path d="M9.5 14.5L16 18" />
        </svg>
      )
    },
    {
      title: "UI/UX Designer",
      division: "Stark Tech / Visual Systems",
      description: "Crafting intuitive holographic interfaces for tactical HUDs. Channelling Janet van Dyne's eye for design, you'll make high-tech complexity feel seamless and beautiful.",
      clearance: "Level 7 (Design)",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00d2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_rgba(0,210,255,0.6)]">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      )
    },
    {
      title: "Bio-Geneticist",
      division: "Gamma Radiation Research",
      description: "Investigating the fundamental building blocks of cellular mutation. Like Bruce Banner, your research will unlock the secrets of superhuman biology and regenerative medicine.",
      clearance: "Omega Level",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00d2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_rgba(0,210,255,0.6)]">
          <path d="M10 2v8l-6 10a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3L14 10V2" />
          <line x1="8" y1="2" x2="16" y2="2" />
          <line x1="7" y1="15" x2="17" y2="15" />
        </svg>
      )
    },
    {
      title: "Quantum Physicist",
      division: "Asgardian Liaison / Research",
      description: "Bridging the gap between human science and cosmic reality. Following Jane Foster's lead, you'll study the Einstein-Rosen bridges and multiversal anomalies.",
      clearance: "Level 8+",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00d2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_rgba(0,210,255,0.6)]">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v4" />
          <path d="M12 18v4" />
          <path d="M2 12h4" />
          <path d="M18 12h4" />
        </svg>
      )
    }
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main>
        <SignInButton />
        <UserAvatar />
      </main>
    </div>
  );
}

