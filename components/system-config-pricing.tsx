"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";

export function SystemConfigPricing() {
  const [selectedTier, setSelectedTier] = useState<string>("standard");
  const { t, dir } = useLanguage();

  const pricingConfig = [
    {
      id: "basic",
      paramKey: "tier.basic.name",
      valueKey: "tier.basic.value",
      descKey: "tier.basic.desc",
      featureKeys: [
        "tier.basic.f1",
        "tier.basic.f2",
        "tier.basic.f3",
        "tier.basic.f4",
        "tier.basic.f5",
      ],
    },
    {
      id: "standard",
      paramKey: "tier.standard.name",
      valueKey: "tier.standard.value",
      descKey: "tier.standard.desc",
      featureKeys: [
        "tier.standard.f1",
        "tier.standard.f2",
        "tier.standard.f3",
        "tier.standard.f4",
        "tier.standard.f5",
        "tier.standard.f6",
      ],
      recommended: true,
    },
    {
      id: "premium",
      paramKey: "tier.premium.name",
      valueKey: "tier.premium.value",
      descKey: "tier.premium.desc",
      featureKeys: [
        "tier.premium.f1",
        "tier.premium.f2",
        "tier.premium.f3",
        "tier.premium.f4",
        "tier.premium.f5",
        "tier.premium.f6",
        "tier.premium.f7",
      ],
    },
    {
      id: "enterprise",
      paramKey: "tier.enterprise.name",
      valueKey: "tier.enterprise.value",
      descKey: "tier.enterprise.desc",
      featureKeys: [
        "tier.enterprise.f1",
        "tier.enterprise.f2",
        "tier.enterprise.f3",
        "tier.enterprise.f4",
        "tier.enterprise.f5",
        "tier.enterprise.f6",
        "tier.enterprise.f7",
      ],
    },
  ];

  const additionalConfig = [
    { paramKey: "config.hosting", valueKey: "config.hostingValue", type: "string" },
    { paramKey: "config.rush", valueKey: "config.rushValue", type: "modifier" },
    { paramKey: "config.maintenance", valueKey: "config.maintenanceValue", type: "string" },
    { paramKey: "config.source", valueKey: "config.included", type: "boolean" },
    { paramKey: "config.docs", valueKey: "config.included", type: "boolean" },
    { paramKey: "config.consultation", valueKey: "config.free", type: "boolean" },
  ];

  return (
    <div dir={dir} className="min-h-screen py-20 px-6 section-animate">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-10">
          <p className="text-primary text-sm mb-2">
            {t("pricing.prompt")}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground glitch-hover inline-block cursor-blink">
            {t("pricing.title")}
          </h2>
        </div>

        {/* Config File Display */}
        <div className="border border-border bg-card mb-10">
          {/* File Header */}
          <div className="px-4 py-2 bg-muted border-b border-border flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {t("pricing.file")}
            </span>
            <span className="text-xs text-primary">{t("pricing.modified")}</span>
          </div>

          {/* Config Content */}
          <div className="p-4 md:p-6">
            <div className="text-muted-foreground text-sm mb-6">
              {t("pricing.comment1")}
              <br />
              {t("pricing.comment2")} {new Date().toISOString().split("T")[0]}
              <br />
              {t("pricing.comment3")}
            </div>

            {/* Pricing Tiers Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {pricingConfig.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`text-start p-4 border transition-all duration-300 ${
                    selectedTier === tier.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  } ${tier.recommended ? "relative" : ""}`}
                >
                  {tier.recommended && (
                    <span className="absolute -top-3 start-4 px-2 py-0.5 bg-primary text-primary-foreground text-xs">
                      {t("pricing.recommended")}
                    </span>
                  )}
                  <div className="text-xs text-muted-foreground mb-1 font-mono">
                    {t(tier.paramKey)}
                  </div>
                  <div className="text-2xl font-bold text-primary mb-2 glow-green-text">
                    {t(tier.valueKey)}
                  </div>
                  <div className="text-sm text-foreground mb-3">
                    {t(tier.descKey)}
                  </div>
                  <div className="text-xs text-primary/70 border-t border-border/50 pt-2 mt-2">
                    {t("pricing.probot")}
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Tier Features */}
            <div className="border border-border p-4 bg-black/50">
              <div className="text-sm text-primary mb-4">
                {t("pricing.features")} {t(pricingConfig.find((t) => t.id === selectedTier)?.paramKey || "")}
              </div>
              <div className="grid md:grid-cols-2 gap-2">
                {pricingConfig
                  .find((tier) => tier.id === selectedTier)
                  ?.featureKeys.map((key, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-primary">[+]</span>
                      <span className="text-foreground">{t(key)}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Config Table */}
        <div className="border border-border bg-card">
          <div className="px-4 py-2 bg-muted border-b border-border">
            <span className="text-sm text-muted-foreground">
              {t("pricing.additional")}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-start px-4 py-3 text-primary">{t("pricing.param")}</th>
                  <th className="text-start px-4 py-3 text-primary">{t("pricing.value")}</th>
                  <th className="text-start px-4 py-3 text-primary hidden md:table-cell">
                    {t("pricing.type")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {additionalConfig.map((config) => (
                  <tr
                    key={config.paramKey}
                    className="border-b border-border/50 hover:bg-primary/5 transition-colors"
                  >
                    <td className="px-4 py-3 text-foreground font-mono">
                      {t(config.paramKey)}
                    </td>
                    <td className="px-4 py-3 text-primary">
                      {t(config.valueKey)}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                      {config.type}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Terminal prompt */}
        <div className="mt-8 text-muted-foreground text-sm">
          <span className="text-primary">doblex@config:~$</span> echo
          &quot;{t("pricing.custom")}&quot;
          <span className="inline-block w-2 h-4 bg-primary animate-pulse ms-1" />
        </div>
      </div>
    </div>
  );
}
