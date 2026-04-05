"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";

interface Project {
  id: string;
  codenameKey: string;
  classification: "TOP SECRET" | "SECRET" | "CONFIDENTIAL";
  typeKey: string;
  clientKey: string;
  status: "COMPLETED" | "ACTIVE" | "ARCHIVED";
  descKey: string;
  tech: string[];
}

export function ClassifiedProjects() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("ALL");
  const { t, dir, language } = useLanguage();

  const projects: Project[] = [
    {
      id: "PRJ-001",
      codenameKey: "project.1.codename",
      classification: "TOP SECRET",
      typeKey: "projects.bots",
      clientKey: "project.1.client",
      status: "COMPLETED",
      descKey: "project.1.desc",
      tech: ["Discord.js", "MongoDB", "OpenAI API", "Redis"],
    },
    {
      id: "PRJ-002",
      codenameKey: "project.2.codename",
      classification: "SECRET",
      typeKey: "projects.web",
      clientKey: "project.2.client",
      status: "COMPLETED",
      descKey: "project.2.desc",
      tech: ["Next.js", "PostgreSQL", "Stripe", "WebSockets"],
    },
    {
      id: "PRJ-003",
      codenameKey: "project.3.codename",
      classification: "TOP SECRET",
      typeKey: "projects.custom",
      clientKey: "project.3.client",
      status: "ACTIVE",
      descKey: "project.3.desc",
      tech: ["Python", "Discord API", "TradingView", "AWS Lambda"],
    },
    {
      id: "PRJ-004",
      codenameKey: "project.4.codename",
      classification: "CONFIDENTIAL",
      typeKey: "projects.bots",
      clientKey: "project.4.client",
      status: "COMPLETED",
      descKey: "project.4.desc",
      tech: ["Discord.js", "Lavalink", "Spotify API", "Docker"],
    },
    {
      id: "PRJ-005",
      codenameKey: "project.5.codename",
      classification: "SECRET",
      typeKey: "projects.web",
      clientKey: "project.5.client",
      status: "COMPLETED",
      descKey: "project.5.desc",
      tech: ["React", "Node.js", "Socket.io", "Discord Webhooks"],
    },
    {
      id: "PRJ-006",
      codenameKey: "project.6.codename",
      classification: "TOP SECRET",
      typeKey: "projects.custom",
      clientKey: "project.6.client",
      status: "ARCHIVED",
      descKey: "project.6.desc",
      tech: ["Kubernetes", "Grafana", "Prometheus", "Terraform"],
    },
  ];

  const types = [
    { key: "ALL", label: t("projects.all") },
    { key: "projects.bots", label: t("projects.bots") },
    { key: "projects.web", label: t("projects.web") },
    { key: "projects.custom", label: t("projects.custom") },
  ];

  const filteredProjects =
    filter === "ALL"
      ? projects
      : projects.filter((p) => p.typeKey === filter);

  const getStatusText = (status: string) => {
    switch (status) {
      case "COMPLETED": return t("projects.completed");
      case "ACTIVE": return t("projects.active");
      case "ARCHIVED": return t("projects.archived");
      default: return status;
    }
  };

  const getClassificationText = (classification: string) => {
    if (language === "ar") {
      switch (classification) {
        case "TOP SECRET": return "سري للغاية";
        case "SECRET": return "سري";
        case "CONFIDENTIAL": return "سري نسبياً";
        default: return classification;
      }
    }
    return classification;
  };

  return (
    <div dir={dir} className="min-h-screen py-20 px-6 bg-muted/30 section-animate">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-10">
          <p className="text-primary text-sm mb-2">
            {t("projects.prompt")}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground glitch-hover inline-block cursor-blink">
            {t("projects.title")}
          </h2>
          <p className="text-muted-foreground mt-2">
            <span className="text-destructive">[{language === "ar" ? "تحذير" : "WARNING"}]</span> {t("projects.warning")}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {types.map((type) => (
            <button
              key={type.key}
              onClick={() => setFilter(type.key)}
              className={`px-4 py-2 text-sm border transition-all ${
                filter === type.key
                  ? "border-primary text-primary bg-primary/10"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
              }`}
            >
              {type.label}
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
                    {getClassificationText(project.classification)}
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
                  [{getStatusText(project.status)}]
                </span>
              </div>

              {/* Card Body */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {t(project.codenameKey)}
                </h3>
                <p className="text-primary text-sm mb-3">{t(project.typeKey).replace("// ", "")}</p>

                {/* Client - Redacted */}
                <div className="mb-3">
                  <span className="text-muted-foreground text-sm">{t("projects.client")}</span>
                  <span
                    className={`text-sm transition-all duration-300 ${
                      hoveredId === project.id
                        ? "text-primary glow-green-text"
                        : "bg-foreground text-transparent select-none"
                    }`}
                  >
                    {t(project.clientKey)}
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
                    {t(project.descKey)}
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
                    <span className="inline-block w-2 h-2 bg-primary rounded-full me-2 animate-pulse" />
                    {t("projects.decrypted")}
                  </span>
                ) : (
                  <span>
                    <LockIcon className="inline w-3 h-3 me-2" />
                    {t("projects.encrypted")}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Terminal prompt */}
        <div className="mt-10 text-muted-foreground text-sm">
          <span className="text-primary">phantom@classified:~$</span> echo &quot;{t("projects.more")}&quot;
          <span className="inline-block w-2 h-4 bg-primary animate-pulse ms-1" />
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
