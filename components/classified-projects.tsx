"use client";

import { useState } from "react";

interface Project {
  id: string;
  codename: string;
  classification: "TOP SECRET" | "SECRET" | "CONFIDENTIAL";
  type: string;
  client: string;
  status: "COMPLETED" | "ACTIVE" | "ARCHIVED";
  description: string;
  tech: string[];
}

const projects: Project[] = [
  {
    id: "PRJ-001",
    codename: "OPERATION SHADOWBOT",
    classification: "TOP SECRET",
    type: "Discord Bot",
    client: "[REDACTED] Gaming Community",
    status: "COMPLETED",
    description: "Advanced moderation bot with AI-powered content filtering, custom economy system, and role management for 50,000+ member server.",
    tech: ["Discord.js", "MongoDB", "OpenAI API", "Redis"],
  },
  {
    id: "PRJ-002",
    codename: "PROJECT NEXUS",
    classification: "SECRET",
    type: "Web Application",
    client: "Tech Startup [CLASSIFIED]",
    status: "COMPLETED",
    description: "Full-stack SaaS platform with real-time collaboration features, subscription management, and advanced analytics dashboard.",
    tech: ["Next.js", "PostgreSQL", "Stripe", "WebSockets"],
  },
  {
    id: "PRJ-003",
    codename: "CIPHER NETWORK",
    classification: "TOP SECRET",
    type: "Custom Solution",
    client: "[DATA EXPUNGED]",
    status: "ACTIVE",
    description: "Automated trading signal distribution system with encrypted channels and real-time market data integration.",
    tech: ["Python", "Discord API", "TradingView", "AWS Lambda"],
  },
  {
    id: "PRJ-004",
    codename: "ECHO CHAMBER",
    classification: "CONFIDENTIAL",
    type: "Discord Bot",
    client: "Music Community Network",
    status: "COMPLETED",
    description: "High-fidelity music bot with multi-server support, playlist management, and Spotify/YouTube integration.",
    tech: ["Discord.js", "Lavalink", "Spotify API", "Docker"],
  },
  {
    id: "PRJ-005",
    codename: "VANGUARD PORTAL",
    classification: "SECRET",
    type: "Web Application",
    client: "E-Sports Organization",
    status: "COMPLETED",
    description: "Tournament management platform with bracket generation, live scoring, and Discord integration for announcements.",
    tech: ["React", "Node.js", "Socket.io", "Discord Webhooks"],
  },
  {
    id: "PRJ-006",
    codename: "PHANTOM CORE",
    classification: "TOP SECRET",
    type: "Custom Solution",
    client: "[LEVEL 5 CLEARANCE REQUIRED]",
    status: "ARCHIVED",
    description: "Internal server infrastructure with automated deployment pipelines, monitoring dashboards, and incident response systems.",
    tech: ["Kubernetes", "Grafana", "Prometheus", "Terraform"],
  },
];

export function ClassifiedProjects() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("ALL");

  const filteredProjects =
    filter === "ALL"
      ? projects
      : projects.filter((p) => p.type === filter);

  const types = ["ALL", "Discord Bot", "Web Application", "Custom Solution"];

  return (
    <div className="min-h-screen py-20 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-10">
          <p className="text-primary text-sm mb-2">
            phantom@classified:~$ cat /var/projects/*.log
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground glitch-hover inline-block cursor-blink">
            CLASSIFIED FILES
          </h2>
          <p className="text-muted-foreground mt-2">
            <span className="text-destructive">[WARNING]</span> Hover to decrypt sensitive information
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 text-sm border transition-all ${
                filter === type
                  ? "border-primary text-primary bg-primary/10"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
              }`}
            >
              {type === "ALL" ? "// ALL FILES" : `// ${type.toUpperCase()}`}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="border border-border bg-card hover:border-primary/50 transition-all duration-300 group"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Card Header */}
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground text-xs">{project.id}</span>
                  <span
                    className={`text-xs px-2 py-0.5 ${
                      project.classification === "TOP SECRET"
                        ? "bg-destructive/20 text-destructive border border-destructive/50"
                        : project.classification === "SECRET"
                        ? "bg-yellow-500/20 text-yellow-500 border border-yellow-500/50"
                        : "bg-primary/20 text-primary border border-primary/50"
                    }`}
                  >
                    {project.classification}
                  </span>
                </div>
                <span
                  className={`text-xs ${
                    project.status === "ACTIVE"
                      ? "text-primary"
                      : project.status === "COMPLETED"
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  [{project.status}]
                </span>
              </div>

              {/* Card Body */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {project.codename}
                </h3>
                <p className="text-primary text-sm mb-3">{project.type}</p>

                {/* Client - Redacted */}
                <div className="mb-3">
                  <span className="text-muted-foreground text-sm">Client: </span>
                  <span
                    className={`text-sm transition-all duration-300 ${
                      hoveredId === project.id
                        ? "text-primary glow-green-text"
                        : "bg-foreground text-transparent select-none"
                    }`}
                  >
                    {project.client}
                  </span>
                </div>

                {/* Description - Redacted */}
                <div className="mb-4">
                  <p
                    className={`text-sm leading-relaxed transition-all duration-500 ${
                      hoveredId === project.id
                        ? "text-foreground"
                        : "bg-foreground/80 text-transparent select-none"
                    }`}
                    style={{
                      backgroundSize: hoveredId === project.id ? "0" : "100%",
                    }}
                  >
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className={`text-xs px-2 py-1 border transition-all duration-300 ${
                        hoveredId === project.id
                          ? "border-primary/50 text-primary"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Decrypt indicator */}
              <div className="px-4 py-2 border-t border-border text-xs text-muted-foreground">
                {hoveredId === project.id ? (
                  <span className="text-primary">
                    <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
                    DECRYPTED
                  </span>
                ) : (
                  <span>
                    <LockIcon className="inline w-3 h-3 mr-2" />
                    ENCRYPTED — HOVER TO DECRYPT
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Terminal prompt */}
        <div className="mt-10 text-muted-foreground text-sm">
          <span className="text-primary">phantom@classified:~$</span> echo &quot;More projects available upon clearance verification&quot;
          <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1" />
        </div>
      </div>
    </div>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );
}
