"use client";

import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/lib/language-context";

interface CommandResult {
  cmd: string;
  output: string[];
  isError?: boolean;
}

// Creative terminal commands with responses
const getCommands = (lang: "ar" | "en") => {
  const commands: Record<string, { desc: string; output: string[] }> = lang === "ar" ? {
    "help": {
      desc: "عرض الأوامر المتاحة",
      output: [
        "╔═══════════════════════════════════════════════════════════╗",
        "║  أوامر النظام المتاحة — PHANTOM.DEV v4.2                  ║",
        "╚═══════════════════════════════════════════════════════════╝",
        "",
        "  help          عرض هذه القائمة",
        "  whoami        من أنت؟",
        "  status        حالة النظام",
        "  ping          اختبار الاتصال",
        "  fortune       اقتباس عشوائي للهاكرز",
        "  matrix        دخول الماتريكس",
        "  hack          اختراق البنتاغون",
        "  coffee        طلب قهوة",
        "  sudo rm -rf   حذف الإنترنت",
        "  neofetch      معلومات النظام",
        "  skills        عرض المهارات",
        "  secret        كشف السر",
        "  weather       الطقس في السيرفر",
        "  credits       رصيد ديسكورد",
        "  uptime        وقت تشغيل النظام",
        "  discord       فتح رابط الديسكورد",
        "",
        "  [نصيحة: جرب أوامر عشوائية... ربما تكتشف أسراراً]",
      ]
    },
    "whoami": {
      desc: "هوية المستخدم",
      output: [
        "┌─────────────────────────────────────┐",
        "│  المستخدم: زائر_مجهول              │",
        "│  التصريح: المستوى 1 (مقيد)         │",
        "│  الموقع: [محجوب]                   │",
        "│  الحالة: قيد المراقبة               │",
        "│  IP: ***.***.***.***               │",
        "└─────────────────────────────────────┘",
        "",
        "⚠ ملاحظة: تم تسجيل بصمتك الرقمية",
      ]
    },
    "status": {
      desc: "حالة النظام",
      output: [
        "╔══════════════════════════════════════╗",
        "║     حالة نظام PHANTOM.DEV           ║",
        "╠══════════════════════════════════════╣",
        "║  السيرفر:      ███████████  99.9%   ║",
        "║  الاستجابة:    < 2 ساعة             ║",
        "║  المشاريع:     3 نشطة               ║",
        "║  الانتظار:     متاح                 ║",
        "║  الوضع:        جاهز للمهام          ║",
        "╚══════════════════════════════════════╝",
        "",
        "[الحالة: متصل ● جاهز لاستقبال الطلبات]"
      ]
    },
    "ping": {
      desc: "اختبار الاتصال",
      output: [
        "PING phantom.dev (127.0.0.1): 56 bytes",
        "64 bytes from phantom.dev: icmp_seq=0 ttl=64 time=0.042 ms",
        "64 bytes from phantom.dev: icmp_seq=1 ttl=64 time=0.039 ms",
        "64 bytes from phantom.dev: icmp_seq=2 ttl=64 time=0.041 ms",
        "",
        "--- phantom.dev ping statistics ---",
        "3 packets transmitted, 3 received, 0% packet loss",
        "",
        "✓ الاتصال ممتاز. نحن نستمع."
      ]
    },
    "fortune": {
      desc: "حكمة الهاكر",
      output: [
        "",
        "  ╔═══════════════════════════════════════════════════╗",
        "  ║                                                   ║",
        "  ║   \"الكود المثالي لا يُكتب.                      ║",
        "  ║    بل يُنحت من الفوضى.\"                         ║",
        "  ║                                                   ║",
        "  ║                    — مجهول، 2024                  ║",
        "  ╚═══════════════════════════════════════════════════╝",
        "",
      ]
    },
    "matrix": {
      desc: "دخول الماتريكس",
      output: [
        "",
        "  جارٍ تحميل الحبة الحمراء...",
        "",
        "  01001000 01000101 01001100 01001100 01001111",
        "  ░▒▓█ الماتريكس حقيقية █▓▒░",
        "  01010111 01001111 01010010 01001100 01000100",
        "",
        "  ⚠ خطأ: أنت بالفعل داخل الماتريكس",
        "  ⚠ لا يمكن الخروج. استمتع بالكود.",
        "",
      ]
    },
    "hack": {
      desc: "اختراق البنتاغون",
      output: [
        "",
        "  [!] جارٍ الاتصال بـ pentagon.gov...",
        "  [!] تجاوز جدار الحماية...",
        "  [!] كسر التشفير AES-256...",
        "  [!] الدخول إلى قاعدة البيانات...",
        "",
        "  ██████████████████████████ 100%",
        "",
        "  ❌ فشل: هذه مزحة فقط",
        "  ❌ نحن نبرمج بوتات ديسكورد، لسنا NSA",
        "  ❌ لكن لو أردت... 😏",
        "",
      ]
    },
    "coffee": {
      desc: "طلب قهوة",
      output: [
        "",
        "  جارٍ تحضير القهوة...",
        "",
        "       ( (",
        "        ) )",
        "      ........",
        "      |      |]",
        "      \\      /",
        "       `----'",
        "",
        "  ☕ القهوة جاهزة!",
        "  ⚠ تحذير: المبرمج يعمل على كافيين",
        "",
      ]
    },
    "sudo rm -rf": {
      desc: "حذف كل شيء",
      output: [
        "",
        "  ⚠ تحذير: أنت على وشك حذف الإنترنت بالكامل",
        "",
        "  [▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░] 50%",
        "",
        "  ❌ خطأ: صلاحيات sudo مرفوضة",
        "  ❌ فقط المطورين المعتمدين يمكنهم تدمير الإنترنت",
        "  ❌ جرب الانضمام للفريق أولاً",
        "",
      ]
    },
    "neofetch": {
      desc: "معلومات النظام",
      output: [
        "",
        "        ██████████████         phantom@dev",
        "      ████            ████     ─────────────",
        "    ████  ░░░░░░░░░░░░  ████   OS: PHANTOM.DEV v4.2",
        "   ████ ░░░░░░░░░░░░░░░░ ████  Kernel: Node.js LTS",
        "  ████ ░░░░░░░░░░░░░░░░░░ ████ Uptime: 99.9%",
        "  ████ ░░░░ PHANTOM ░░░░ ████  Shell: Terminal v2.0",
        "  ████ ░░░░░░░░░░░░░░░░░░ ████ Resolution: ∞ x ∞",
        "   ████ ░░░░░░░░░░░░░░░░ ████  Theme: Hacker Dark",
        "    ████  ░░░░░░░░░░░░  ████   Terminal: Custom",
        "      ████            ████     CPU: Brain.js @3GHz",
        "        ██████████████         Memory: ∞ GB",
        "",
      ]
    },
    "skills": {
      desc: "عرض المهارات",
      output: [
        "",
        "  ╔════════════════════════════════════════╗",
        "  ║         مهارات PHANTOM.DEV             ║",
        "  ╠════════════════════════════════════════╣",
        "  ║  Discord.js   ████████████████  100%   ║",
        "  ║  React/Next   ███████████████░   95%   ║",
        "  ║  Node.js      ████████████████  100%   ║",
        "  ║  TypeScript   ███████████████░   95%   ║",
        "  ║  Database     ██████████████░░   90%   ║",
        "  ║  API Design   ███████████████░   95%   ║",
        "  ║  Coffee       ████████████████  100%   ║",
        "  ╚════════════════════════════════════════╝",
        "",
      ]
    },
    "secret": {
      desc: "كشف السر",
      output: [
        "",
        "  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░",
        "  ░  ⚠ تنبيه: معلومات سرية للغاية ⚠    ░",
        "  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░",
        "",
        "  السر هو... نحن نحب ما نفعله.",
        "  كل سطر كود نكتبه بشغف.",
        "  وكل مشروع يحمل جزءاً منا.",
        "",
        "  🔐 [تم تسجيل هذا الكشف في السجلات]",
        "",
      ]
    },
    "weather": {
      desc: "الطقس في السيرفر",
      output: [
        "",
        "  ╔════════════════════════════════════╗",
        "  ║     الطقس في PHANTOM.DEV          ║",
        "  ╠════════════════════════════════════╣",
        "  ║                                    ║",
        "  ║     ☁️  غائم مع احتمال كود        ║",
        "  ║                                    ║",
        "  ║     درجة الحرارة: 🔥 ساخن         ║",
        "  ║     الرطوبة: ☕ 100% كافيين       ║",
        "  ║     الرياح: 💨 سريع جداً          ║",
        "  ║                                    ║",
        "  ╚════════════════════════════════════╝",
        "",
      ]
    },
    "credits": {
      desc: "رصيد ديسكورد",
      output: [
        "",
        "  ╔════════════════════════════════════════╗",
        "  ║          رصيد كريدت ديسكورد            ║",
        "  ╠════════════════════════════════════════╣",
        "  ║                                        ║",
        "  ║   الرصيد الحالي: ??? كريدت            ║",
        "  ║   الحالة: غير مسجل                     ║",
        "  ║                                        ║",
        "  ║   للتسجيل والحصول على كريدت:          ║",
        "  ║   → انضم لسيرفر الديسكورد              ║",
        "  ║   → استخدم ProBot للتحويل             ║",
        "  ║                                        ║",
        "  ╚════════════════════════════════════════╝",
        "",
        "  [اكتب 'discord' للحصول على رابط السيرفر]",
      ]
    },
    "uptime": {
      desc: "وقت تشغيل النظام",
      output: [
        "",
        "  ╔════════════════════════════════════╗",
        "  ║         إحصائيات التشغيل          ║",
        "  ╠════════════════════════════════════╣",
        "  ║  وقت التشغيل:    365 يوم 23:59:59 ║",
        "  ║  آخر إعادة:      لا يوجد          ║",
        "  ║  الأعطال:        0                ║",
        "  ║  نسبة التشغيل:   99.99%           ║",
        "  ╚════════════════════════════════════╝",
        "",
        "  💪 نعمل بدون توقف!",
      ]
    },
    "discord": {
      desc: "رابط الديسكورد",
      output: [
        "",
        "  ╔════════════════════════════════════════╗",
        "  ║       🎮 رابط سيرفر ديسكورد 🎮        ║",
        "  ╠════════════════════════════════════════╣",
        "  ║                                        ║",
        "  ║   discord.gg/phantom                   ║",
        "  ║                                        ║",
        "  ║   ← انقر الزر بالأسفل للانضمام       ║",
        "  ║                                        ║",
        "  ╚════════════════════════════════════════╝",
        "",
        "  ⚡ نحن بانتظارك!",
      ]
    },
    "ls": {
      desc: "عرض الملفات",
      output: [
        "drwxr-xr-x  projects/",
        "drwxr-xr-x  secrets/",
        "-rw-r--r--  README.md",
        "-rwx------  admin_panel.exe",
        "-rw-------  classified.dat",
        "-rw-r--r--  skills.json",
        "",
        "⚠ بعض الملفات مشفرة. صلاحيات مطلوبة."
      ]
    },
    "cat readme": {
      desc: "قراءة الملف",
      output: [
        "",
        "# PHANTOM.DEV",
        "",
        "مرحباً بك في نظامنا السري.",
        "نحن نبني أحلام المطورين.",
        "",
        "للطلبات: تواصل عبر ديسكورد",
        "للأسرار: واصل الاستكشاف...",
        "",
      ]
    },
    "exit": {
      desc: "الخروج",
      output: [
        "",
        "  ⚠ لا يمكنك الهروب من PHANTOM.DEV",
        "  ⚠ أنت هنا للأبد الآن",
        "  ⚠ استرخِ واستمتع بالكود",
        "",
        "  (مجرد مزحة... أو لا؟ 👀)",
        "",
      ]
    },
    "clear": {
      desc: "مسح الشاشة",
      output: []
    },
  } : {
    "help": {
      desc: "Show available commands",
      output: [
        "╔═══════════════════════════════════════════════════════════╗",
        "║  Available System Commands — PHANTOM.DEV v4.2             ║",
        "╚═══════════════════════════════════════════════════════════╝",
        "",
        "  help          Show this menu",
        "  whoami        Who are you?",
        "  status        System status",
        "  ping          Test connection",
        "  fortune       Random hacker quote",
        "  matrix        Enter the Matrix",
        "  hack          Hack the Pentagon",
        "  coffee        Order coffee",
        "  sudo rm -rf   Delete the internet",
        "  neofetch      System info",
        "  skills        Show skills",
        "  secret        Reveal the secret",
        "  weather       Server weather",
        "  credits       Discord credits",
        "  uptime        System uptime",
        "  discord       Open Discord link",
        "",
        "  [Tip: Try random commands... you might discover secrets]",
      ]
    },
    "whoami": {
      desc: "User identity",
      output: [
        "┌─────────────────────────────────────┐",
        "│  User: anonymous_visitor            │",
        "│  Clearance: Level 1 (Restricted)    │",
        "│  Location: [REDACTED]               │",
        "│  Status: Under Observation          │",
        "│  IP: ***.***.***.***                │",
        "└─────────────────────────────────────┘",
        "",
        "⚠ Note: Your digital fingerprint has been logged",
      ]
    },
    "status": {
      desc: "System status",
      output: [
        "╔══════════════════════════════════════╗",
        "║     PHANTOM.DEV SYSTEM STATUS        ║",
        "╠══════════════════════════════════════╣",
        "║  Server:       ███████████  99.9%    ║",
        "║  Response:     < 2 hours             ║",
        "║  Projects:     3 active              ║",
        "║  Queue:        Available             ║",
        "║  Mode:         Ready for missions    ║",
        "╚══════════════════════════════════════╝",
        "",
        "[Status: ONLINE ● Ready to accept requests]"
      ]
    },
    "ping": {
      desc: "Test connection",
      output: [
        "PING phantom.dev (127.0.0.1): 56 bytes",
        "64 bytes from phantom.dev: icmp_seq=0 ttl=64 time=0.042 ms",
        "64 bytes from phantom.dev: icmp_seq=1 ttl=64 time=0.039 ms",
        "64 bytes from phantom.dev: icmp_seq=2 ttl=64 time=0.041 ms",
        "",
        "--- phantom.dev ping statistics ---",
        "3 packets transmitted, 3 received, 0% packet loss",
        "",
        "✓ Connection excellent. We're listening."
      ]
    },
    "fortune": {
      desc: "Hacker wisdom",
      output: [
        "",
        "  ╔═══════════════════════════════════════════════════╗",
        "  ║                                                   ║",
        "  ║   \"Perfect code isn't written.                   ║",
        "  ║    It's carved from chaos.\"                      ║",
        "  ║                                                   ║",
        "  ║                    — Anonymous, 2024              ║",
        "  ╚═══════════════════════════════════════════════════╝",
        "",
      ]
    },
    "matrix": {
      desc: "Enter the Matrix",
      output: [
        "",
        "  Loading red pill...",
        "",
        "  01001000 01000101 01001100 01001100 01001111",
        "  ░▒▓█ THE MATRIX IS REAL █▓▒░",
        "  01010111 01001111 01010010 01001100 01000100",
        "",
        "  ⚠ Error: You're already inside the Matrix",
        "  ⚠ Cannot exit. Enjoy the code.",
        "",
      ]
    },
    "hack": {
      desc: "Hack the Pentagon",
      output: [
        "",
        "  [!] Connecting to pentagon.gov...",
        "  [!] Bypassing firewall...",
        "  [!] Cracking AES-256 encryption...",
        "  [!] Accessing database...",
        "",
        "  ██████████████████████████ 100%",
        "",
        "  ❌ Failed: This is just a joke",
        "  ❌ We code Discord bots, we're not the NSA",
        "  ❌ But if you wanted... 😏",
        "",
      ]
    },
    "coffee": {
      desc: "Order coffee",
      output: [
        "",
        "  Brewing coffee...",
        "",
        "       ( (",
        "        ) )",
        "      ........",
        "      |      |]",
        "      \\      /",
        "       `----'",
        "",
        "  ☕ Coffee ready!",
        "  ⚠ Warning: Developer runs on caffeine",
        "",
      ]
    },
    "sudo rm -rf": {
      desc: "Delete everything",
      output: [
        "",
        "  ⚠ Warning: You're about to delete the entire internet",
        "",
        "  [▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░] 50%",
        "",
        "  ❌ Error: sudo permissions denied",
        "  ❌ Only certified devs can destroy the internet",
        "  ❌ Try joining the team first",
        "",
      ]
    },
    "neofetch": {
      desc: "System info",
      output: [
        "",
        "        ██████████████         phantom@dev",
        "      ████            ████     ─────────────",
        "    ████  ░░░░░░░░░░░░  ████   OS: PHANTOM.DEV v4.2",
        "   ████ ░░░░░░░░░░░░░░░░ ████  Kernel: Node.js LTS",
        "  ████ ░░░░░░░░░░░░░░░░░░ ████ Uptime: 99.9%",
        "  ████ ░░░░ PHANTOM ░░░░ ████  Shell: Terminal v2.0",
        "  ████ ░░░░░░░░░░░░░░░░░░ ████ Resolution: ∞ x ∞",
        "   ████ ░░░░░░░░░░░░░░░░ ████  Theme: Hacker Dark",
        "    ████  ░░░░░░░░░░░░  ████   Terminal: Custom",
        "      ████            ████     CPU: Brain.js @3GHz",
        "        ██████████████         Memory: ∞ GB",
        "",
      ]
    },
    "skills": {
      desc: "Show skills",
      output: [
        "",
        "  ╔════════════════════════════════════════╗",
        "  ║         PHANTOM.DEV SKILLS             ║",
        "  ╠════════════════════════════════════════╣",
        "  ║  Discord.js   ████████████████  100%   ║",
        "  ║  React/Next   ███████████████░   95%   ║",
        "  ║  Node.js      ████████████████  100%   ║",
        "  ║  TypeScript   ███████████████░   95%   ║",
        "  ║  Database     ██████████████░░   90%   ║",
        "  ║  API Design   ███████████████░   95%   ║",
        "  ║  Coffee       ████████████████  100%   ║",
        "  ╚════════════════════════════════════════╝",
        "",
      ]
    },
    "secret": {
      desc: "Reveal the secret",
      output: [
        "",
        "  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░",
        "  ░  ⚠ ALERT: TOP SECRET INFORMATION ⚠  ░",
        "  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░",
        "",
        "  The secret is... we love what we do.",
        "  Every line of code is written with passion.",
        "  Every project carries a piece of us.",
        "",
        "  🔐 [This revelation has been logged]",
        "",
      ]
    },
    "weather": {
      desc: "Server weather",
      output: [
        "",
        "  ╔════════════════════════════════════╗",
        "  ║     PHANTOM.DEV WEATHER            ║",
        "  ╠════════════════════════════════════╣",
        "  ║                                    ║",
        "  ║     ☁️  Cloudy with chance of code ║",
        "  ║                                    ║",
        "  ║     Temperature: 🔥 Hot            ║",
        "  ║     Humidity: ☕ 100% caffeine     ║",
        "  ║     Wind: 💨 Very fast             ║",
        "  ║                                    ║",
        "  ╚════════════════════════════════════╝",
        "",
      ]
    },
    "credits": {
      desc: "Discord credits",
      output: [
        "",
        "  ╔════════════════════════════════════════╗",
        "  ║          DISCORD CREDITS BALANCE       ║",
        "  ╠════════════════════════════════════════╣",
        "  ║                                        ║",
        "  ║   Current Balance: ??? CREDITS        ║",
        "  ║   Status: Not registered              ║",
        "  ║                                        ║",
        "  ║   To register and get credits:        ║",
        "  ║   → Join our Discord server           ║",
        "  ║   → Use ProBot to transfer            ║",
        "  ║                                        ║",
        "  ╚════════════════════════════════════════╝",
        "",
        "  [Type 'discord' to get server link]",
      ]
    },
    "uptime": {
      desc: "System uptime",
      output: [
        "",
        "  ╔════════════════════════════════════╗",
        "  ║         UPTIME STATISTICS          ║",
        "  ╠════════════════════════════════════╣",
        "  ║  Uptime:       365 days 23:59:59   ║",
        "  ║  Last restart: Never               ║",
        "  ║  Crashes:      0                   ║",
        "  ║  Availability: 99.99%              ║",
        "  ╚════════════════════════════════════╝",
        "",
        "  💪 Running non-stop!",
      ]
    },
    "discord": {
      desc: "Discord link",
      output: [
        "",
        "  ╔════════════════════════════════════════╗",
        "  ║       🎮 DISCORD SERVER LINK 🎮        ║",
        "  ╠════════════════════════════════════════╣",
        "  ║                                        ║",
        "  ║   discord.gg/phantom                   ║",
        "  ║                                        ║",
        "  ║   ← Click the button below to join    ║",
        "  ║                                        ║",
        "  ╚════════════════════════════════════════╝",
        "",
        "  ⚡ We're waiting for you!",
      ]
    },
    "ls": {
      desc: "List files",
      output: [
        "drwxr-xr-x  projects/",
        "drwxr-xr-x  secrets/",
        "-rw-r--r--  README.md",
        "-rwx------  admin_panel.exe",
        "-rw-------  classified.dat",
        "-rw-r--r--  skills.json",
        "",
        "⚠ Some files are encrypted. Clearance required."
      ]
    },
    "cat readme": {
      desc: "Read file",
      output: [
        "",
        "# PHANTOM.DEV",
        "",
        "Welcome to our secret system.",
        "We build developer dreams.",
        "",
        "For requests: Contact via Discord",
        "For secrets: Keep exploring...",
        "",
      ]
    },
    "exit": {
      desc: "Exit",
      output: [
        "",
        "  ⚠ You cannot escape PHANTOM.DEV",
        "  ⚠ You're here forever now",
        "  ⚠ Relax and enjoy the code",
        "",
        "  (Just kidding... or am I? 👀)",
        "",
      ]
    },
    "clear": {
      desc: "Clear screen",
      output: []
    },
  };
  return commands;
};

