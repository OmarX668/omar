"use client";

import { useEffect, useState, useRef } from "react";
import { HeroTerminal } from "@/components/hero-terminal";
import { ServicesDirectory } from "@/components/services-directory";
import { ClassifiedProjects } from "@/components/classified-projects";
import { SystemConfigPricing } from "@/components/system-config-pricing";
import { CommandContact } from "@/components/command-contact";
import { SystemNav } from "@/components/system-nav";

export default function PhantomOS() {
  const [bootComplete, setBootComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [loadingSection, setLoadingSection] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setBootComplete(true);
      setTimeout(() => setShowContent(true), 500);
    }, 3500);

    return () => clearTimeout(bootTimer);
  }, []);

  useEffect(() => {
    if (!showContent) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setLoadingSection(sectionId);
            setTimeout(() => setLoadingSection(null), 800);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observerRef.current?.observe(section));

    return () => observerRef.current?.disconnect();
  }, [showContent]);

  return (
    <main className="min-h-screen bg-black text-foreground relative overflow-x-hidden">
      {/* Scanline Overlay */}
      <div className="scanlines" />
      
      {/* Screen flicker container */}
      <div className="screen-flicker crt-curve">
        {/* Boot Sequence */}
        {!bootComplete && <BootSequence />}

        {/* Main Content */}
        {bootComplete && (
          <div className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
            <SystemNav />
            
            {/* Loading bar indicator */}
            {loadingSection && (
              <div className="fixed top-0 left-0 w-full z-50">
                <div className="loading-bar animate-[load_0.8s_ease-out]" />
              </div>
            )}

            <section id="hero">
              <HeroTerminal />
            </section>

            <section id="services">
              <ServicesDirectory />
            </section>

            <section id="projects">
              <ClassifiedProjects />
            </section>

            <section id="pricing">
              <SystemConfigPricing />
            </section>

            <section id="contact">
              <CommandContact />
            </section>

            {/* Footer */}
            <footer className="border-t border-border py-8 px-6">
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-muted-foreground text-sm">
                  <span className="text-primary">[SYSTEM]</span> PHANTOM.DEV © 2026 — ALL RIGHTS RESERVED
                </p>
                <p className="text-muted-foreground text-sm">
                  <span className="text-primary">SESSION:</span> {Math.random().toString(36).substring(2, 10).toUpperCase()}
                </p>
              </div>
            </footer>
          </div>
        )}
      </div>
    </main>
  );
}

function BootSequence() {
  const [lines, setLines] = useState<string[]>([]);
  const bootLines = [
    "PHANTOM.DEV KERNEL v4.2.0",
    "Initializing secure connection...",
    "Loading cryptographic modules.......... [OK]",
    "Establishing encrypted tunnel.......... [OK]",
    "Bypassing firewall protocols........... [OK]",
    "Verifying clearance level.............. [OK]",
    "Decrypting classified database......... [OK]",
    "",
    "╔══════════════════════════════════════════╗",
    "║                                          ║",
    "║     █▀█ █░█ ▄▀█ █▄░█ ▀█▀ █▀█ █▀▄▀█      ║",
    "║     █▀▀ █▀█ █▀█ █░▀█ ░█░ █▄█ █░▀░█      ║",
    "║                                          ║",
    "║           D E V E L O P M E N T          ║",
    "║                                          ║",
    "╚══════════════════════════════════════════╝",
    "",
    "> ACCESS GRANTED",
    "> WELCOME, OPERATOR",
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < bootLines.length) {
        setLines((prev) => [...prev, bootLines[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="font-mono text-sm md:text-base">
          {lines.map((line, i) => (
            <div
              key={i}
              className={`${
                line.includes("[OK]")
                  ? "text-primary"
                  : line.includes("ACCESS GRANTED") || line.includes("WELCOME")
                  ? "text-primary glow-green-text"
                  : line.includes("█") || line.includes("╔") || line.includes("║") || line.includes("╚")
                  ? "text-primary"
                  : "text-muted-foreground"
              } ${line.includes("ACCESS") ? "text-lg md:text-xl mt-2" : ""}`}
            >
              {line || "\u00A0"}
            </div>
          ))}
          <span className="inline-block w-3 h-5 bg-primary animate-pulse ml-1" />
        </div>
      </div>
    </div>
  );
}
