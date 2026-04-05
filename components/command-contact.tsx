"use client";

import { useState, useEffect } from "react";

export function CommandContact() {
  const [inputValue, setInputValue] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [showResponse, setShowResponse] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setCommandHistory([...commandHistory, inputValue]);
      setInputValue("");
      setShowResponse(true);
    }
  };

  const [blinkVisible, setBlinkVisible] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setBlinkVisible((v) => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen py-20 px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-10">
          <p className="text-primary text-sm mb-2">
            phantom@connect:~$ ./initiate_contact.sh
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground glitch-hover inline-block cursor-blink">
            ESTABLISH CONNECTION
          </h2>
        </div>

        {/* Terminal Window */}
        <div className="border border-border bg-card">
          {/* Terminal Header */}
          <div className="px-4 py-2 bg-muted border-b border-border flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-destructive" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-primary" />
            </div>
            <span className="text-muted-foreground text-sm ml-4">
              phantom@secure-channel — bash
            </span>
          </div>

          {/* Terminal Body */}
          <div className="p-6 min-h-[400px]">
            {/* Welcome Message */}
            <div className="mb-6 text-sm">
              <p className="text-primary">
                ╔══════════════════════════════════════════════════════╗
              </p>
              <p className="text-primary">
                ║ PHANTOM.DEV SECURE COMMUNICATION CHANNEL             ║
              </p>
              <p className="text-primary">
                ║ Type &apos;help&apos; for available commands                    ║
              </p>
              <p className="text-primary">
                ╚══════════════════════════════════════════════════════╝
              </p>
            </div>

            {/* Command History */}
            {commandHistory.map((cmd, i) => (
              <div key={i} className="mb-4 text-sm">
                <p>
                  <span className="text-primary">phantom@connect:~$</span>{" "}
                  <span className="text-foreground">{cmd}</span>
                </p>
                {cmd.toLowerCase() === "help" && (
                  <div className="mt-2 text-muted-foreground pl-4">
                    <p>Available commands:</p>
                    <p className="text-primary">  discord   </p>
                    <p className="text-muted-foreground">    - Open Discord server invite</p>
                    <p className="text-primary">  services  </p>
                    <p className="text-muted-foreground">    - View available services</p>
                    <p className="text-primary">  quote     </p>
                    <p className="text-muted-foreground">    - Request a custom quote</p>
                    <p className="text-primary">  status    </p>
                    <p className="text-muted-foreground">    - Check system status</p>
                  </div>
                )}
                {cmd.toLowerCase() === "status" && (
                  <div className="mt-2 pl-4">
                    <p className="text-primary">SYSTEM STATUS: ONLINE</p>
                    <p className="text-muted-foreground">Response Time: {"<"}2 hours</p>
                    <p className="text-muted-foreground">Active Projects: 3</p>
                    <p className="text-muted-foreground">Queue Position: Available</p>
                  </div>
                )}
              </div>
            ))}

            {showResponse && commandHistory[commandHistory.length - 1]?.toLowerCase() !== "help" && 
             commandHistory[commandHistory.length - 1]?.toLowerCase() !== "status" && (
              <div className="mb-4 text-sm text-muted-foreground pl-4">
                <p>Processing request...</p>
                <p className="text-primary mt-2">
                  → Use the Discord button below to connect directly
                </p>
              </div>
            )}

            {/* Input Line */}
            <form onSubmit={handleSubmit} className="flex items-center text-sm">
              <span className="text-primary mr-2">phantom@connect:~$</span>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-transparent text-foreground outline-none caret-primary"
                placeholder="Type a command..."
                autoFocus
              />
              <span
                className={`w-2 h-5 bg-primary ${
                  blinkVisible ? "opacity-100" : "opacity-0"
                }`}
              />
            </form>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          {/* Discord CTA */}
          <a
            href="https://discord.gg/phantom"
            target="_blank"
            rel="noopener noreferrer"
            className="group border border-primary bg-primary/5 p-6 hover:bg-primary/10 hover:glow-green transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 border border-primary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <DiscordIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-primary font-bold text-lg glitch-hover">
                  CONNECT VIA DISCORD →
                </p>
                <p className="text-muted-foreground text-sm">
                  Fastest response time
                </p>
              </div>
            </div>
            <div className="mt-4 font-mono text-sm">
              <span className="text-muted-foreground">$</span>{" "}
              <span className="text-foreground">open discord://phantom.dev</span>
            </div>
          </a>

          {/* Email CTA */}
          <a
            href="mailto:contact@phantom.dev"
            className="group border border-border p-6 hover:border-primary/50 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 border border-border flex items-center justify-center group-hover:border-primary/50 transition-colors">
                <MailIcon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div>
                <p className="text-foreground font-bold text-lg group-hover:text-primary transition-colors">
                  ENCRYPTED EMAIL
                </p>
                <p className="text-muted-foreground text-sm">
                  For formal inquiries
                </p>
              </div>
            </div>
            <div className="mt-4 font-mono text-sm">
              <span className="text-muted-foreground">$</span>{" "}
              <span className="text-foreground">mail contact@phantom.dev</span>
            </div>
          </a>
        </div>

        {/* Response Time */}
        <div className="mt-8 border border-border p-4 bg-card">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-primary text-sm mb-1">EXPECTED RESPONSE TIME</p>
              <p className="text-2xl font-bold text-foreground">
                {"<"} 2 HOURS
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-primary rounded-full animate-pulse" />
              <span className="text-muted-foreground">CURRENTLY ONLINE</span>
            </div>
          </div>
        </div>

        {/* Terminal prompt */}
        <div className="mt-8 text-muted-foreground text-sm">
          <span className="text-primary">phantom@connect:~$</span> echo
          &quot;Awaiting your transmission...&quot;
          <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1" />
        </div>
      </div>
    </div>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}