export function CommandContact() {
  const [inputValue, setInputValue] = useState("");
  const [commandHistory, setCommandHistory] = useState<CommandResult[]>([]);
  const { t, dir, language } = useLanguage();
  const commands = getCommands(language);

  const handleCommand = useCallback((cmd: string) => {
    const trimmedCmd = cmd.toLowerCase().trim();
    
    if (trimmedCmd === "clear") {
      setCommandHistory([]);
      return;
    }

    const commandData = commands[trimmedCmd];
    
    if (commandData) {
      setCommandHistory(prev => [...prev, {
        cmd,
        output: commandData.output
      }]);
    } else {
      setCommandHistory(prev => [...prev, {
        cmd,
        output: [t("cmd.unknown")],
        isError: true
      }]);
    }
  }, [commands, t]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleCommand(inputValue);
      setInputValue("");
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
    <div dir={dir} className="min-h-screen py-20 px-6 bg-muted/30 section-animate">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-10">
          <p className="text-primary text-sm mb-2">
            {t("contact.prompt")}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground glitch-hover inline-block cursor-blink">
            {t("contact.title")}
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
            <span className="text-muted-foreground text-sm ms-4">
              phantom@secure-channel — bash
            </span>
          </div>

          {/* Terminal Body */}
          <div className="p-6 min-h-[400px] max-h-[500px] overflow-y-auto">
            {/* Welcome Message */}
            <div className="mb-6 text-sm">
              <p className="text-primary">{t("contact.header1")}</p>
              <p className="text-primary">{t("contact.header2")}</p>
              <p className="text-primary">{t("contact.header3")}</p>
              <p className="text-primary">{t("contact.header4")}</p>
            </div>

            {/* Command History */}
            {commandHistory.map((item, i) => (
              <div key={i} className="mb-4 text-sm">
                <p>
                  <span className="text-primary">phantom@connect:~$</span>{" "}
                  <span className="text-foreground">{item.cmd}</span>
                </p>
                <div className={`mt-2 ${dir === "rtl" ? "pr-4" : "pl-4"} ${item.isError ? "text-destructive" : "text-muted-foreground"}`}>
                  {item.output.map((line, j) => (
                    <p key={j} className={line.includes("✓") || line.includes("●") ? "text-primary" : ""}>{line || "\u00A0"}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* Input Line */}
            <form onSubmit={handleSubmit} className="flex items-center text-sm">
              <span className="text-primary me-2">phantom@connect:~$</span>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-transparent text-foreground outline-none caret-primary"
                placeholder={t("contact.placeholder")}
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
                  {t("contact.discord")}
                </p>
                <p className="text-muted-foreground text-sm">
                  {t("contact.discordSub")}
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
                  {t("contact.email")}
                </p>
                <p className="text-muted-foreground text-sm">
                  {t("contact.emailSub")}
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
              <p className="text-primary text-sm mb-1">{t("contact.responseTime")}</p>
              <p className="text-2xl font-bold text-foreground">
                {t("contact.hours")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-primary rounded-full animate-pulse" />
              <span className="text-muted-foreground">{t("contact.currentlyOnline")}</span>
            </div>
          </div>
        </div>

        {/* Terminal prompt */}
        <div className="mt-8 text-muted-foreground text-sm">
          <span className="text-primary">phantom@connect:~$</span> echo
          &quot;{t("contact.awaiting")}&quot;
          <span className="inline-block w-2 h-4 bg-primary animate-pulse ms-1" />
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
