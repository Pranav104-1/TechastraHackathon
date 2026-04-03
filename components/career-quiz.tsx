"use client";

import { useState } from "react";
import { Button } from "@heroui/react";

// Mock quiz data for careers
const quizData: Record<string, { q: string; opts: string[]; a: number }[]> = {
    "software-engineer": [
        { q: "What is your primary action during an Ultron-level network breach?", opts: ["Unplug the server physically", "Deploy counter-encryption algorithms", "Call Tony Stark", "Format all solid-state drives"], a: 1 },
        { q: "Which technology stack is optimal for compiling J.A.R.V.I.S. neural pathways?", opts: ["HTML & CSS", "Python Data Science", "Rust & C++ Systems Design", "Java Enterprise Edition"], a: 2 },
        { q: "How do you optimize Mark 50 Armor repulsor latency?", opts: ["Increase power output", "Optimize quantum state algorithms", "Add more physical wiring", "Reduce armor plating"], a: 1 }
    ],
    "chief-surgeon": [
        { q: "A patient arrives with a vibranium shrapnel wound. You should:", opts: ["Use standard MRI scanning", "Utilize non-magnetic bio-scanners", "Apply extreme directed heat", "Wait and observe"], a: 1 },
        { q: "What is the primary biological risk of cybernetic enhancement rejection?", opts: ["Nerve tissue degeneration", "Operating system lag", "Arc reactor battery drain", "Wi-Fi disconnection"], a: 0 },
        { q: "When using experimental regenerative cradle tech, what is the required baseline?", opts: ["Full genetic map", "Blood type only", "Hydration levels", "Eye color"], a: 0 }
    ],
    "lead-illustrator": [
        { q: "When documenting a classified S.H.I.E.L.D. op, your primary focus is:", opts: ["Making it look cool", "Accurate tactical recreation", "Exaggerating the enemy", "Abstract expressionism"], a: 1 },
        { q: "Which color palette is strictly standard for Level 6 clearance UI?", opts: ["Neon pinks", "Matte black and tactical blue", "Pastel watercolors", "Sepia tones"], a: 1 },
        { q: "How do you archive visual data on Captain America?", opts: ["Digital vectors only", "Physical canvas and digital vaulting", "Polaroids", "Social media posts"], a: 1 }
    ],
    "ui-ux-designer": [
        { q: "What is the top priority for the Iron Man Heads-Up Display (HUD)?", opts: ["Aesthetic beauty", "Minimal cognitive load under fire", "Maximum information density", "Social integrations"], a: 1 },
        { q: "When designing Wakandan Kimoyo bead interfaces, how do users interact?", opts: ["Keyboard and mouse", "Holographic gestural control", "Touchscreens", "Voice commands only"], a: 1 },
        { q: "What is the failure rate allowed in Quinjet navigation UI?", opts: ["1%", "5%", "0.0001%", "0%"], a: 3 }
    ],
    "bio-geneticist": [
        { q: "What is the first protocol upon detecting a global gamma radiation spike?", opts: ["Run towards it", "Evacuate and deploy remote bio-drones", "Call the press", "Take a sample manually"], a: 1 },
        { q: "When analyzing unstable Inhuman DNA, you must ensure:", opts: ["Absolute thermal containment", "Exposure to oxygen", "Immediate clinical trials", "Mixing with standard DNA"], a: 0 },
        { q: "Rapid cellular regeneration serums often cause what side effect?", opts: ["Increased intelligence", "Extreme caloric deficit", "Flight capabilities", "Invisibility"], a: 1 }
    ],
    "quantum-physicist": [
        { q: "How do you stabilize a collapsing Einstein-Rosen bridge?", opts: ["Add chroniton particles", "Invert the Pym Particle flow", "Hit it with electricity", "Close the blast doors"], a: 1 },
        { q: "When monitoring multiversal incursions, look out for:", opts: ["Red skies", "Temporal energy signatures (TVA standard)", "Heavy rain", "Magnetic anomalies"], a: 1 },
        { q: "What is the standard protective gear for entering the Quantum Realm?", opts: ["Lead-lined hazmat suit", "Sub-atomic variance armor", "Winter coat", "Scuba gear"], a: 1 }
    ]
};

const defaultQuiz = [
    { q: "How do you handle high-stress combat or crisis situations?", opts: ["Panic and retreat", "Strictly follow S.H.I.E.L.D. protocol", "Improvise dangerously", "Ask a superior immediately"], a: 1 },
    { q: "What is your primary motivation for enlisting in this division?", opts: ["Financial compensation", "Protecting global security", "Seeking fame and glory", "Pure scientific curiosity"], a: 1 },
    { q: "What is your approach to teamwork?", opts: ["Lone wolf operations", "Seamless squad integration", "Micro-managing others", "Following blindly"], a: 1 }
];

