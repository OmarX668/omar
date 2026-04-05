"use client";

import { useState } from "react";

interface PricingTier {
  param: string;
  value: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

const pricingConfig: PricingTier[] = [
  {
    param: "TIER_BASIC",
    value: "$50-150",
    description: "Entry-level solutions for small projects",
    features: [
      "Simple Discord bots (10-15 commands)",
      "Basic landing pages",
      "Single-feature scripts",
      "3-day turnaround",
      "7 days support",
    ],
  },
  {
    param: "TIER_STANDARD",
    value: "$150-500",
    description: "Professional solutions for growing communities",
    features: [
      "Advanced Discord bots (25+ commands)",
      "Multi-page websites",
      "Database integration",
      "7-14 day turnaround",
      "30 days support",
      "1 revision included",
    ],
    recommended: true,
  },
  {
    param: "TIER_PREMIUM",
    value: "$500-1500",
    description: "Enterprise-grade solutions for large operations",
    features: [
      "Full-stack web applications",
      "Complex bot ecosystems",
      "Custom API development",
      "Scalable architecture",
      "14-30 day turnaround",
      "90 days support",
      "3 revisions included",
    ],
  },
  {
    param: "TIER_ENTERPRISE",
    value: "CUSTOM",
    description: "Unlimited scope for maximum impact",
    features: [
      "Unlimited complexity",
      "Dedicated developer",
      "Priority queue",
      "Flexible timeline",
      "Extended support",
      "Unlimited revisions",
      "NDA available",
    ],
  },
];

const additionalConfig = [
  { param: "HOSTING_MONTHLY", value: "$5-25", type: "string" },
  { param: "RUSH_DELIVERY", value: "+50%", type: "modifier" },
  { param: "MAINTENANCE_PLAN", value: "$25-100/mo", type: "string" },
  { param: "SOURCE_CODE", value: "INCLUDED", type: "boolean" },
  { param: "DOCUMENTATION", value: "INCLUDED", type: "boolean" },
  { param: "CONSULTATION", value: "FREE", type: "boolean" },
];

export function SystemConfigPricing() {
  const [selectedTier, setSelectedTier] = useState<string>("TIER_STANDARD");

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-10">
          <p className="text-primary text-sm mb-2">
            phantom@config:~$ nano /etc/phantom/pricing.conf
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground glitch-hover inline-block cursor-blink">
            SYSTEM CONFIGURATION
          </h2>
        </div>

        {/* Config File Display */}
        <div className="border border-border bg-card mb-10">
          {/* File Header */}
          <div className="px-4 py-2 bg-muted border-b border-border flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              /etc/phantom/pricing.conf
            </span>
            <span className="text-xs text-primary">[MODIFIED]</span>
          </div>

          {/* Config Content */}
          <div className="p-4 md:p-6">
            <div className="text-muted-foreground text-sm mb-6">
              # PHANTOM.DEV PRICING CONFIGURATION
              <br />
              # Last updated: {new Date().toISOString().split("T")[0]}
              <br />
              # All prices in USD
            </div>

            {/* Pricing Tiers Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {pricingConfig.map((tier) => (
                <button
                  key={tier.param}
                  onClick={() => setSelectedTier(tier.param)}
                  className={`text-left p-4 border transition-all duration-300 ${
                    selectedTier === tier.param
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  } ${tier.recommended ? "relative" : ""}`}
                >
                  {tier.recommended && (
                    <span className="absolute -top-3 left-4 px-2 py-0.5 bg-primary text-primary-foreground text-xs">
                      RECOMMENDED
                    </span>
                  )}
                  <div className="text-xs text-muted-foreground mb-1">
                    {tier.param}=
                  </div>
                  <div className="text-2xl font-bold text-primary mb-2">
                    {tier.value}
                  </div>
                  <div className="text-sm text-foreground">
                    {tier.description}
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Tier Features */}
            <div className="border border-border p-4 bg-black/50">
              <div className="text-sm text-primary mb-4">
                # {selectedTier} FEATURES:
              </div>
              <div className="grid md:grid-cols-2 gap-2">
                {pricingConfig
                  .find((t) => t.param === selectedTier)
                  ?.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-primary">✓</span>
                      <span className="text-foreground">{feature}</span>
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
              # ADDITIONAL PARAMETERS
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-primary">PARAMETER</th>
                  <th className="text-left px-4 py-3 text-primary">VALUE</th>
                  <th className="text-left px-4 py-3 text-primary hidden md:table-cell">
                    TYPE
                  </th>
                </tr>
              </thead>
              <tbody>
                {additionalConfig.map((config) => (
                  <tr
                    key={config.param}
                    className="border-b border-border/50 hover:bg-primary/5 transition-colors"
                  >
                    <td className="px-4 py-3 text-foreground font-mono">
                      {config.param}
                    </td>
                    <td className="px-4 py-3 text-primary">{config.value}</td>
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
          <span className="text-primary">phantom@config:~$</span> echo
          &quot;Custom quotes available — contact for enterprise pricing&quot;
          <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1" />
        </div>
      </div>
    </div>
  );
}
