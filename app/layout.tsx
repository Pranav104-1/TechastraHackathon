import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "./providers";
import NavBar from "@/components/navbar";
import Chatbot from "@/components/chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",  
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "S.H.I.E.L.D Academy Initiative",
  description: "Advanced Career Guidance for the Next Generation of Heroes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClerkProvider
          appearance={{
            baseTheme: "dark",
            ClerkProvider: "bg-[#000205] border border-white/10 rounded-lg shadow-[0_10px_30px_rgba(0,210,255,0.2)]",
            SignInButton: "text-[9px] text-white/70 hover:text-blue-400 font-bold uppercase tracking-[0.2em] transition-all hover:drop-shadow-[0_0_8px_rgba(0,210,255,0.8)]",
            SignUpButton: "text-[9px] text-white/70 hover:text-blue-400 font-bold uppercase tracking-[0.2em] transition-all hover:drop-shadow-[0_0_8px_rgba(0,210,255,0.8)]",
          }}
        >
          <Providers>
            <div className="relative min-h-screen bg-[#000205]">
              <NavBar />
              <main className="relative z-10">
                {children}
              </main>
              <Chatbot />
              {/* Avengers Theme Overlay */}
              <div className="fixed inset-0 bg-grid -z-10 pointer-events-none opacity-20" />
            </div>
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
