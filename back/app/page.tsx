import CareerCard from "@/components/career-card";

export default function Home() {
  const careers = [
    {
      id: "software-engineer",
      title: "Software Engineer",
      division: "Stark Industries / AI Division",
      description: "Developing advanced autonomous systems and neural interfaces. Inspired by Tony Stark's engineering genius, you'll build the next generation of JARVIS-level intelligence.",
      clearance: "Level 9 (Stark Prime)",
      color: "red",
      skills: ["Advanced AI Prompting", "Neural Network Architecture", "Autonomous Systems", "Quantum Computing", "Cybersecurity & Encryption"],
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_currentColor]">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      )
    },
    {
      id: "chief-surgeon",
      title: "Chief Surgeon",
      division: "Medical / Bio-Science Wing",
      description: "Mastering the arts of life-saving medicine and experimental bio-tech. Like Stephen Strange, your precision and dedication will push the boundaries of human recovery.",
      clearance: "Level 8 (Medical)",
      color: "orange",
      skills: ["Experimental Bio-Tech", "Neuro-precision Surgery", "Trauma Recovery", "Cellular Regeneration", "Mystic Arts Basics"],
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_currentColor]">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      )
    },
    {
      id: "lead-illustrator",
      title: "Lead Illustrator",
      division: "Creative Arts / Archives",
      description: "Capturing the history and essence of heroism through visual storytelling. Following Steve Rogers' artistic roots, you'll document the legacy of the Avengers Initiative.",
      clearance: "Level 6 (Communications)",
      color: "blue",
      skills: ["Visual Storytelling", "Holographic Drafting", "Historical Archiving", "Propaganda & Communications", "Brand Identity"],
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_currentColor]">
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="M2 2l5 5" />
          <path d="M9.5 14.5L16 18" />
        </svg>
      )
    },
    {
      id: "ui-ux-designer",
      title: "UI/UX Designer",
      division: "Stark Tech / Visual Systems",
      description: "Crafting intuitive holographic interfaces for tactical HUDs. Channelling Janet van Dyne's eye for design, you'll make high-tech complexity feel seamless and beautiful.",
      clearance: "Level 7 (Design)",
      color: "purple",
      skills: ["HUD Interface Design", "Spatial Computing", "Human-Computer Interaction", "Rapid Prototyping", "3D Modeling"],
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_currentColor]">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      )
    },
    {
      id: "bio-geneticist",
      title: "Bio-Geneticist",
      division: "Gamma Radiation Research",
      description: "Investigating the fundamental building blocks of cellular mutation. Like Bruce Banner, your research will unlock the secrets of superhuman biology and regenerative medicine.",
      clearance: "Omega Level",
      color: "green",
      skills: ["Genome Sequencing", "Radiation Mitigation", "Cellular Mutation", "Extraterrestrial Biology", "Radiological Safety"],
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_currentColor]">
          <path d="M10 2v8l-6 10a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3L14 10V2" />
          <line x1="8" y1="2" x2="16" y2="2" />
          <line x1="7" y1="15" x2="17" y2="15" />
        </svg>
      )
    },
    {
      id: "quantum-physicist",
      title: "Quantum Physicist",
      division: "Asgardian Liaison / Research",
      description: "Bridging the gap between human science and cosmic reality. Following Jane Foster's lead, you'll study the Einstein-Rosen bridges and multiversal anomalies.",
      clearance: "Level 8+",
      color: "yellow",
      skills: ["Multiverse Theory", "Particle Physics", "Einstein-Rosen Bridges", "Energy Containment", "Cosmic Astrodynamics"],
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_currentColor]">
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
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-8 mt-20">
      <div className="max-w-7xl w-full space-y-12">
        <header className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
            <span className="text-blue-400 font-mono text-[10px] tracking-[0.6em] uppercase animate-pulse">Select Your Path</span>
            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Career <span className="text-blue-500">Infiltration</span>
          </h1>
          <p className="text-sm text-blue-400/60 font-mono max-w-2xl mx-auto uppercase tracking-widest leading-loose">
            Choose your specialization within the S.H.I.E.L.D. Academy Initiative. Accessing encrypted data streams...
          </p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {careers.map((career) => (
            <CareerCard key={career.title} {...career} />
          ))}
        </main>

        <footer className="pt-12 text-center">
          <p className="text-[10px] text-blue-400/30 uppercase font-mono animate-pulse">
            [SECURE CONNECTION ESTABLISHED] - IP: REDACTED - TIME: 03172026.1422
          </p>
        </footer>
      </div>
    </div>
  );
}
