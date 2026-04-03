"use client";

import React, { useState, useEffect, useRef } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { Button, Input, ScrollShadow, Avatar, Chip } from "@heroui/react";
import Pusher from "pusher-js";

interface Message {
  id: string;
  user: string;
  userId: string;
  text: string;
  timestamp: string;
  avatar?: string;
}

interface SocketLog {
  time: string;
  event: string;
  status: "success" | "warning" | "error" | "info";
}

export default function CommunityPage() {
  const { user, isLoaded } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [socketStatus, setSocketStatus] = useState<"connecting" | "connected" | "disconnected" | "unavailable">("connecting");
  const [logs, setLogs] = useState<SocketLog[]>([]);
  const [reconnectCounter, setReconnectCounter] = useState(0);
  const [toast, setToast] = useState<{ message: string; type: "error" | "info" | "success" } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const logScrollRef = useRef<HTMLDivElement>(null);

  const addLog = (event: string, status: SocketLog["status"]) => {
    const newLog: SocketLog = {
      time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      event,
      status
    };
    setLogs(prev => [...prev.slice(-10), newLog]);
  };

  // Auto-hide toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Initialize Real-Time WebSocket Connection
  useEffect(() => {
    addLog("Initializing WebSocket handshake...", "info");

    // Check if Pusher keys are available
    if (process.env.NEXT_PUBLIC_PUSHER_KEY) {
      // Using Pusher WebSocket Client
      const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY || "", {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "mt1",
        forceTLS: true
      });

      const channel = pusher.subscribe("shi");

      pusher.connection.bind("state_change", (states: any) => {
        setSocketStatus(states.current);
        addLog(`Socket state: ${states.current}`, states.current === 'connected' ? 'success' : 'warning');
        if (states.current === 'disconnected' || states.current === 'unavailable') {
          setToast({ message: `Connection lost: ${states.current}`, type: "error" });
        }
      });

      channel.bind("pusher:subscription_succeeded", () => {
        addLog("Channel subscription: community-hub active", "success");
      });

      channel.bind("new-message", (data: Message) => {
        addLog(`Incoming data packet: MSG_${data.id.slice(-4)}`, "success");
        setMessages(prev => {
          if (prev.find(m => m.id === data.id)) return prev;
          return [...prev, data];
        });
      });

      pusher.connection.bind("error", (err: any) => {
        const errorMsg = `WebSocket Error: ${err.error?.data?.code || 'Unknown'}`;
        addLog(errorMsg, "error");
        setToast({ message: errorMsg, type: "error" });
      });

      return () => {
        addLog("Closing WebSocket connection...", "warning");
        pusher.unsubscribe("community-hub");
        pusher.disconnect();
      };
    } else {
      addLog("Pusher keys missing. Using local fallback.", "warning");
      setSocketStatus("connected");

      const receiveMockMessage = setInterval(() => {
        addLog(`Mock signal received.`, "info");
      }, 15000);

      return () => clearInterval(receiveMockMessage);
    }
  }, [reconnectCounter]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (logScrollRef.current) logScrollRef.current.scrollTop = logScrollRef.current.scrollHeight;
  }, [logs]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !user) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      user: user.fullName || user.username || "Agent",
      userId: user.id,
      text: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: user.imageUrl
    };

    addLog(`Broadcasting packet: MSG_${newMessage.id.slice(-4)}`, "info");
    setMessages(prev => [...prev, newMessage]);
    setInputValue("");

    // If no pusher key, exit early to avoid API error
    if (!process.env.NEXT_PUBLIC_PUSHER_KEY) return;

    try {
      await fetch("/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage),
      });
    } catch (error) {
      addLog("Broadcast failure: Network interrupt", "error");
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4 md:p-8 mt-20">
      <div className="max-w-6xl w-full h-[750px] flex bg-black/60 backdrop-blur-3xl border border-blue-500/30 rounded-2xl shadow-[0_0_60px_rgba(0,210,255,0.15)] overflow-hidden relative">

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col border-r border-blue-500/20">
          <header className="p-6 border-b border-blue-500/20 bg-blue-500/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className={`w-3 h-3 rounded-full animate-ping absolute ${socketStatus === 'connected' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                <div className={`w-3 h-3 rounded-full relative shadow-[0_0_10px] ${socketStatus === 'connected' ? 'bg-green-500 shadow-green-500' : 'bg-yellow-500 shadow-yellow-500'}`} />
              </div>
              <div>
                <h1 className="text-xl font-black text-white uppercase italic tracking-tighter">S.H.I.E.L.D. Global Comm-Link</h1>
                <p className="text-[8px] text-blue-400 font-mono tracking-[0.4em] uppercase">Status: {socketStatus.toUpperCase()}</p>
              </div>
            </div>

            <Button
              size="sm"
              variant="flat"
              onPress={() => {
                setSocketStatus("connecting");
                setReconnectCounter(c => c + 1);
              }}
              className="bg-blue-500/10 text-blue-400 border border-blue-500/30 uppercase text-[10px] tracking-widest hover:bg-blue-500/20"
            >
              Reconnect
            </Button>
          </header>

          <div className="flex-1 relative overflow-hidden flex flex-col">
            {!user && (
              <div className="absolute inset-0 z-20 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center space-y-6">
                <h2 className="text-xl font-black text-white uppercase italic italic">Agent Authentication Required</h2>
                <SignInButton mode="modal">
                  <Button className="bg-blue-600 text-white font-black uppercase text-xs tracking-widest rounded-none px-12 h-12 shadow-[0_0_30px_rgba(0,210,255,0.4)]">
                    Enlist Now
                  </Button>
                </SignInButton>
              </div>
            )}

            <ScrollShadow ref={scrollRef} className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center opacity-20">
                  <p className="text-[10px] font-mono uppercase tracking-[1em] text-blue-400">Waiting for live signal...</p>
                </div>
              )}
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-4 ${msg.userId === user?.id ? 'flex-row-reverse' : ''}`}>
                  <Avatar size="sm" src={msg.avatar} className="rounded-none border-2 border-blue-500/30" />
                  <div className={`flex flex-col max-w-[75%] ${msg.userId === user?.id ? 'items-end' : ''}`}>
                    <span className="text-[9px] font-black uppercase tracking-widest text-blue-400 mb-1">{msg.user}</span>
                    <div className={`p-4 text-sm ${msg.userId === user?.id ? 'bg-blue-600 text-white rounded-l-2xl rounded-br-2xl' : 'bg-white/5 border border-white/10 text-gray-200 rounded-r-2xl rounded-bl-2xl'}`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
            </ScrollShadow>

            <footer className="p-6 border-t border-blue-500/20 bg-black/40">
              <div className="flex gap-4">
                <Input
                  placeholder="Transmit message data..."
                  disabled={!user}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  classNames={{
                    input: "text-sm text-white font-mono",
                    inputWrapper: "bg-white/5 border border-white/10 rounded-xl h-14",
                  }}
                />
                <Button onPress={handleSendMessage} disabled={!user} className="bg-blue-600 text-white font-black uppercase text-xs tracking-widest rounded-xl h-14 px-8">
                  Broadcast
                </Button>
              </div>
            </footer>
          </div>
        </div>

        {/* WebSocket Signal Intelligence HUD */}
        <aside className="w-64 bg-blue-500/5 flex flex-col">
          <header className="p-4 border-b border-blue-500/20">
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Signal Intelligence</p>
            <p className="text-[7px] text-gray-500 uppercase">WebSocket Monitor v1.0</p>
          </header>

          <div className="flex-1 p-4 space-y-6 flex flex-col overflow-hidden">
            <div className="space-y-2">
              <p className="text-[8px] text-gray-500 uppercase tracking-widest">Signal Strength</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className={`h-1.5 flex-1 ${socketStatus === 'connected' ? (i < 5 ? 'bg-blue-500' : 'bg-blue-500/20') : 'bg-gray-800'}`} />
                ))}
              </div>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
              <p className="text-[8px] text-gray-500 uppercase tracking-widest mb-2">Event Log</p>
              <ScrollShadow ref={logScrollRef} className="flex-1 font-mono text-[8px] space-y-2 overflow-y-auto">
                {logs.map((log, i) => (
                  <div key={i} className={`border-l-2 pl-2 ${log.status === 'success' ? 'border-green-500 text-green-400/80' :
                    log.status === 'warning' ? 'border-yellow-500 text-yellow-400/80' :
                      log.status === 'error' ? 'border-red-500 text-red-400/80' : 'border-blue-500 text-blue-400/80'
                    }`}>
                    <span className="opacity-50">[{log.time}]</span> {log.event}
                  </div>
                ))}
              </ScrollShadow>
            </div>

            <div className="p-4 bg-black/40 border border-blue-500/20">
              <p className="text-[8px] text-gray-500 uppercase mb-1">Encrypted_Channel</p>
              <p className="text-[10px] text-white font-bold break-all opacity-70 italic">SHA256: 4F92...X821</p>
            </div>
          </div>
        </aside>

        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none -z-10" />
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-50 animate-in fade-in slide-in-from-bottom-5">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border ${toast.type === 'error' ? 'bg-red-500/10 border-red-500/50 text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.2)]' :
            toast.type === 'success' ? 'bg-green-500/10 border-green-500/50 text-green-400 shadow-[0_0_30px_rgba(34,197,94,0.2)]' :
              'bg-blue-500/10 border-blue-500/50 text-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.2)]'
            } backdrop-blur-xl`}>
            {toast.type === 'error' && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
            )}
            {toast.type === 'success' && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
            )}
            {toast.type === 'info' && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
            )}
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest opacity-70 font-bold">System Alert</span>
              <span className="text-sm font-mono">{toast.message}</span>
            </div>
            <button onClick={() => setToast(null)} className="ml-4 opacity-50 hover:opacity-100 transition-opacity">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
