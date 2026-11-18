/* =========================================================
   CONTENT — edit this file to update the portfolio.
   Filled in from Aiden's résumé.
   ========================================================= */
window.PORTFOLIO = {
  // Words that scroll across the bottom of the hero
  marquee: ["Docker", "WireGuard", "Pi-hole", "Arch Linux", "Python", "Raspberry Pi", "Tailscale", "Cisco", "JSX", "Azure"],

  // Card colours cycle through: lime, violet, coral, sky, sand.
  // `link` / `repo` are optional; leave them "" to hide the buttons.
  projects: [
    {
      title: "Home Lab",
      kind: "Self-hosting",
      summary: "An old PC turned self-hosted server: NAS file storage, Pi-hole DNS filtering for the whole network, and a Minecraft server — all containerized in Docker.",
      tags: ["Docker", "Pi-hole", "NAS", "Linux"],
      link: "",
      repo: ""
    },
    {
      title: "Remote Access & VPN",
      kind: "Networking",
      summary: "My own WireGuard VPN, plus Tailscale and SSH, so I can securely manage my home network from anywhere.",
      tags: ["WireGuard", "Tailscale", "SSH"],
      link: "",
      repo: ""
    },
    {
      title: "Websites",
      kind: "Web",
      summary: "A personal site and a professional site, written from scratch in HTML and JSX.",
      tags: ["HTML", "JSX", "CSS"],
      link: "https://aidenaydenjian.dev",
      repo: ""
    },
    {
      title: "3D Printer Control",
      kind: "Raspberry Pi",
      summary: "A Raspberry Pi 4 set up to remotely manage and monitor my 3D printers.",
      tags: ["Raspberry Pi 4", "3D printing", "Linux"],
      link: "",
      repo: ""
    },
    {
      title: "Hackintosh",
      kind: "Systems",
      summary: "macOS running on a Lenovo ThinkPad — working through bootloader and hardware-compatibility issues until it boots clean.",
      tags: ["macOS", "Bootloaders", "ThinkPad"],
      link: "",
      repo: ""
    },
    {
      title: "Console Modding",
      kind: "Hardware hacking",
      summary: "Wii U via the isfshax boot exploit, a v1 Switch via the Tegra X1 RCM bootrom exploit (Fusée Gelée), and a 3DS via MSET9 to install Luma3DS custom firmware.",
      tags: ["Wii U", "Switch", "3DS", "Custom firmware"],
      link: "",
      repo: ""
    },
    {
      title: "Cybersecurity",
      kind: "CTF",
      summary: "Solving picoCTF cryptography and forensics challenges, and completing a TryHackMe room as part of a team.",
      tags: ["picoCTF", "TryHackMe", "Forensics", "Crypto"],
      link: "",
      repo: ""
    }
  ],

  skills: [
    { name: "Arch Linux", group: "Systems" },
    { name: "Ubuntu", group: "Systems" },
    { name: "Windows 10/11", group: "Systems" },
    { name: "macOS", group: "Systems" },
    { name: "ChromeOS", group: "Systems" },
    { name: "iOS", group: "Systems" },
    { name: "Android", group: "Systems" },
    { name: "DNS", group: "Networking" },
    { name: "Pi-hole", group: "Networking" },
    { name: "WireGuard", group: "Networking" },
    { name: "Tailscale", group: "Networking" },
    { name: "SSH", group: "Networking" },
    { name: "Addressing", group: "Networking" },
    { name: "Switching & routing", group: "Networking" },
    { name: "Wireless", group: "Networking" },
    { name: "Cisco Packet Tracer", group: "Networking" },
    { name: "Python", group: "Software" },
    { name: "HTML", group: "Software" },
    { name: "JSX", group: "Software" },
    { name: "Docker", group: "Software" },
    { name: "Git / GitHub", group: "Software" },
    { name: "VS Code", group: "Software" },
    { name: "VirtualBox", group: "Software" },
    { name: "Microsoft Azure", group: "Software" },
    { name: "PC builds & repair", group: "Hardware" },
    { name: "Laptops", group: "Hardware" },
    { name: "Game consoles", group: "Hardware" },
    { name: "Raspberry Pi", group: "Hardware" },
    { name: "3D printers", group: "Hardware" }
  ],

  // Education, certifications & coursework
  experience: [
    { dates: "Class of 2028", company: "Essex North Shore Agricultural & Technical School", short: "Essex Tech", role: "IT Program", note: "Honor roll. 1,200-hour program in hardware, networking, Linux and cybersecurity." },
    { dates: "Current",       company: "Essex Tech", short: "Essex Tech", role: "School Help Desk", note: "Part of the school’s help desk program." },
    { dates: "In progress",   company: "Cisco Networking Academy", short: "Cisco", role: "CCNA coursework", note: "Networking Basics, Network Devices, Addressing & Troubleshooting, Switching, Routing & Wireless Essentials." },
    { dates: "In progress",   company: "Harvard (online)", short: "Harvard", role: "CS50", note: "Harvard’s intro to computer science." },
    { dates: "Coursework",    company: "College Board", short: "AP", role: "AP Computer Science Principles", note: "" },
    { dates: "Certified",     company: "Certiport", short: "Certiport", role: "IT Specialist — Networking", note: "" },
    { dates: "Certified",     company: "OSHA", short: "OSHA", role: "OSHA 10-Hour General Industry", note: "" },
    { dates: "Coursework",    company: "Microsoft / Project STEM", short: "Microsoft", role: "Azure Fundamentals · Python", note: "Azure Fundamentals and Project STEM Python." }
  ]
};
