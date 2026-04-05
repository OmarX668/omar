"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";

export function ServicesDirectory() {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const { t, dir } = useLanguage();

  const services = [
    {
      id: "bots",
      permissions: "drwxr-xr-x",
      links: "5",
      owner: "doblex",
      size: "4.0K",
      date: "Apr 05",
      nameKey: "service.bots.name",
      descKey: "service.bots.desc",
      featureKeys: ["service.bots.f1", "service.bots.f2", "service.bots.f3", "service.bots.f4"],
      isFolder: true,
    },
    {
      id: "web",
      permissions: "drwxr-xr-x",
      links: "8",
      owner: "doblex",
      size: "12K",
      date: "Apr 05",
      nameKey: "service.web.name",
      descKey: "service.web.desc",
      featureKeys: ["service.web.f1", "service.web.f2", "service.web.f3", "service.web.f4"],
      isFolder: true,
    },
    {
      id: "custom",
      permissions: "drwxr-xr-x",
      links: "3",
      owner: "doblex",
      size: "8.0K",
      date: "Apr 04",
      nameKey: "service.custom.name",
      descKey: "service.custom.desc",
      featureKeys: ["service.custom.f1", "service.custom.f2", "service.custom.f3", "service.custom.f4"],
      isFolder: true,
    },
    {
      id: "setup",
      permissions: "-rwxr-xr-x",
      links: "1",
      owner: "doblex",
      size: "2.1K",
      date: "Apr 03",
      nameKey: "service.setup.name",
      descKey: "service.setup.desc",
      featureKeys: ["service.setup.f1", "service.setup.f2", "service.setup.f3", "service.setup.f4"],
      isFolder: false,
    },
    {
      id: "maint",
      permissions: "-rw-r--r--",
      links: "1",
      owner: "doblex",
      size: "1.5K",
      date: "Apr 02",
      nameKey: "service.maint.name",
      descKey: "service.maint.desc",
      featureKeys: ["service.maint.f1", "service.maint.f2", "service.maint.f3", "service.maint.f4"],
      isFolder: false,
    },
  ];

  return (
    <div dir={dir} className="min-h-screen py-20 px-6 section-animate">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-10">
          <p className="text-primary text-sm mb-2">
            {t("services.prompt")}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground glitch-hover inline-block cursor-blink">
            {t("services.title")}
          </h2>
        </div>

        {/* Directory Header */}
        <div className="border border-border bg-muted">
          <div className="px-4 py-2 text-xs text-muted-foreground border-b border-border hidden md:block">
            {t("services.total")}
          </div>
          <div className="px-4 py-2 grid grid-cols-12 gap-2 text-xs text-primary border-b border-border font-bold hidden md:grid">
            <span className="col-span-2">{t("services.permissions")}</span>
            <span className="col-span-1">{t("services.links")}</span>
            <span className="col-span-2">{t("services.owner")}</span>
            <span className="col-span-1">{t("services.size")}</span>
            <span className="col-span-2">{t("services.modified")}</span>
            <span className="col-span-4">{t("services.name")}</span>
          </div>

          {/* Directory Entries */}
          {services.map((service) => (
            <div
              key={service.id}
              className="border-b border-border last:border-b-0"
            >
              {/* Main Row */}
              <button
                onClick={() =>
                  setExpandedService(
                    expandedService === service.id ? null : service.id
                  )
                }
                className="w-full px-4 py-3 grid grid-cols-1 md:grid-cols-12 gap-2 text-sm hover:bg-primary/5 transition-colors text-start"
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
                  {service.isFolder ? <FolderIcon /> : <FileIcon />}
                  {t(service.nameKey)}
                  <span className={`${dir === "rtl" ? "me-auto" : "ms-auto"} text-muted-foreground text-xs`}>
                    {expandedService === service.id ? "[-]" : "[+]"}
                  </span>
                </span>
              </button>

              {/* Expanded Details */}
              {expandedService === service.id && (
                <div className={`px-4 pb-4 bg-black/50 border-t border-border/50 ${dir === "rtl" ? "md:pr-20" : "md:pl-20"}`}>
                  <div className="py-4">
                    <p className="text-foreground mb-4">{t(service.descKey)}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.featureKeys.map((key) => (
                        <span
                          key={key}
                          className="px-2 py-1 text-xs border border-primary/50 text-primary bg-primary/5"
                        >
                          {t(key)}
                        </span>
                      ))}
                    </div>
                    <a
                      href="#pricing"
                      className="inline-flex items-center mt-4 text-sm text-primary hover:underline"
                    >
                      <span className="me-2">{dir === "rtl" ? "<" : ">"}</span>
                      {t("services.viewPricing")}
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Terminal prompt */}
        <div className="mt-6 text-muted-foreground text-sm">
          <span className="text-primary">doblex@services:~$</span> cat readme.txt
          <p className="mt-2 text-foreground">
            {t("services.readme")}
          </p>
          <span className="inline-block w-2 h-4 bg-primary animate-pulse ms-1" />
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

