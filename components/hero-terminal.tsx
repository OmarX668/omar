"use client";

import { useEffect, useState } from "react";

export function HeroTerminal() {
  const [displayText, setDisplayText] = useState("");
  const [showSubtext, setShowSubtext] = useState(false);
  const fullText = "INITIALIZING... ACCESS GRANTED. WELCOME TO PHANTOM.DEV";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowSubtext(true), 500);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
      {/* Terminal Window */}
      <div className="w-full max-w-4xl">
        {/* Terminal Header */}
        <div className="bg-muted border border-border px-4 py-2 flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-destructive" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-primary" />
          </div>
          <span className="text-muted-foreground text-sm ml-4">
            phantom@secure-shell:~$
          </span>
        </div>

        {/* Terminal Body */}
        <div className="bg-black border border-t-0 border-border p-6 md:p-10">
          {/* Main Title */}
          <div className="mb-8">
            <span className="text-primary text-sm">root@phantom:~# </span>
            <h1 className="inline text-2xl md:text-4xl lg:text-5xl text-foreground font-bold">
              {displayText}
              <span className="inline-block w-3 h-6 md:h-10 bg-primary animate-pulse ml-1 align-middle" />
            </h1>
          </div>

          {/* Subtext */}
          <div
            className={`transition-all duration-1000 ${
              showSubtext ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="border-l-2 border-primary pl-4 mb-8">
              <p className="text-muted-foreground text-lg md:text-xl mb-2">
                <span className="text-primary">&gt;</span> Elite programming services for Discord servers
              </p>
              <p className="text-muted-foreground md:text-lg">
                <span className="text-primary">&gt;</span> Custom bots • Web development • Specialized solutions
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { label: "PROJECTS", value: "150+", prefix: "0x" },
                { label: "CLIENTS", value: "89", prefix: "0x" },
                { label: "UPTIME", value: "99.9%", prefix: "" },
                { label: "RESPONSE", value: "<2HR", prefix: "" },
              ].map((stat) => (
                <div key={stat.label} className="border border-border p-4 hover:border-primary/50 transition-colors">
                  <p className="text-primary text-2xl md:text-3xl font-bold">
                    {stat.prefix}{stat.value}
                  </p>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#services"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-bold hover:glow-green transition-all glitch-hover"
              >
                <span className="mr-2">&gt;</span>
                EXPLORE SERVICES
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary hover:bg-primary/10 transition-all"
              >
                <span className="mr-2">$</span>
                INITIATE CONTACT
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="mt-12 animate-bounce">
        <div className="text-primary text-sm mb-2">SCROLL DOWN</div>
        <div className="w-px h-8 bg-primary mx-auto" />
      </div>
    </div>
  );
}
