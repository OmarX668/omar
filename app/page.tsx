"use client";

import { useEffect, useState, useRef } from "react";
import { HeroTerminal } from "@/components/hero-terminal";
import { ServicesDirectory } from "@/components/services-directory";
import { ClassifiedProjects } from "@/components/classified-projects";
import { SystemConfigPricing } from "@/components/system-config-pricing";
import { CommandContact } from "@/components/command-contact";
import { SystemNav } from "@/components/system-nav";
import { LanguageProvider, useLanguage } from "@/lib/language-context";

function PhantomOSContent() {
  const [bootComplete, setBootComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [sectionsVisible, setSectionsVisible] = useState<Record<string, boolean>>({});
  const [loadingSection, setLoadingSection] = useState<string | null>(null);
  const { dir, t } = useLanguage();

  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setBootComplete(true);
      setTimeout(() => setShowContent(true), 500);
    }, 3500);

    return () => clearTimeout(bootTimer);
  }, []);

  // Cascade reveal sections from top to bottom
  useEffect(() => {
    if (!showContent) return;
    
    const sectionIds = ["nav", "hero", "services", "projects", "pricing", "contact", "footer"];
    sectionIds.forEach((id, index) => {
      setTimeout(() => {
        setSectionsVisible(prev => ({ ...prev, [id]: true }));
      }, index * 200);
    });
  }, [showContent]);

  // Loading bar on section scroll
  useEffect(() => {
    if (!showContent) return;

    const observer = new IntersectionObserver(
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
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [showContent]);

  return (
    <main dir={dir} className="min-h-screen bg-black text-foreground relative overflow-x-hidden transition-all duration-300">
      {/* Animated Scanline Overlay - Top to Bottom sweep */}
      <div className={`scanlines ${showContent ? 'scanlines-animate' : ''}`} />
      
      {/* Screen flicker container */}
      <div className="screen-flicker crt-curve">
        {/* Boot Sequence */}
        {!bootComplete && <BootSequence />}

        {/* Main Content */}
        {bootComplete && (
          <div className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
            {/* Nav with slide-in */}
            <div className={`section-slide-down ${sectionsVisible["nav"] ? 'visible' : ''}`}>
              <SystemNav />
            </div>
            
            {/* Loading bar indicator */}
            {loadingSection && (
              <div className="fixed top-0 left-0 w-full z-50">
                <div className="loading-bar animate-[load_0.8s_ease-out]" />
              </div>
            )}

            <section id="hero" className={`section-slide-down ${sectionsVisible["hero"] ? 'visible' : ''}`}>
              <HeroTerminal />
            </section>

            <section id="services" className={`section-slide-down ${sectionsVisible["services"] ? 'visible' : ''}`}>
              <ServicesDirectory />
            </section>

            <section id="projects" className={`section-slide-down ${sectionsVisible["projects"] ? 'visible' : ''}`}>
              <ClassifiedProjects />
            </section>

            <section id="pricing" className={`section-slide-down ${sectionsVisible["pricing"] ? 'visible' : ''}`}>
              <SystemConfigPricing />
            </section>

            <section id="contact" className={`section-slide-down ${sectionsVisible["contact"] ? 'visible' : ''}`}>
              <CommandContact />
            </section>

            {/* Footer */}
            <footer className={`border-t border-border py-8 px-6 section-slide-down ${sectionsVisible["footer"] ? 'visible' : ''}`}>
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-muted-foreground text-sm">
                  <span className="text-primary">{t("footer.system")}</span> {t("footer.rights")}
                </p>
                <p className="text-muted-foreground text-sm">
                  <span className="text-primary">{t("footer.session")}</span> {Math.random().toString(36).substring(2, 10).toUpperCase()}
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t, dir } = useLanguage();
  
  const bootLines = [
    t("boot.kernel"),
    t("boot.init"),
    t("boot.crypto"),
    t("boot.tunnel"),
    t("boot.firewall"),
    t("boot.clearance"),
    t("boot.decrypt"),
    "",
    "╔══════════════════════════════════════════════════════╗",
    "║                                                      ║",
    "║     █▀█ █░█ ▄▀█ █▄░█ ▀█▀ █▀█ █▀▄▀█                  ║",
    "║     █▀▀ █▀█ █▀█ █░▀█ ░█░ █▄█ █░▀░█                  ║",
    "║                                                      ║",
    "║           D E V E L O P M E N T                      ║",
    "║                                                      ║",
    "╚══════════════════════════════════════════════════════╝",
    "",
    t("boot.access"),
    t("boot.welcome"),
  ];

  useEffect(() => {
    if (currentIndex < bootLines.length) {
      const timer = setTimeout(() => {
        setLines((prev) => [...prev, bootLines[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, bootLines]);

  return (
    <div dir={dir} className="fixed inset-0 bg-black z-50 flex items-start justify-center p-6 pt-20 overflow-hidden">
      {/* Top-to-bottom boot reveal */}
      <div className="max-w-2xl w-full boot-sequence-container">
        <div className="font-mono text-sm md:text-base">
          {lines.map((line, i) => {
            const text = typeof line === "string" ? line : "";
            const isOk = text.includes("[OK]") || text.includes("[تم]");
            const isAccess = text.includes("ACCESS") || text.includes("الوصول") || text.includes("WELCOME") || text.includes("مرحباً");
            const isAscii = text.includes("█") || text.includes("╔") || text.includes("║") || text.includes("╚");
            
            return (
              <div
                key={i}
                className={`boot-line-animate ${
                  isOk
                    ? "text-primary"
                    : isAccess
                    ? "text-primary glow-green-text"
                    : isAscii
                    ? "text-primary"
                    : "text-muted-foreground"
                } ${isAccess ? "text-lg md:text-xl mt-2" : ""}`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {text || "\u00A0"}
              </div>
            );
          })}
          <span className="inline-block w-3 h-5 bg-primary animate-pulse ms-1" />
        </div>
      </div>
      
      {/* Scanning line effect during boot */}
      <div className="boot-scan-line" />
    </div>
  );
}

export default function PhantomOS() {
  return (
    <LanguageProvider>
      <PhantomOSContent />
    </LanguageProvider>
  );
}
