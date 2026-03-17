"use client";
import React, { useState } from "react";
import { Card, CardBody, CardFooter, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";

interface CareerOptionProps {
  title: string;
  division: string;
  description: string;
  icon: React.ReactNode;
  clearance: string;
  color?: string;
  skills?: string[];
}

const colorMap: Record<string, { border: string; bg: string; text: string; shadow: string }> = {
  red: { border: "border-red-500", bg: "bg-red-500", text: "text-red-400", shadow: "shadow-red-500/50" },
  blue: { border: "border-blue-500", bg: "bg-blue-500", text: "text-blue-400", shadow: "shadow-blue-500/50" },
  orange: { border: "border-orange-500", bg: "bg-orange-500", text: "text-orange-400", shadow: "shadow-orange-500/50" },
  purple: { border: "border-purple-500", bg: "bg-purple-500", text: "text-purple-400", shadow: "shadow-purple-500/50" },
  green: { border: "border-green-500", bg: "bg-green-500", text: "text-green-400", shadow: "shadow-green-500/50" },
  yellow: { border: "border-yellow-400", bg: "bg-yellow-400", text: "text-yellow-400", shadow: "shadow-yellow-400/50" },
};

export default function CareerCard({ title, division, description, icon, clearance, color = "blue", skills = [] }: CareerOptionProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const theme = colorMap[color] || colorMap.blue;

  return (
    <>
      <Card
        isPressable
        onPress={onOpen}
        className={`group relative w-full max-w-[300px] bg-black/50 backdrop-blur-xl border ${theme.border}/20 hover:${theme.border}/60 transition-all duration-500 rounded-lg overflow-visible`}
      >
        {/* Tech Brackets */}
        <div className={`absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 ${theme.border}/40 group-hover:${theme.border} transition-colors`} />
        <div className={`absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 ${theme.border}/40 group-hover:${theme.border} transition-colors`} />

        <CardBody className="p-6 flex flex-col items-center text-center gap-4">
          <div className={`p-4 ${theme.bg}/5 rounded-full border ${theme.border}/20 group-hover:${theme.shadow} transition-all ${theme.text}`}>
            {icon}
          </div>
          <div className="space-y-1">
            <p className={`text-[10px] font-mono ${theme.text} tracking-[0.3em] uppercase opacity-70`}>{division}</p>
            <h3 className="text-xl font-black text-white tracking-tighter uppercase italic">{title}</h3>
          </div>
          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </CardBody>

        <CardFooter className="border-t border-white/5 bg-white/5 flex justify-between items-center px-6 py-3">
          <div className="flex flex-col text-left">
            <span className={`text-[8px] ${theme.text}/50 uppercase font-mono`}>Clearance</span>
            <span className="text-[10px] text-white font-bold uppercase tracking-widest">{clearance}</span>
          </div>
          <div className={`h-2 w-2 ${theme.bg} rounded-full animate-pulse ${theme.shadow}`} />
        </CardFooter>

        {/* Hover Scanline */}
        <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent translate-y-full group-hover:translate-y-[-100%] transition-transform duration-1000 pointer-events-none`} />
      </Card>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        size="2xl"
        classNames={{
          base: `bg-black/95 border ${theme.border}/40 rounded-none shadow-[0_0_50px_rgba(0,0,0,0.8)] mx-4`,
          header: `border-b ${theme.border}/20 ${theme.bg}/5`,
          body: "py-8",
          footer: `border-t ${theme.border}/20 ${theme.bg}/5`,
          closeButton: `hover:${theme.bg}/20 active:${theme.bg}/40 ${theme.text}`,
        }}
      >
        <ModalContent className="font-mono overflow-hidden relative">
          {(onClose) => (
            <>
              {/* Background HUD Decor */}
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <p className={`text-[40px] font-black italic ${theme.text}`}>MARVEL</p>
              </div>

              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center justify-between w-full pr-8">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className={`w-3 h-3 ${theme.bg} animate-ping absolute rounded-full`} />
                      <div className={`w-3 h-3 ${theme.bg} rounded-full relative ${theme.shadow}`} />
                    </div>
                    <span className={`${theme.text} text-[10px] tracking-[0.5em] uppercase font-black`}>Secure Intelligence Briefing</span>
                  </div>
                  <span className={`text-[9px] ${theme.text}/40`}>UUID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
                </div>
                <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mt-2">
                  {title} <span className={`${theme.text}/50 text-lg not-italic font-light ml-2`}>// ARCHIVE</span>
                </h2>
              </ModalHeader>

              <ModalBody className="flex flex-col items-center justify-center space-y-8 py-8">
                {/* Biometric Scan Animation */}
                <div className={`relative h-[2px] w-full max-w-sm ${theme.bg} overflow-hidden rounded-full opacity-30`}>
                  <div className={`absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white to-transparent animate-[scan_2s_linear_infinite]`} />
                </div>

                {/* Description Centered */}
                <div className="text-center space-y-3 max-w-lg">
                  <div className="flex items-center justify-center gap-2">
                    <div className={`h-px w-8 ${theme.bg}`} />
                    <h4 className={`text-[10px] ${theme.text} uppercase tracking-[0.4em] font-black`}>Mission Directives</h4>
                    <div className={`h-px w-8 ${theme.bg}`} />
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed italic px-4">
                    &quot;{description}&quot;
                  </p>
                </div>

                {/* Stats / Info - Centered Grid */}
                <div className="flex gap-12 items-center bg-black/40 border border-white/10 px-10 py-5 rounded-xl shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] relative overflow-hidden group">
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[scan_2s_linear_infinite]`} />

                  <div className="flex flex-col items-center gap-2">
                    <p className={`text-[9px] ${theme.text} uppercase tracking-widest font-bold opacity-70`}>Operational Unit</p>
                    <p className="text-[11px] text-white font-black uppercase tracking-wider">{division}</p>
                  </div>
                  <div className={`w-px h-10 ${theme.bg} opacity-40`} />
                  <div className="flex flex-col items-center gap-2">
                    <p className={`text-[9px] ${theme.text} uppercase tracking-widest font-bold opacity-70`}>Authorization</p>
                    <p className="text-[11px] text-white font-black uppercase tracking-wider">{clearance}</p>
                  </div>
                </div>

                {/* Skills/Points Section */}
                {skills && skills.length > 0 && (
                  <div className="w-full flex flex-col items-center space-y-5 pt-2">
                    <div className="flex items-center justify-center w-full max-w-md gap-4 opacity-80">
                      <div className={`h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-white/40`} />
                      <span className={`text-[9px] ${theme.text} font-bold uppercase tracking-[0.3em]`}>Key Competencies</span>
                      <div className={`h-px flex-1 bg-gradient-to-l from-transparent via-white/20 to-white/40`} />
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 max-w-md">
                      {skills.map((skill, idx) => (
                        <div key={idx} className={`px-4 py-2 bg-white/5 ${theme.border} border border-opacity-30 rounded-full text-xs text-gray-200 shadow-[0_0_15px_rgba(0,0,0,0.6)] hover:bg-white/10 transition-all flex items-center gap-2`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${theme.bg} ${theme.shadow} animate-pulse`} />
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </ModalBody>

              <ModalFooter className="flex justify-between items-center">
                <div className="flex flex-col text-left">
                  <p className="text-[7px] text-gray-500 uppercase">Timestamp</p>
                  <p className={`text-[9px] ${theme.text}/60 font-mono`}>03.17.2026_16:12</p>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="light"
                    onPress={onClose}
                    className="text-white/40 uppercase text-[10px] font-bold tracking-widest hover:text-white transition-colors"
                  >
                    Abort
                  </Button>
                  <Button
                    className={`${theme.bg} hover:opacity-80 text-black font-black uppercase text-[10px] tracking-widest rounded-sm px-10 relative overflow-hidden group`}
                  >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                    <span className="relative z-10">Confirm Enlistment</span>
                  </Button>
                </div>
              </ModalFooter>

              {/* Tactical Corners */}
              <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 ${theme.border}`} />
              <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 ${theme.border}`} />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
