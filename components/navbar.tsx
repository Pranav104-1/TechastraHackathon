"use client";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@heroui/react";

const TechCorner = ({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) => {
  const styles = {
    tl: "top-0 left-0 border-t border-l",
    tr: "top-0 right-0 border-t border-r",
    bl: "bottom-0 left-0 border-b border-l",
    br: "bottom-0 right-0 border-b border-r"
  };
  return <div className={`absolute w-2 h-2 border-blue-400/60 ${styles[position]}`} />;
};

export const AvengersLogo = () => {
  return (
    <div className="relative flex items-center mx-auto justify-center">
      <div className="absolute inset-0 bg-blue-500/20 blur-lg rounded-full animate-pulse" />
      <svg viewBox="0 0 100 100" width="32" height="32" className="relative drop-shadow-[0_0_8px_rgba(0,210,255,0.8)]">
        <path
          d="M30 75 L50 20 L70 75 M38 58 H62"
          fill="none"
          stroke="white"
          strokeWidth="10"
          strokeLinecap="square"
        />
        <path d="M72 50 L85 45 L72 40" fill="none" stroke="#00d2ff" strokeWidth="5" />
      </svg>
    </div>
  );
};

export default function NavBar() {
  return (
    <div className="fixed top-2 sm:top-6 left-0 right-0 z-50 flex justify-center px-2 sm:px-4">
      <Navbar

        className="h-12 sm:h-14 w-full sm:w-max max-w-full bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(0,210,255,0.15)] overflow-visible"
      >
        <NavbarContent className="flex gap-2 sm:gap-4 md:gap-8 w-full text-center items-center justify-between sm:justify-center px-1 sm:px-0" justify="center">
          {/* Brand - Integrated into center flow */}
          <NavbarItem>
            <div className="flex items-center gap-1 sm:gap-3">
              <AvengersLogo />
              <div className="hidden sm:flex flex-col font-mono leading-none border-r border-white/10 pr-4">
                <p className="font-black text-sm sm:text-lg tracking-tighter text-white uppercase italic">S.H.I.E.L.D.</p>
                <p className="text-[6px] sm:text-[7px] font-bold text-blue-400 tracking-[0.4em] uppercase opacity-70">Academy</p>
              </div>
            </div>
          </NavbarItem>

          {/* Navigation - Centered links */}
          <NavbarItem className="hidden md:flex items-center gap-1">
            {[
              { name: 'Home', href: '/' },
              { name: 'Quiz', href: '#' },
              { name: 'Comm Link', href: '/community' },
              { name: 'Chatbot', href: '#' },
              { name: 'Advice', href: '#' }
            ].map((item, idx) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-1 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 rounded-md
                  ${item.name === 'Comm Link'
                    ? 'text-blue-400 bg-blue-500/10 shadow-[inset_0_0_10px_rgba(0,210,255,0.2)] border border-blue-500/20'
                    : 'text-white/50 hover:text-white hover:bg-white/5'}
                `}
              >
                {item.name}
              </Link>
            ))}
          </NavbarItem>

          {/* Actions - Integrated into center flow */}
          <NavbarItem className="flex items-center gap-2 sm:gap-6 pl-1 sm:pl-4 border-l border-white/10">
            <div className="hidden lg:flex flex-col text-right">
              <p className="text-[7px] text-blue-400/50 uppercase tracking-widest leading-none">Status</p>
              <div className="flex items-center gap-1 justify-end">
                <span className="w-1 h-1 bg-green-500 rounded-full animate-ping" />
                <p className="text-[8px] text-green-400/80 font-bold uppercase">Ready</p>
              </div>
            </div>

            <Show when="signed-out">
              <div className="flex items-center gap-1 sm:gap-3">
                <SignInButton mode="modal">
                  <button className="hidden sm:block text-[9px] text-white/50 hover:text-white font-bold uppercase tracking-[0.2em] transition-all hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] px-2">
                    Access
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button
                    size="sm"
                    className="h-8 sm:h-9 cursor-pointer bg-blue-500/10 backdrop-blur-md border border-blue-400/40 text-blue-400 font-black tracking-[0.2em] sm:tracking-[0.3em] text-[8px] sm:text-[10px] uppercase rounded-sm shadow-[0_0_20px_rgba(0,210,255,0.15)] px-2 sm:px-6 relative overflow-hidden group transition-all duration-500 hover:bg-blue-500 hover:text-black hover:shadow-[0_0_30px_rgba(0,210,255,0.8)] hover:scale-105 active:scale-95"
                  >
                    {/* Internal Tech Brackets */}
                    <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t-2 border-l-2 border-blue-400/60 group-hover:border-white transition-colors" />
                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b-2 border-r-2 border-blue-400/60 group-hover:border-white transition-colors" />

                    {/* High-Speed Scanline */}
                    <div className="absolute inset-x-0 h-[2px] bg-white/40 top-0 -translate-y-full group-hover:animate-[scan_1s_linear_infinite] opacity-0 group-hover:opacity-100" />

                    {/* Energy Pulse Background */}
                    <div className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-20 animate-pulse" />

                    <span className="relative z-10">Signin</span>
                  </Button>
                </SignUpButton>
              </div>
            </Show>
            <Show when="signed-in">
              <div className="relative p-[2px] bg-gradient-to-br from-blue-400 via-blue-600 to-transparent rounded-xl shadow-[0_0_15px_rgba(0,210,255,0.4)] animate-[pulse_3s_infinite]">
                <div className="bg-black rounded-[10px] p-0.5">
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "rounded-lg w-8 h-8 border border-white/10",
                      }
                    }}
                  />
                </div>
              </div>
            </Show>
          </NavbarItem>
        </NavbarContent>

        {/* Top/Bottom Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </Navbar>
    </div>
  );
}

