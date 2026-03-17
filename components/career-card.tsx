"use client";
import React, { useState } from "react";
import { Card, CardBody, CardFooter, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";

interface CareerOptionProps {
  title: string;
  division: string;
  description: string;
  icon: React.ReactNode;
  clearance: string;
}

export default function CareerCard({ title, division, description, icon, clearance }: CareerOptionProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Card
        isPressable
        onPress={onOpen}
        className="group relative w-full max-w-[300px] bg-black/40 backdrop-blur-xl border border-blue-500/20 hover:border-blue-400/60 transition-all duration-500 rounded-none overflow-visible"
      >
        {/* Tech Brackets */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-blue-500/40 group-hover:border-blue-400 transition-colors" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-blue-500/40 group-hover:border-blue-400 transition-colors" />

        <CardBody className="p-6 flex flex-col items-center text-center gap-4">
          <div className="p-4 bg-blue-500/5 rounded-full border border-blue-500/20 shadow-[0_0_20px_rgba(0,210,255,0.1)] group-hover:shadow-[0_0_30px_rgba(0,210,255,0.3)] transition-all">
            {icon}
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-mono text-blue-400 tracking-[0.3em] uppercase opacity-70">{division}</p>
            <h3 className="text-xl font-black text-white tracking-tighter uppercase italic">{title}</h3>
          </div>
          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </CardBody>

        <CardFooter className="border-t border-white/5 bg-white/5 flex justify-between items-center px-6 py-3">
          <div className="flex flex-col">
            <span className="text-[8px] text-blue-400/50 uppercase font-mono">Clearance</span>
            <span className="text-[10px] text-white font-bold uppercase tracking-widest">{clearance}</span>
          </div>
          <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(0,210,255,0.8)]" />
        </CardFooter>

        {/* Hover Scanline */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 via-blue-500/5 to-blue-500/0 translate-y-full group-hover:translate-y-[-100%] transition-transform duration-1000 pointer-events-none" />
      </Card>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        size="2xl"
        classNames={{
          base: "bg-black/95 border border-blue-500/40 rounded-none shadow-[0_0_50px_rgba(0,210,255,0.2)]",
          header: "border-b border-blue-500/20 bg-blue-500/5",
          body: "py-8",
          footer: "border-t border-blue-500/20 bg-blue-500/5",
          closeButton: "hover:bg-blue-500/20 active:bg-blue-500/40 text-blue-400",
        }}
      >
        <ModalContent className="font-mono overflow-hidden relative">
          {(onClose) => (
            <>
              {/* Background HUD Decor */}
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <p className="text-[40px] font-black italic">S.H.I.E.L.D.</p>
              </div>

              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center justify-between w-full pr-8">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-3 h-3 bg-blue-500 animate-ping absolute rounded-full" />
                      <div className="w-3 h-3 bg-blue-500 rounded-full relative shadow-[0_0_10px_rgba(0,210,255,1)]" />
                    </div>
                    <span className="text-blue-400 text-[10px] tracking-[0.5em] uppercase font-black">Secure Intelligence Briefing</span>
                  </div>
                  <span className="text-[9px] text-blue-500/40">UUID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
                </div>
                <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mt-2">
                  {title} <span className="text-blue-500/50 text-lg not-italic font-light ml-2">{`// ARCHIVE`}</span>
                </h2>
              </ModalHeader>

              <ModalBody className="space-y-6">
                {/* Biometric Scan Animation */}
                <div className="relative h-1 w-full bg-blue-900/20 overflow-hidden">
                  <div className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-[scan_2s_linear_infinite]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-1 bg-blue-500" />
                        <p className="text-[10px] text-blue-400 uppercase tracking-widest font-bold">Mission Objectives</p>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed pl-3 border-l border-white/5 italic">
                        {description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1 bg-blue-500/5 p-3 border-l-2 border-blue-500/50">
                        <p className="text-[8px] text-blue-400/60 uppercase">Operational Unit</p>
                        <p className="text-xs text-white font-black uppercase tracking-wider">{division}</p>
                      </div>
                      <div className="space-y-1 bg-blue-500/5 p-3 border-l-2 border-blue-500/50">
                        <p className="text-[8px] text-blue-400/60 uppercase">Authorization</p>
                        <p className="text-xs text-white font-black uppercase tracking-wider">{clearance}</p>
                      </div>
                    </div>
                  </div>

                  {/* Tactical Data Sidebar */}
                  <div className="bg-white/5 p-4 border border-white/10 space-y-4">
                    <p className="text-[9px] text-blue-400 font-bold uppercase border-b border-blue-500/20 pb-2">Skill Calibration</p>
                    {[
                      { label: "Neural Sync", val: "88%" },
                      { label: "Tactical IQ", val: "94%" },
                      { label: "Bio-Rhythm", val: "OK" }
                    ].map(stat => (
                      <div key={stat.label} className="flex justify-between items-center">
                        <span className="text-[8px] text-gray-500 uppercase">{stat.label}</span>
                        <span className="text-[10px] text-blue-400 font-mono">{stat.val}</span>
                      </div>
                    ))}
                    <div className="pt-4 flex justify-center">
                      <div className="w-16 h-16 border-2 border-dashed border-blue-500/20 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
                        <div className="w-12 h-12 border border-blue-400/40 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 py-2 opacity-60">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
                  <p className="text-[8px] text-blue-400 uppercase tracking-[0.3em]">Interpolating Neural Pathway Data</p>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
                </div>
              </ModalBody>

              <ModalFooter className="flex justify-between items-center">
                <div className="flex flex-col">
                  <p className="text-[7px] text-gray-500 uppercase">Timestamp</p>
                  <p className="text-[9px] text-blue-400/60 font-mono">03.17.2026_16:12</p>
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
                    className="bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-[10px] tracking-widest rounded-none px-10 shadow-[0_0_20px_rgba(0,210,255,0.4)] relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                    <span className="relative z-10">Confirm Enlistment</span>
                  </Button>
                </div>
              </ModalFooter>

              {/* Tactical Corners */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-500" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-500" />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
