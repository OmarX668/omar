"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type Language = "ar" | "en";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  dir: "rtl" | "ltr";
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Boot sequence
    "boot.kernel": "نظام DOBLEX.DEV الإصدار 4.2.0",
    "boot.init": "جارٍ تهيئة الاتصال الآمن...",
    "boot.crypto": "تحميل وحدات التشفير.......... [تم]",
    "boot.tunnel": "إنشاء نفق مشفر.......... [تم]",
    "boot.firewall": "تجاوز بروتوكولات جدار الحماية.......... [تم]",
    "boot.clearance": "التحقق من مستوى التصريح.......... [تم]",
    "boot.decrypt": "فك تشفير قاعدة البيانات السرية.......... [تم]",
    "boot.access": "> تم منح الوصول",
    "boot.welcome": "> مرحباً، أيها المشغّل",

    // Nav
    "nav.root": "/الرئيسية",
    "nav.services": "/الخدمات",
    "nav.classified": "/السري",
    "nav.config": "/التسعير",
    "nav.connect": "/التواصل",
    "nav.secure": "// طرفية آمنة الإصدار 4.2",
    "nav.online": "متصل",

    // Hero
    "hero.init": "جارٍ التهيئة... تم منح الوصول. مرحباً بك في DOBLEX.DEV",
    "hero.prompt": "root@doblex:~# ",
    "hero.subtitle1": "خدمات برمجة متقدمة لسيرفرات ديسكورد",
    "hero.subtitle2": "بوتات مخصصة • تطوير مواقع • حلول متخصصة",
    "hero.projects": "مشروع",
    "hero.clients": "عميل",
    "hero.uptime": "وقت التشغيل",
    "hero.response": "الاستجابة",
    "hero.explore": "استكشف الخدمات",
    "hero.contact": "ابدأ التواصل",
    "hero.scroll": "اسحب للأسفل",

    // Services
    "services.prompt": "doblex@services:~$ ls -la",
    "services.title": "دليل الخدمات",
    "services.total": "المجموع 27.6K",
    "services.permissions": "الصلاحيات",
    "services.links": "الروابط",
    "services.owner": "المالك",
    "services.size": "الحجم",
    "services.modified": "التعديل",
    "services.name": "الاسم",
    "services.viewPricing": "عرض التسعير",
    "services.readme": "جميع الخدمات تشمل استشارة مجانية. باقات مخصصة متاحة عند الطلب.",

    // Service items
    "service.bots.name": "بوتات-ديسكورد/",
    "service.bots.desc": "بوتات ديسكورد مخصصة بوظائف متقدمة. إدارة، موسيقى، ألعاب، تكامل ذكاء اصطناعي، والمزيد.",
    "service.bots.f1": "أوامر سلاش",
    "service.bots.f2": "رسائل مضمنة مخصصة",
    "service.bots.f3": "تكامل قاعدة بيانات",
    "service.bots.f4": "استضافة 24/7 متاحة",

    "service.web.name": "تطوير-المواقع/",
    "service.web.desc": "تطبيقات ويب متكاملة. أطر عمل حديثة، تصميم متجاوب، أداء محسّن.",
    "service.web.f1": "React/Next.js",
    "service.web.f2": "واجهات Node.js خلفية",
    "service.web.f3": "تصميم قواعد البيانات",
    "service.web.f4": "تكامل API",

    "service.custom.name": "حلول-مخصصة/",
    "service.custom.desc": "تطوير متخصص لمتطلبات فريدة. إذا كنت تحلم به، نستطيع بناءه.",
    "service.custom.f1": "تطوير API",
    "service.custom.f2": "سكربتات الأتمتة",
    "service.custom.f3": "معالجة البيانات",
    "service.custom.f4": "تكاملات مخصصة",

    "service.setup.name": "server-setup.sh",
    "service.setup.desc": "إعداد كامل لسيرفر ديسكورد مع قنوات، رتب، صلاحيات، وتكوين البوت.",
    "service.setup.f1": "تسلسل الرتب",
    "service.setup.f2": "تنظيم القنوات",
    "service.setup.f3": "إعداد الصلاحيات",
    "service.setup.f4": "تكامل البوت",

    "service.maint.name": "maintenance.cfg",
    "service.maint.desc": "باقات صيانة ودعم مستمرة. حافظ على مشاريعك تعمل بسلاسة.",
    "service.maint.f1": "إصلاح الأخطاء",
    "service.maint.f2": "تحديثات الميزات",
    "service.maint.f3": "مراقبة الأداء",
    "service.maint.f4": "دعم ذو أولوية",

    // Projects
    "projects.prompt": "doblex@classified:~$ cat /var/projects/*.log",
    "projects.title": "ملفات سرية",
    "projects.warning": "مرر الماوس لفك تشفير المعلومات الحساسة",
    "projects.all": "// جميع الملفات",
    "projects.bots": "// بوت ديسكورد",
    "projects.web": "// تطبيق ويب",
    "projects.custom": "// حل مخصص",
    "projects.client": "العميل: ",
    "projects.encrypted": "مشفر — مرر للفك",
    "projects.decrypted": "تم الفك",
    "projects.more": "المزيد من المشاريع متاحة عند التحقق من التصريح",
    "projects.completed": "مكتمل",
    "projects.active": "نشط",
    "projects.archived": "مؤرشف",

    // Project items
    "project.1.codename": "عملية الروبوت الخفي",
    "project.1.client": "مجتمع ألعاب [محجوب]",
    "project.1.desc": "بوت إدارة متقدم مع تصفية محتوى بالذكاء الاصطناعي، نظام اقتصاد مخصص، وإدارة رتب لسيرفر +50,000 عضو.",

    "project.2.codename": "مشروع نيكسوس",
    "project.2.client": "شركة تقنية ناشئة [سري]",
    "project.2.desc": "منصة SaaS متكاملة مع ميزات تعاون فوري، إدارة اشتراكات، ولوحة تحليلات متقدمة.",

    "project.3.codename": "شبكة الشيفرة",
    "project.3.client": "[بيانات محذوفة]",
    "project.3.desc": "نظام توزيع إشارات تداول آلي مع قنوات مشفرة وتكامل بيانات السوق الفوري.",

    "project.4.codename": "غرفة الصدى",
    "project.4.client": "شبكة مجتمع الموسيقى",
    "project.4.desc": "بوت موسيقى عالي الجودة مع دعم متعدد السيرفرات، إدارة قوائم التشغيل، وتكامل Spotify/YouTube.",

    "project.5.codename": "بوابة الطليعة",
    "project.5.client": "منظمة رياضات إلكترونية",
    "project.5.desc": "منصة إدارة بطولات مع إنشاء قرعات، نتائج مباشرة، وتكامل ديسكورد للإعلانات.",

    "project.6.codename": "نواة DOBLEX",
    "project.6.client": "[مطلوب تصريح المستوى 5]",
    "project.6.desc": "بنية تحتية داخلية للسيرفر مع أنابيب نشر آلية، لوحات مراقبة، وأنظمة استجابة للحوادث.",

    // Pricing
    "pricing.prompt": "doblex@config:~$ nano /etc/doblex/pricing.conf",
    "pricing.title": "تكوين النظام",
    "pricing.file": "/etc/doblex/pricing.conf",
    "pricing.modified": "[معدّل]",
    "pricing.comment1": "# تكوين تسعير DOBLEX.DEV",
    "pricing.comment2": "# آخر تحديث:",
    "pricing.comment3": "# جميع الأسعار بكريدت ديسكورد",
    "pricing.features": "# ميزات",
    "pricing.additional": "# معاملات إضافية",
    "pricing.param": "المعامل",
    "pricing.value": "القيمة",
    "pricing.type": "النوع",
    "pricing.recommended": "موصى به",
    "pricing.custom": "عرض مخصص متاح — تواصل للتسعير المؤسسي",
    "pricing.probot": "[الدفع عبر كريدت PROBOT]",

    // Pricing tiers  
    "tier.basic.name": "TIER_01.cfg",
    "tier.basic.value": "500 كريدت",
    "tier.basic.desc": "حلول للمشاريع الصغيرة",
    "tier.basic.f1": "بوتات ديسكورد بسيطة (10-15 أمر)",
    "tier.basic.f2": "صفحات هبوط أساسية",
    "tier.basic.f3": "سكربتات ميزة واحدة",
    "tier.basic.f4": "تسليم 3 أيام",
    "tier.basic.f5": "دعم 7 أيام",

    "tier.standard.name": "TIER_02.cfg",
    "tier.standard.value": "1200 كريدت",
    "tier.standard.desc": "حلول احترافية للمجتمعات النامية",
    "tier.standard.f1": "بوتات ديسكورد متقدمة (+25 أمر)",
    "tier.standard.f2": "مواقع متعددة الصفحات",
    "tier.standard.f3": "تكامل قاعدة بيانات",
    "tier.standard.f4": "تسليم 7-14 يوم",
    "tier.standard.f5": "دعم 30 يوم",
    "tier.standard.f6": "مراجعة واحدة مشمولة",

    "tier.premium.name": "TIER_03.cfg",
    "tier.premium.value": "3000 كريدت",
    "tier.premium.desc": "حلول مؤسسية للعمليات الكبيرة",
    "tier.premium.f1": "تطبيقات ويب متكاملة",
    "tier.premium.f2": "أنظمة بوتات معقدة",
    "tier.premium.f3": "تطوير API مخصص",
    "tier.premium.f4": "بنية قابلة للتوسع",
    "tier.premium.f5": "تسليم 14-30 يوم",
    "tier.premium.f6": "دعم 90 يوم",
    "tier.premium.f7": "3 مراجعات مشمولة",

    "tier.enterprise.name": "TIER_CUSTOM.cfg",
    "tier.enterprise.value": "مخصص",
    "tier.enterprise.desc": "نطاق غير محدود لأقصى تأثير",
    "tier.enterprise.f1": "تعقيد غير محدود",
    "tier.enterprise.f2": "مطور مخصص",
    "tier.enterprise.f3": "قائمة انتظار ذات أولوية",
    "tier.enterprise.f4": "جدول زمني مرن",
    "tier.enterprise.f5": "دعم ممتد",
    "tier.enterprise.f6": "مراجعات غير محدودة",
    "tier.enterprise.f7": "اتفاقية سرية متاحة",

    // Additional config
    "config.hosting": "الاستضافة_الشهرية",
    "config.hostingValue": "50 كريدت/شهر",
    "config.rush": "التسليم_العاجل",
    "config.rushValue": "+50%",
    "config.maintenance": "خطة_الصيانة",
    "config.maintenanceValue": "100 كريدت/شهر",
    "config.source": "الكود_المصدري",
    "config.docs": "التوثيق",
    "config.consultation": "الاستشارة",
    "config.included": "مشمول",
    "config.free": "مجاني",

    // Contact
    "contact.prompt": "doblex@connect:~$ ./initiate_contact.sh",
    "contact.title": "إنشاء الاتصال",
    "contact.header1": "╔══════════════════════════════════════════════════════╗",
    "contact.header2": "║ قناة الاتصال الآمنة لـ DOBLEX.DEV                   ║",
    "contact.header3": "║ اكتب 'help' للأوامر المتاحة                          ║",
    "contact.header4": "╚══════════════════════════════════════════════════════╝",
    "contact.placeholder": "اكتب أمراً...",
    "contact.discord": "التواصل عبر ديسكورد →",
    "contact.discordSub": "أسرع وقت استجابة",
    "contact.email": "بريد مشفر",
    "contact.emailSub": "للاستفسارات الرسمية",
    "contact.responseTime": "وقت الاستجابة المتوقع",
    "contact.hours": "< ساعتين",
    "contact.currentlyOnline": "متصل حالياً",
    "contact.awaiting": "في انتظار إرسالك...",

    // Commands
    "cmd.help": "الأوامر المتاحة:",
    "cmd.unknown": "أمر غير معروف. اكتب 'help' للأوامر المتاحة.",
    
    // Footer
    "footer.system": "[النظام]",
    "footer.rights": "DOBLEX.DEV © 2026 — جميع الحقوق محفوظة",
    "footer.session": "الجلسة:",

    // Language toggle
    "lang.toggle": "[ ع / EN ]",
  },
  en: {
    // Boot sequence
    "boot.kernel": "DOBLEX.DEV KERNEL v4.2.0",
    "boot.init": "Initializing secure connection...",
    "boot.crypto": "Loading cryptographic modules.......... [OK]",
    "boot.tunnel": "Establishing encrypted tunnel.......... [OK]",
    "boot.firewall": "Bypassing firewall protocols.......... [OK]",
    "boot.clearance": "Verifying clearance level.......... [OK]",
    "boot.decrypt": "Decrypting classified database.......... [OK]",
    "boot.access": "> ACCESS GRANTED",
    "boot.welcome": "> WELCOME, OPERATOR",

    // Nav
    "nav.root": "/root",
    "nav.services": "/services",
    "nav.classified": "/classified",
    "nav.config": "/config",
    "nav.connect": "/connect",
    "nav.secure": "// SECURE TERMINAL v4.2",
    "nav.online": "ONLINE",

    // Hero
    "hero.init": "INITIALIZING... ACCESS GRANTED. WELCOME TO DOBLEX.DEV",
    "hero.prompt": "root@doblex:~# ",
    "hero.subtitle1": "Elite programming services for Discord servers",
    "hero.subtitle2": "Custom bots • Web development • Specialized solutions",
    "hero.projects": "PROJECTS",
    "hero.clients": "CLIENTS",
    "hero.uptime": "UPTIME",
    "hero.response": "RESPONSE",
    "hero.explore": "EXPLORE SERVICES",
    "hero.contact": "INITIATE CONTACT",
    "hero.scroll": "SCROLL DOWN",

    // Services
    "services.prompt": "doblex@services:~$ ls -la",
    "services.title": "SERVICE DIRECTORY",
    "services.total": "total 27.6K",
    "services.permissions": "PERMISSIONS",
    "services.links": "LINKS",
    "services.owner": "OWNER",
    "services.size": "SIZE",
    "services.modified": "MODIFIED",
    "services.name": "NAME",
    "services.viewPricing": "View pricing config",
    "services.readme": "All services include free consultation. Custom packages available upon request.",

    // Service items
    "service.bots.name": "discord-bots/",
    "service.bots.desc": "Custom Discord bots with advanced functionality. Moderation, music, games, AI integration, and more.",
    "service.bots.f1": "Slash commands",
    "service.bots.f2": "Custom embeds",
    "service.bots.f3": "Database integration",
    "service.bots.f4": "24/7 hosting available",

    "service.web.name": "web-development/",
    "service.web.desc": "Full-stack web applications. Modern frameworks, responsive design, optimized performance.",
    "service.web.f1": "React/Next.js",
    "service.web.f2": "Node.js backends",
    "service.web.f3": "Database design",
    "service.web.f4": "API integration",

    "service.custom.name": "custom-solutions/",
    "service.custom.desc": "Specialized development for unique requirements. If you can dream it, we can build it.",
    "service.custom.f1": "API development",
    "service.custom.f2": "Automation scripts",
    "service.custom.f3": "Data processing",
    "service.custom.f4": "Custom integrations",

    "service.setup.name": "server-setup.sh",
    "service.setup.desc": "Complete Discord server setup with channels, roles, permissions, and bot configuration.",
    "service.setup.f1": "Role hierarchy",
    "service.setup.f2": "Channel organization",
    "service.setup.f3": "Permission setup",
    "service.setup.f4": "Bot integration",

    "service.maint.name": "maintenance.cfg",
    "service.maint.desc": "Ongoing maintenance and support packages. Keep your projects running smoothly.",
    "service.maint.f1": "Bug fixes",
    "service.maint.f2": "Feature updates",
    "service.maint.f3": "Performance monitoring",
    "service.maint.f4": "Priority support",

    // Projects
    "projects.prompt": "doblex@classified:~$ cat /var/projects/*.log",
    "projects.title": "CLASSIFIED FILES",
    "projects.warning": "Hover to decrypt sensitive information",
    "projects.all": "// ALL FILES",
    "projects.bots": "// DISCORD BOT",
    "projects.web": "// WEB APPLICATION",
    "projects.custom": "// CUSTOM SOLUTION",
    "projects.client": "Client: ",
    "projects.encrypted": "ENCRYPTED — HOVER TO DECRYPT",
    "projects.decrypted": "DECRYPTED",
    "projects.more": "More projects available upon clearance verification",
    "projects.completed": "COMPLETED",
    "projects.active": "ACTIVE",
    "projects.archived": "ARCHIVED",

    // Project items
    "project.1.codename": "OPERATION SHADOWBOT",
    "project.1.client": "[REDACTED] Gaming Community",
    "project.1.desc": "Advanced moderation bot with AI-powered content filtering, custom economy system, and role management for 50,000+ member server.",

    "project.2.codename": "PROJECT NEXUS",
    "project.2.client": "Tech Startup [CLASSIFIED]",
    "project.2.desc": "Full-stack SaaS platform with real-time collaboration features, subscription management, and advanced analytics dashboard.",

    "project.3.codename": "CIPHER NETWORK",
    "project.3.client": "[DATA EXPUNGED]",
    "project.3.desc": "Automated trading signal distribution system with encrypted channels and real-time market data integration.",

    "project.4.codename": "ECHO CHAMBER",
    "project.4.client": "Music Community Network",
    "project.4.desc": "High-fidelity music bot with multi-server support, playlist management, and Spotify/YouTube integration.",

    "project.5.codename": "VANGUARD PORTAL",
    "project.5.client": "E-Sports Organization",
    "project.5.desc": "Tournament management platform with bracket generation, live scoring, and Discord integration for announcements.",

    "project.6.codename": "DOBLEX CORE",
    "project.6.client": "[LEVEL 5 CLEARANCE REQUIRED]",
    "project.6.desc": "Internal server infrastructure with automated deployment pipelines, monitoring dashboards, and incident response systems.",

    // Pricing
    "pricing.prompt": "doblex@config:~$ nano /etc/doblex/pricing.conf",
    "pricing.title": "SYSTEM CONFIGURATION",
    "pricing.file": "/etc/doblex/pricing.conf",
    "pricing.modified": "[MODIFIED]",
    "pricing.comment1": "# DOBLEX.DEV PRICING CONFIGURATION",
    "pricing.comment2": "# Last updated:",
    "pricing.comment3": "# All prices in Discord Credits",
    "pricing.features": "# FEATURES:",
    "pricing.additional": "# ADDITIONAL PARAMETERS",
    "pricing.param": "PARAMETER",
    "pricing.value": "VALUE",
    "pricing.type": "TYPE",
    "pricing.recommended": "RECOMMENDED",
    "pricing.custom": "Custom quotes available — contact for enterprise pricing",
    "pricing.probot": "[PAYMENT VIA PROBOT CREDITS]",

    // Pricing tiers
    "tier.basic.name": "TIER_01.cfg",
    "tier.basic.value": "500 CREDITS",
    "tier.basic.desc": "Entry-level solutions for small projects",
    "tier.basic.f1": "Simple Discord bots (10-15 commands)",
    "tier.basic.f2": "Basic landing pages",
    "tier.basic.f3": "Single-feature scripts",
    "tier.basic.f4": "3-day turnaround",
    "tier.basic.f5": "7 days support",

    "tier.standard.name": "TIER_02.cfg",
    "tier.standard.value": "1200 CREDITS",
    "tier.standard.desc": "Professional solutions for growing communities",
    "tier.standard.f1": "Advanced Discord bots (25+ commands)",
    "tier.standard.f2": "Multi-page websites",
    "tier.standard.f3": "Database integration",
    "tier.standard.f4": "7-14 day turnaround",
    "tier.standard.f5": "30 days support",
    "tier.standard.f6": "1 revision included",

    "tier.premium.name": "TIER_03.cfg",
    "tier.premium.value": "3000 CREDITS",
    "tier.premium.desc": "Enterprise-grade solutions for large operations",
    "tier.premium.f1": "Full-stack web applications",
    "tier.premium.f2": "Complex bot ecosystems",
    "tier.premium.f3": "Custom API development",
    "tier.premium.f4": "Scalable architecture",
    "tier.premium.f5": "14-30 day turnaround",
    "tier.premium.f6": "90 days support",
    "tier.premium.f7": "3 revisions included",

    "tier.enterprise.name": "TIER_CUSTOM.cfg",
    "tier.enterprise.value": "CUSTOM",
    "tier.enterprise.desc": "Unlimited scope for maximum impact",
    "tier.enterprise.f1": "Unlimited complexity",
    "tier.enterprise.f2": "Dedicated developer",
    "tier.enterprise.f3": "Priority queue",
    "tier.enterprise.f4": "Flexible timeline",
    "tier.enterprise.f5": "Extended support",
    "tier.enterprise.f6": "Unlimited revisions",
    "tier.enterprise.f7": "NDA available",

    // Additional config
    "config.hosting": "HOSTING_MONTHLY",
    "config.hostingValue": "50 CREDITS/mo",
    "config.rush": "RUSH_DELIVERY",
    "config.rushValue": "+50%",
    "config.maintenance": "MAINTENANCE_PLAN",
    "config.maintenanceValue": "100 CREDITS/mo",
    "config.source": "SOURCE_CODE",
    "config.docs": "DOCUMENTATION",
    "config.consultation": "CONSULTATION",
    "config.included": "INCLUDED",
    "config.free": "FREE",

    // Contact
    "contact.prompt": "doblex@connect:~$ ./initiate_contact.sh",
    "contact.title": "ESTABLISH CONNECTION",
    "contact.header1": "╔══════════════════════════════════════════════════════╗",
    "contact.header2": "║ DOBLEX.DEV SECURE COMMUNICATION CHANNEL             ║",
    "contact.header3": "║ Type 'help' for available commands                   ║",
    "contact.header4": "╚══════════════════════════════════════════════════════╝",
    "contact.placeholder": "Type a command...",
    "contact.discord": "CONNECT VIA DISCORD →",
    "contact.discordSub": "Fastest response time",
    "contact.email": "ENCRYPTED EMAIL",
    "contact.emailSub": "For formal inquiries",
    "contact.responseTime": "EXPECTED RESPONSE TIME",
    "contact.hours": "< 2 HOURS",
    "contact.currentlyOnline": "CURRENTLY ONLINE",
    "contact.awaiting": "Awaiting your transmission...",

    // Commands
    "cmd.help": "Available commands:",
    "cmd.unknown": "Unknown command. Type 'help' for available commands.",

    // Footer
    "footer.system": "[SYSTEM]",
    "footer.rights": "DOBLEX.DEV © 2026 — ALL RIGHTS RESERVED",,
    "footer.session": "SESSION:",

    // Language toggle
    "lang.toggle": "[ AR / EN ]",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ar");

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "ar" ? "en" : "ar"));
  }, []);

  const t = useCallback(
    (key: string) => {
      return translations[language][key] || key;
    },
    [language]
  );

  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
