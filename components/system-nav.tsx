"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";

export function SystemNav() {
  const [time, setTime] = useState("");
  const [activeSection, setActiveSection] = useState("hero");
  const { language, toggleLanguage, t, dir } = useLanguage();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString(language === "ar" ? "ar-SA" : "en-US", { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [language]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "services", "projects", "pricing", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { id: "hero", label: t("nav.root") },
    { id: "services", label: t("nav.services") },
    { id: "projects", label: t("nav.classified") },
    { id: "pricing", label: t("nav.config") },
    { id: "contact", label: t("nav.connect") },
  ];

  return (
    <nav dir={dir} className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-primary font-bold text-lg glitch-hover cursor-pointer" onClick={() => scrollTo("hero")}>
              DOBLEX<span className="text-foreground">.DEV</span>
            </span>
            <span className="hidden md:block text-muted-foreground text-xs">
              {t("nav.secure")}
            </span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3 py-1.5 text-sm transition-all duration-200 ${
                  activeSection === item.id
                    ? "text-primary bg-primary/10 border border-primary/30"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Status & Language Toggle */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 text-sm text-primary border border-primary/50 hover:bg-primary/10 hover:border-primary transition-all duration-200 font-mono"
            >
              {language === "ar" ? "[ ع / EN ]" : "[ AR / EN ]"}
            </button>
            
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-muted-foreground">{t("nav.online")}</span>
            </div>
            <div className="text-primary text-sm font-mono">{time}</div>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden pb-2 flex gap-1 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`px-2 py-1 text-xs whitespace-nowrap transition-all ${
                activeSection === item.id
                  ? "text-primary border-b border-primary"
                  : "text-muted-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