export default function CareerQuiz({ careerId, theme }: { careerId: string, theme: any }) {
    const [started, setStarted] = useState(false);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [selected, setSelected] = useState<number | null>(null);
    const [showCorrection, setShowCorrection] = useState(false);

    const questions = quizData[careerId] || defaultQuiz;
    const currentQuestion = questions[currentIdx];

    const handleStart = () => {
        setStarted(true);
        setCurrentIdx(0);
        setScore(0);
        setFinished(false);
        setSelected(null);
        setShowCorrection(false);
    };

    const handleAnswer = (idx: number) => {
        if (selected !== null) return; // Prevent double clicking
        setSelected(idx);

        if (idx === currentQuestion.a) {
            setScore(score + 1);
        }
        setShowCorrection(true);

        setTimeout(() => {
            if (currentIdx + 1 < questions.length) {
                setCurrentIdx(currentIdx + 1);
                setSelected(null);
                setShowCorrection(false);
            } else {
                setFinished(true);
            }
        }, 1500); // 1.5s delay to show correct/incorrect color
    };

    if (!started) {
        return (
            <div className="bg-black/30 border border-white/5 p-6 rounded-xl mt-8 flex flex-col items-center text-center">
                <h3 className={`text-lg font-black uppercase ${theme.text} mb-2 flex items-center gap-2`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                    Aptitude Assessment
                </h3>
                <p className="text-sm text-gray-400 font-mono mb-6">
                    Test your knowledge to confirm your eligibility for this division.
                </p>
                <Button
                    onPress={handleStart}
                    className={`bg-white/10 ${theme.text} border border-white/20 hover:bg-white/20 font-mono uppercase tracking-widest`}
                >
                    Initialize Simulation
                </Button>
            </div>
        );
    }

    if (finished) {
        const percentage = Math.round((score / questions.length) * 100);
        const passed = percentage >= 66;

        return (
            <div className={`bg-black/30 border ${passed ? "border-green-500/50" : "border-red-500/50"} p-8 rounded-xl mt-8 flex flex-col items-center text-center`}>
                <h3 className={`text-2xl font-black uppercase ${passed ? "text-green-400" : "text-red-400"} mb-2`}>
                    {passed ? "Assessment Passed" : "Assessment Failed"}
                </h3>
                <p className="text-xl font-mono text-white mb-6">
                    Clearance Rating: {percentage}%
                </p>
                <p className="text-sm text-gray-400 font-mono mb-8">
                    {passed
                        ? "You have demonstrated the necessary competency for this division. Awaiting final command approval."
                        : "Your responses do not align with our current operational standards. Recommend retraining and reapplying."}
                </p>
                <Button
                    onPress={handleStart}
                    className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-mono uppercase"
                >
                    Retake Simulation
                </Button>
            </div>
        );
    }

    return (
        <div className="bg-black/40 border border-white/10 p-6 rounded-xl mt-8">
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <h3 className={`text-sm tracking-widest uppercase font-black ${theme.text}`}>Question {currentIdx + 1}/{questions.length}</h3>
                <span className="text-xs font-mono text-gray-500">Secure Comm-Link active</span>
            </div>

            <p className="text-lg text-white font-mono mb-6 leading-relaxed">
                {currentQuestion.q}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.opts.map((opt, idx) => {
                    let btnClass = "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10";

                    if (showCorrection) {
                        if (idx === currentQuestion.a) {
                            btnClass = "bg-green-500/20 border-green-500/50 text-green-300"; // Correct answer is always green
                        } else if (idx === selected) {
                            btnClass = "bg-red-500/20 border-red-500/50 text-red-300"; // Wrong answer selected turns red
                        } else {
                            btnClass = "opacity-50 pointer-events-none bg-white/5 border-white/5"; // Others dim
                        }
                    } else if (selected === idx) {
                        btnClass = `bg-white/20 border-white/50 text-white`; // Just selected state before checking (rarely visible due to timeout, but good practice)
                    }

                    return (
                        <Button
                            key={idx}
                            onPress={() => handleAnswer(idx)}
                            disabled={selected !== null}
                            className={`p-4 h-auto min-h-[60px] flex items-center justify-start text-left whitespace-normal border transition-all font-mono text-sm ${btnClass}`}
                        >
                            <span className="opacity-50 mr-4 font-bold">{String.fromCharCode(65 + idx)}</span>
                            {opt}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}