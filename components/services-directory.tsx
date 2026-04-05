"use client";

import { useState } from "react";

interface Service {
  permissions: string;
  links: string;
  owner: string;
  size: string;
  date: string;
  name: string;
  description: string;
  features: string[];
}

const services: Service[] = [
  {
    permissions: "drwxr-xr-x",
    links: "5",
    owner: "phantom",
    size: "4.0K",
    date: "Apr 05",
    name: "discord-bots/",
    description: "Custom Discord bots with advanced functionality. Moderation, music, games, AI integration, and more.",
    features: ["Slash commands", "Custom embeds", "Database integration", "24/7 hosting available"],
  },
  {
    permissions: "drwxr-xr-x",
    links: "8",
    owner: "phantom",
    size: "12K",
    date: "Apr 05",
    name: "web-development/",
    description: "Full-stack web applications. Modern frameworks, responsive design, optimized performance.",
    features: ["React/Next.js", "Node.js backends", "Database design", "API integration"],
  },
  {
    permissions: "drwxr-xr-x",
    links: "3",
    owner: "phantom",
    size: "8.0K",
    date: "Apr 04",
    name: "custom-solutions/",
    description: "Specialized development for unique requirements. If you can dream it, we can build it.",
    features: ["API development", "Automation scripts", "Data processing", "Custom integrations"],
  },
  {
    permissions: "-rwxr-xr-x",
    links: "1",
    owner: "phantom",
    size: "2.1K",
    date: "Apr 03",
    name: "server-setup.sh",
    description: "Complete Discord server setup with channels, roles, permissions, and bot configuration.",
    features: ["Role hierarchy", "Channel organization", "Permission setup", "Bot integration"],
  },
  {
    permissions: "-rw-r--r--",
    links: "1",
    owner: "phantom",
    size: "1.5K",
    date: "Apr 02",
    name: "maintenance.cfg",
    description: "Ongoing maintenance and support packages. Keep your projects running smoothly.",
    features: ["Bug fixes", "Feature updates", "Performance monitoring", "Priority support"],
  },
];

export function ServicesDirectory() {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-10">
          <p className="text-primary text-sm mb-2">
            phantom@services:~$ ls -la
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground glitch-hover inline-block cursor-blink">
            SERVICE DIRECTORY
          </h2>
        </div>

        {/* Directory Header */}
        <div className="border border-border bg-muted">
          <div className="px-4 py-2 text-xs text-muted-foreground border-b border-border hidden md:block">
            total 27.6K
          </div>
          <div className="px-4 py-2 grid grid-cols-12 gap-2 text-xs text-primary border-b border-border font-bold hidden md:grid">
            <span className="col-span-2">PERMISSIONS</span>
            <span className="col-span-1">LINKS</span>
            <span className="col-span-2">OWNER</span>
            <span className="col-span-1">SIZE</span>
            <span className="col-span-2">MODIFIED</span>
            <span className="col-span-4">NAME</span>
          </div>

          {/* Directory Entries */}
          {services.map((service) => (
            <div
              key={service.name}
              className="border-b border-border last:border-b-0"
            >
              {/* Main Row */}
              <button
                onClick={() =>
                  setExpandedService(
                    expandedService === service.name ? null : service.name
                  )
                }
                className="w-full px-4 py-3 grid grid-cols-1 md:grid-cols-12 gap-2 text-sm hover:bg-primary/5 transition-colors text-left"
              >
                <span className="col-span-2 text-muted-foreground hidden md:block">
                  {service.permissions}
                </span>
                <span className="col-span-1 text-muted-foreground hidden md:block">
                  {service.links}
                </span>
                <span className="col-span-2 text-foreground hidden md:block">
                  {service.owner}
                </span>
                <span className="col-span-1 text-muted-foreground hidden md:block">
                  {service.size}
                </span>
                <span className="col-span-2 text-muted-foreground hidden md:block">
                  {service.date}
                </span>
                <span className="col-span-4 text-primary font-bold flex items-center gap-2">
                  {service.name.endsWith("/") ? (
                    <FolderIcon />
                  ) : (
                    <FileIcon />
                  )}
                  {service.name}
                  <span className="ml-auto text-muted-foreground text-xs">
                    {expandedService === service.name ? "[-]" : "[+]"}
                  </span>
                </span>
              </button>

              {/* Expanded Details */}
              {expandedService === service.name && (
                <div className="px-4 pb-4 md:pl-20 bg-black/50 border-t border-border/50">
                  <div className="py-4">
                    <p className="text-foreground mb-4">{service.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-2 py-1 text-xs border border-primary/50 text-primary bg-primary/5"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <a
                      href="#pricing"
                      className="inline-flex items-center mt-4 text-sm text-primary hover:underline"
                    >
                      <span className="mr-2">&gt;</span>
                      View pricing config
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Terminal prompt */}
        <div className="mt-6 text-muted-foreground text-sm">
          <span className="text-primary">phantom@services:~$</span> cat readme.txt
          <p className="mt-2 text-foreground">
            All services include free consultation. Custom packages available upon request.
          </p>
          <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1" />
        </div>
      </div>
    </div>
  );
}

function FolderIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}
