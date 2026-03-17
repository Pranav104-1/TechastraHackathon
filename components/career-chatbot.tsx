"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@heroui/react";
import ReactMarkdown from "react-markdown";

interface CareerChatbotProps {
  careerTitle: string;
  division: string;
  themeColor: string;
}

export default function CareerChatbot({ careerTitle, division, themeColor }: CareerChatbotProps) {
  const [messages, setMessages] = useState<{ role: "user" | "assistant", content: string }[]>([
    { role: "assistant", content: `Welcome to the ${careerTitle} module, Agent. I am your specialized terminal instructor for ${division}. What would you like to know about this specialization?` }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    
    const newMessages = [...messages, { role: "user" as const, content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: newMessages,
          careerContext: `${careerTitle} in the ${division}` 
        }),
      });

      if (!response.ok) throw new Error("Network response was not ok");
      
      const data = await response.json();
      setMessages([...newMessages, { role: "assistant", content: data.message }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages([...newMessages, { role: "assistant", content: "Connection to division database failed. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const playSpeech = (text: string, index: number) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (isPlaying === index) {
      window.speechSynthesis.cancel();
      setIsPlaying(null);
      return;
    }

    window.speechSynthesis.cancel();
    setIsPlaying(index);

    const cleanText = text.replace(/[*#_\`]/g, "").trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = 
      voices.find(v => v.lang.startsWith("en") && (v.name.includes("UK English Male") || v.name.includes("Google UK English Male") || v.name.includes("Daniel") || v.name.includes("Male"))) 
      || voices.find(v => v.lang.startsWith("en")) 
      || null;

    if (preferredVoice) utterance.voice = preferredVoice;
    utterance.pitch = 0.9;
    utterance.rate = 1.0;
    utterance.onend = () => setIsPlaying(null);
    utterance.onerror = () => setIsPlaying(null);

    window.speechSynthesis.speak(utterance);
  };

  // Determine glow based on theme provided from parent
  // We'll use safe Tailwind arbitrary values since the generic themes are already loaded
  const baseColors: Record<string, string> = {
    red: "blue", // Use blue for the bot's standard HUD internally if we want, or inherit
  }; // Fallback map if needed. We'll stick to a blue UI with small thematic accents.

  return (
    <div className="flex flex-col h-[500px] w-full bg-black/40 border border-white/10 rounded-lg overflow-hidden relative shadow-[0_0_15px_rgba(255,255,255,0.05)]">
       {/* Small thematic top border */}
      <div className={`h-1 w-full bg-${themeColor}-500/50`} />
      
      {/* Header */}
      <div className="h-10 bg-white/5 border-b border-white/10 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
            <div className={`w-2 h-2 bg-${themeColor}-500 rounded-full animate-pulse`} />
            <span className="text-[10px] text-white/70 font-mono uppercase tracking-widest">Division AI Uplink</span>
        </div>
        <span className="text-[8px] text-white/30 font-mono">ENCRYPTED</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex w-full group relative ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[90%] rounded-lg px-3 py-2 text-xs leading-relaxed font-mono ${
              msg.role === "user" 
                ? "bg-white/10 border border-white/20 text-blue-100 rounded-tr-sm" 
                : "bg-black/50 border border-white/5 text-gray-300 rounded-tl-sm relative"
            }`}>
              
              {/* Play Button for Assistant */}
              {msg.role === "assistant" && (
                <div className="absolute top-0 right-0 -mt-2 -mr-2 flex gap-1 bg-black/60 backdrop-blur-sm border border-white/20 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => playSpeech(msg.content, idx)}
                    className="text-white/60 hover:text-white transition cursor-pointer"
                  >
                     {isPlaying === idx ? (
                       <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="6" width="12" height="12"></rect></svg>
                     ) : (
                       <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                     )}
                  </button>
                </div>
              )}

              {msg.role === "assistant" && (
                <div className={`absolute top-0 left-0 w-0.5 h-full bg-${themeColor}-500/50 rounded-l-lg`} />
              )}
              
              {msg.role === "assistant" ? (
                <div className="space-y-1 [&_ul]:list-disc [&_ul]:pl-4 [&_strong]:text-white">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start w-full">
            <div className="bg-black/50 border border-white/5 px-4 py-3 rounded-lg rounded-tl-sm flex items-center gap-2">
              <div className={`w-1 h-1 bg-${themeColor}-400 rounded-full animate-ping`} />
              <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest">Processing...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={sendMessage} className="p-2 border-t border-white/10 bg-black/60 relative">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI Instructor..."
            className="flex-1 bg-white/5 border border-white/10 focus:border-white/30 rounded-sm px-3 py-2 text-xs font-mono text-white placeholder:text-gray-600 focus:outline-none transition-all"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            isIconOnly
            disabled={isLoading || !input.trim()}
            className={`bg-${themeColor}-500/20 border border-${themeColor}-500/30 hover:bg-${themeColor}-500/40 text-${themeColor}-200 rounded-sm min-w-10 h-10 transition-all`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="translate-x-0.5">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </Button>
        </div>
      </form>
    </div>
  );
}
