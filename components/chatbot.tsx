"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@heroui/react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "assistant", content: string }[]>([
    { role: "assistant", content: "Good day, Agent. I am J.A.R.V.I.S., your dedicated S.H.I.E.L.D. advisory system. How may I be of service today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

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
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error("Network response was not ok");
      
      const data = await response.json();
      setMessages([...newMessages, { role: "assistant", content: data.message }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages([...newMessages, { role: "assistant", content: "I am having trouble establishing a connection to the mainframe, Sir. Please hold." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 h-[500px] flex flex-col bg-black/80 backdrop-blur-xl border border-blue-500/40 rounded-xl shadow-[0_0_40px_rgba(0,210,255,0.2)] overflow-hidden transition-all duration-300">
          {/* Header */}
          <div className="h-14 border-b border-blue-500/30 bg-blue-500/10 flex items-center px-4 justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-2.5 h-2.5 bg-blue-400 absolute rounded-full animate-ping opacity-75" />
                <div className="w-2.5 h-2.5 bg-blue-500 relative rounded-full shadow-[0_0_10px_#00d2ff]" />
              </div>
              <div>
                <h3 className="text-[12px] font-black font-mono text-white uppercase tracking-[0.2em] italic">J.A.R.V.I.S.</h3>
                <p className="text-[8px] text-blue-400/80 font-mono tracking-widest uppercase">Tactical AI Uplink</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-blue-500/20 scrollbar-track-transparent">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} w-full`}>
                <div className={`max-w-[85%] rounded-lg px-4 py-3 text-xs leading-relaxed font-mono ${
                  msg.role === "user" 
                    ? "bg-blue-600/30 border border-blue-500/40 text-blue-100 rounded-tr-sm" 
                    : "bg-white/5 border border-white/10 text-gray-300 rounded-tl-sm relative"
                }`}>
                  {msg.role === "assistant" && (
                     <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50 rounded-l-lg" />
                  )}
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start w-full">
                <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-lg rounded-tl-sm text-xs font-mono text-blue-400 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={sendMessage} className="p-3 border-t border-blue-500/30 bg-black/60 relative">
             {/* Scanning line for input array */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
            
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Query J.A.R.V.I.S. databanks..."
                className="flex-1 bg-white/5 border border-blue-500/20 focus:border-blue-500/60 rounded-sm px-3 text-xs font-mono text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500/40 transition-all"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                isIconOnly
                disabled={isLoading || !input.trim()}
                className="bg-blue-600/40 border border-blue-500/50 hover:bg-blue-500/60 hover:shadow-[0_0_15px_rgba(0,210,255,0.4)] text-blue-100 rounded-sm min-w-10 h-10 transition-all font-bold"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="translate-x-0.5">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-blue-950/80 backdrop-blur-md border border-blue-400/50 shadow-[0_0_30px_rgba(0,210,255,0.3)] flex items-center justify-center hover:scale-110 hover:shadow-[0_0_40px_rgba(0,210,255,0.6)] transition-all duration-300 relative group"
      >
        <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping opacity-60" />
        {/* Arc Reactor Style Core */}
        <div className="w-12 h-12 rounded-full border-2 border-dashed border-blue-400/80 flex items-center justify-center animate-[spin_10s_linear_infinite] group-hover:animate-[spin_4s_linear_infinite]" />
        
        <div className="absolute inset-0 flex items-center justify-center">
            {isOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00d2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_10px_#00d2ff]">
                 <line x1="18" y1="6" x2="6" y2="18"></line>
                 <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00d2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_10px_#00d2ff]">
                   <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
            )}
        </div>
      </button>
    </div>
  );
}
