/* =========================================================
   Terminal easter egg
   Open: press ~ (or `), type "sudo" anywhere, or click any [data-terminal] button.
   Add your own commands in the COMMANDS object below.
   ========================================================= */
(() => {
  const data = window.PORTFOLIO || { projects: [], skills: [], experience: [] };
  const LINKS = {
    github: "https://github.com/matchapatcha",
    linkedin: "https://www.linkedin.com/in/aiden-aydenjian-71830a390/",
    site: "https://aidenaydenjian.dev",
    email: "aidenaydenjian@gmail.com"
  };
  const USER = "aiden", HOST = "homelab";
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const slug = (s) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const bootTime = Date.now();

  /* ---------- DOM ---------- */
  const root = document.createElement("div");
  root.className = "term-backdrop";
  root.hidden = true;
  root.innerHTML = `
    <div class="term" role="dialog" aria-modal="true" aria-label="Terminal">
      <div class="term-bar">
        <span class="term-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span class="term-title">${USER}@${HOST}: ~</span>
        <button class="term-close" type="button" aria-label="Close terminal">×</button>
      </div>
      <div class="term-body" tabindex="-1">
        <div class="term-out" role="log" aria-live="polite"></div>
        <form class="term-line" autocomplete="off">
          <label class="term-prompt" for="term-input"></label>
          <input id="term-input" class="term-input" type="text" spellcheck="false" autocapitalize="off" autocorrect="off" enterkeyhint="send" aria-label="Terminal command">
        </form>
      </div>
    </div>`;
  document.body.appendChild(root);
  const out = root.querySelector(".term-out");
  const body = root.querySelector(".term-body");
  const form = root.querySelector(".term-line");
  const input = root.querySelector(".term-input");
  let cwd = "~";
  const promptHTML = () => `<span class="t-green">${USER}@${HOST}</span>:<span class="t-blue">${cwd}</span>$`;
  const setPrompt = () => { root.querySelector(".term-prompt").innerHTML = promptHTML(); root.querySelector(".term-title").textContent = `${USER}@${HOST}: ${cwd}`; };

  const print = (html = "", cls = "") => {
    const line = document.createElement("div");
    line.className = "t-line " + cls;
    line.innerHTML = html;
    out.appendChild(line);
    body.scrollTop = body.scrollHeight;
  };
  const printLines = (arr) => arr.forEach((l) => print(l));

  /* ---------- Virtual filesystem ---------- */
  const projectFiles = Object.fromEntries(data.projects.map((p) => [slug(p.title) + ".md", p]));
  const FS = {
    "~": ["about.txt", "resume.txt", "contact.txt", "projects/", "skills/", "education/"],
    "~/projects": Object.keys(projectFiles),
    "~/skills": [...new Set(data.skills.map((s) => slug(s.group) + ".txt"))],
    "~/education": ["education.txt"]
  };
  const resolveDir = (arg) => {
    if (!arg || arg === "~" || arg === "/" || arg === "~/") return "~";
    if (arg === "..") return "~";
    const clean = arg.replace(/\/$/, "").replace(/^~\//, "");
    const full = cwd === "~" ? `~/${clean}` : clean === ".." ? "~" : `${cwd}/${clean}`;
    return FS[full] ? full : FS[`~/${clean}`] ? `~/${clean}` : null;
  };

  const showProject = (p) => {
    print(`<span class="t-strong">${esc(p.title)}</span> <span class="t-dim">— ${esc(p.kind || "")}</span>`);
    print(esc(p.summary));
    print(`<span class="t-dim">tags:</span> ${p.tags.map((t) => `<span class="t-tag">${esc(t)}</span>`).join(" ")}`);
    if (p.link) print(`<span class="t-dim">link:</span> <a href="${esc(p.link)}" target="_blank" rel="noopener">${esc(p.link)}</a>`);
    if (p.repo) print(`<span class="t-dim">code:</span> <a href="${esc(p.repo)}" target="_blank" rel="noopener">${esc(p.repo)}</a>`);
  };
  const showSkills = (group) => {
    const groups = [...new Set(data.skills.map((s) => s.group))].filter((g) => !group || slug(g) === group);
    groups.forEach((g) => print(`<span class="t-yellow">${esc(g.padEnd(11))}</span> ${data.skills.filter((s) => s.group === g).map((s) => esc(s.name)).join(", ")}`));
  };
  const showEducation = () => data.experience.forEach((x) =>
    print(`<span class="t-dim">${esc(x.dates.padEnd(14))}</span><span class="t-strong">${esc(x.role)}</span> <span class="t-dim">· ${esc(x.short || x.company)}</span>`));
  const showContact = () => printLines([
    `<span class="t-dim">email   </span> <a href="mailto:${LINKS.email}">${LINKS.email}</a>`,
    `<span class="t-dim">github  </span> <a href="${LINKS.github}" target="_blank" rel="noopener">github.com/matchapatcha</a>`,
    `<span class="t-dim">linkedin</span> <a href="${LINKS.linkedin}" target="_blank" rel="noopener">linkedin.com/in/aiden-aydenjian</a>`,
    `<span class="t-dim">web     </span> <a href="${LINKS.site}" target="_blank" rel="noopener">aidenaydenjian.dev</a>`
  ]);
  const showAbout = () => print("Hands-on IT student who builds, breaks, and modifies technology for fun. Runs a self-hosted home lab, writes his own websites, and mods every device he can get his hands on. Looking for a co-op role to point that curiosity at real software and hardware problems.");

  const readFile = (name) => {
    const n = name.replace(/^~\//, "").replace(/^projects\//, "");
    if (/^about(\.txt)?$/.test(n)) return showAbout(), true;
    if (/^resume(\.txt)?$/.test(n)) {
      print(`<span class="t-strong">AIDEN AYDENJIAN</span> <span class="t-dim">· Middleton, MA · co-op candidate</span>`);
      showAbout(); print("");
      print(`<span class="t-yellow">## projects</span>`); data.projects.forEach((p) => print(`  • ${esc(p.title)} <span class="t-dim">— ${esc(p.kind)}</span>`));
      print(`<span class="t-yellow">## skills</span>`); showSkills();
      print(`<span class="t-yellow">## education & certs</span>`); showEducation();
      return true;
    }
    if (/^contact(\.txt)?$/.test(n)) return showContact(), true;
    if (/^education(\.txt)?$/.test(n.replace(/^education\//, ""))) return showEducation(), true;
    const sk = n.replace(/^skills\//, "").replace(/\.txt$/, "");
    if (FS["~/skills"].includes(sk + ".txt")) return showSkills(sk), true;
    const key = n.endsWith(".md") ? n : n + ".md";
    if (projectFiles[key]) return showProject(projectFiles[key]), true;
    return false;
  };

  const uptime = () => {
    const s = Math.floor((Date.now() - bootTime) / 1000);
    return `${Math.floor(s / 60)} min ${s % 60} s`;
  };

  const neofetch = () => {
    const art = [
      "  .------------.",
      "  | [] ==== o  |",
      "  |------------|",
      "  | [] ==== o  |",
      "  |------------|",
      "  | [] ==== o  |",
      "  '------------'",
      "     |_|  |_|   "
    ];
    const info = [
      `<span class="t-green">${USER}</span>@<span class="t-green">${HOST}</span>`,
      `<span class="t-dim">-------------</span>`,
      `<span class="t-yellow">Role</span>: IT student · co-op seeker`,
      `<span class="t-yellow">School</span>: Essex Tech, class of 2028`,
      `<span class="t-yellow">Location</span>: Middleton, MA`,
      `<span class="t-yellow">OS</span>: Arch Linux (btw)`,
      `<span class="t-yellow">Lab</span>: Docker · Pi-hole · NAS · Minecraft`,
      `<span class="t-yellow">VPN</span>: WireGuard + Tailscale`,
      `<span class="t-yellow">Learning</span>: CCNA · CS50`,
      `<span class="t-yellow">Uptime</span>: ${uptime()}`,
      `<span class="t-swatch"><i style="background:var(--lime)"></i><i style="background:var(--violet)"></i><i style="background:var(--coral)"></i><i style="background:var(--sky)"></i><i style="background:var(--sand)"></i></span>`
    ];
    const rows = Math.max(art.length, info.length);
    let html = "";
    for (let i = 0; i < rows; i++) html += `<span class="t-violet">${esc((art[i] || "").padEnd(18))}</span>  ${info[i] || ""}\n`;
    print(`<pre class="t-pre">${html}</pre>`);
  };

  const open = (url, label) => { print(`opening ${esc(label)}…`, "t-dim"); window.open(url, "_blank", "noopener"); };

  /* ---------- Commands ---------- */
  const COMMANDS = {
    help: { desc: "list commands", run: () => {
      const rows = Object.entries(COMMANDS).filter(([, c]) => c.desc).map(([n, c]) => `  <span class="t-green">${n.padEnd(10)}</span><span class="t-dim">${c.desc}</span>`);
      print(`<pre class="t-pre">${rows.join("\n")}</pre>`);
      print(`<span class="t-dim">try: cat resume.txt · ls projects</span>`);
      print(`<span class="t-dim">tip: Tab autocompletes, ↑/↓ for history, Esc closes. There may be a few hidden commands…</span>`);
    } },
    whoami:   { desc: "who is this guy", run: () => print("aiden — IT student, home-labber, console modder. Open to co-op roles.") },
    about:    { desc: "short bio", run: showAbout },
    neofetch: { desc: "system info, the fun way", run: neofetch },
    ls:       { desc: "list files", run: (a) => {
      const dir = a[0] ? resolveDir(a[0]) : cwd;
      if (!dir) return print(`ls: cannot access '${esc(a[0])}': No such file or directory`, "t-red");
      print(FS[dir].map((f) => f.endsWith("/") ? `<span class="t-blue">${esc(f)}</span>` : esc(f)).join("   "));
    } },
    cd:       { desc: "change directory", run: (a) => {
      const dir = resolveDir(a[0]);
      if (!dir) return print(`cd: no such directory: ${esc(a[0])}`, "t-red");
      cwd = dir; setPrompt();
    } },
    pwd:      { run: () => print(cwd.replace("~", "/home/aiden")) },
    cat:      { desc: "read a file", run: (a) => {
      if (!a.length) return print("usage: cat &lt;file&gt;", "t-dim");
      a.forEach((f) => { if (!readFile(cwd === "~" ? f : `${cwd.slice(2)}/${f}`) && !readFile(f)) print(`cat: ${esc(f)}: No such file or directory`, "t-red"); });
    } },
    projects: { desc: "list projects", run: () => data.projects.forEach((p, i) => print(`  <span class="t-dim">${String(i + 1).padStart(2, "0")}</span>  <span class="t-strong">${esc(p.title)}</span> <span class="t-dim">— ${esc(p.kind)}</span>`)) },
    skills:   { desc: "what I work with", run: () => showSkills() },
    education:{ desc: "school, courses & certs", run: showEducation },
    contact:  { desc: "how to reach me", run: showContact },
    github:   { desc: "open my GitHub", run: () => open(LINKS.github, "github.com/matchapatcha") },
    linkedin: { desc: "open my LinkedIn", run: () => open(LINKS.linkedin, "LinkedIn") },
    email:    { run: () => { print(`opening mail client → ${LINKS.email}`, "t-dim"); location.href = `mailto:${LINKS.email}`; } },
    history:  { desc: "command history", run: () => hist.forEach((h, i) => print(`  ${String(i + 1).padStart(3)}  ${esc(h)}`)) },
    clear:    { desc: "clear the screen", run: () => { out.innerHTML = ""; } },
    exit:     { desc: "close the terminal", run: () => close() },

    // hidden extras
    sudo:     { run: (a) => {
      if (a.join(" ") === "hire aiden") return print("[sudo] password for recruiter: ******** <br><span class='t-green'>✔ Great choice.</span> Reach me at <a href='mailto:" + LINKS.email + "'>" + LINKS.email + "</a>");
      print(`${USER} is not in the sudoers file. This incident will be reported. <span class="t-dim">(try: sudo hire aiden)</span>`, "t-red");
    } },
    rm:       { run: (a) => a.join(" ").includes("-rf") ? print("nice try. this portfolio is read-only. 😄", "t-yellow") : print("rm: permission denied", "t-red") },
    uptime:   { run: () => print(`up ${uptime()}, 1 user, load average: curiosity, caffeine, coursework`) },
    date:     { run: () => print(new Date().toString()) },
    echo:     { run: (a) => print(esc(a.join(" "))) },
    ping:     { run: (a) => {
      const host = esc(a[0] || "aidenaydenjian.dev");
      print(`PING ${host}: 56 data bytes`);
      [0, 1, 2].forEach((i) => setTimeout(() => print(`64 bytes from ${host}: icmp_seq=${i} ttl=64 time=${(Math.random() * 20 + 4).toFixed(1)} ms`), (i + 1) * (reduced.matches ? 0 : 350)));
    } },
    pihole:   { run: () => print("[✓] Pi-hole blocking is enabled. Ads on this site: 0. Trackers: 0.", "t-green") },
    vim:      { run: () => print("you are now trapped in vim. just kidding — type 'exit' to leave the terminal.", "t-yellow") },
    nano:     { run: () => print("real ones use vim. (jk, nano is fine)", "t-dim") },
    man:      { run: () => print("No manual entry. Try 'help'.") },
    hello:    { run: () => print("hey 👋 — type 'help' to look around.") },
    hi:       { run: () => print("hey 👋 — type 'help' to look around.") },
    coffee:   { run: () => print("☕ brewing… error 418: I'm a teapot.", "t-yellow") },
    minecraft:{ run: () => print("Minecraft server: running in Docker on the home lab. ⛏️") }
  };

  /* ---------- Run ---------- */
  const hist = [];
  let hIdx = 0;
  const run = (raw) => {
    const line = raw.trim();
    print(`${promptHTML()} ${esc(line)}`, "t-echo");
    if (!line) return;
    hist.push(line); hIdx = hist.length;
    const [cmd, ...args] = line.split(/\s+/);
    const c = COMMANDS[cmd.toLowerCase()];
    if (c) c.run(args);
    else print(`command not found: ${esc(cmd)} — type <span class="t-green">help</span>`, "t-red");
  };

  form.addEventListener("submit", (e) => { e.preventDefault(); run(input.value); input.value = ""; });
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") { e.preventDefault(); if (hIdx > 0) input.value = hist[--hIdx]; }
    else if (e.key === "ArrowDown") { e.preventDefault(); hIdx = Math.min(hist.length, hIdx + 1); input.value = hist[hIdx] || ""; }
    else if (e.key === "Tab") {
      e.preventDefault();
      const parts = input.value.split(/\s+/);
      const last = parts[parts.length - 1];
      const pool = parts.length === 1
        ? Object.keys(COMMANDS).filter((k) => COMMANDS[k].desc)
        : [...FS[cwd], ...(cwd === "~" ? FS["~/projects"].map((f) => "projects/" + f) : [])];
      const hits = pool.filter((p) => p.startsWith(last));
      if (hits.length === 1) { parts[parts.length - 1] = hits[0]; input.value = parts.join(" ") + (hits[0].endsWith("/") ? "" : " "); }
      else if (hits.length > 1) { print(`${promptHTML()} ${esc(input.value)}`, "t-echo"); print(hits.map(esc).join("   "), "t-dim"); }
    } else if (e.key === "l" && e.ctrlKey) { e.preventDefault(); out.innerHTML = ""; }
  });
  body.addEventListener("click", (e) => { if (!e.target.closest("a") && !window.getSelection().toString()) input.focus(); });

  /* ---------- Open / close ---------- */
  let lastFocus = null, booted = false;
  const boot = () => {
    const lines = [
      `<span class="t-dim">aidenOS 1.0 — tty1</span>`,
      `<span class="t-green">[  OK  ]</span> Started docker.service`,
      `<span class="t-green">[  OK  ]</span> Started pihole-FTL.service`,
      `<span class="t-green">[  OK  ]</span> Reached target curiosity.target`,
      ``,
      `Welcome! Type <span class="t-green">help</span> to see what you can do, or try <span class="t-green">neofetch</span>.`
    ];
    if (reduced.matches) return printLines(lines);
    lines.forEach((l, i) => setTimeout(() => print(l), i * 110));
  };
  const openTerm = () => {
    if (!root.hidden) return;
    lastFocus = document.activeElement;
    root.hidden = false;
    document.documentElement.classList.add("term-open");
    setPrompt();
    if (!booted) { booted = true; boot(); }
    input.focus({ preventScroll: true });
  };
  const close = () => {
    root.hidden = true;
    document.documentElement.classList.remove("term-open");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  };
  root.querySelector(".term-close").addEventListener("click", close);
  root.addEventListener("mousedown", (e) => { if (e.target === root) close(); });
  root.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { e.stopPropagation(); close(); }
    if (e.key === "Tab" && document.activeElement !== input) { e.preventDefault(); input.focus(); } // simple focus trap
  });

  // Triggers: ~ or ` key, typing "sudo", or any [data-terminal] element
  let buf = "";
  document.addEventListener("keydown", (e) => {
    if (!root.hidden) return;
    const t = e.target;
    if (t.closest && t.closest("input, textarea, [contenteditable]")) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === "~" || e.key === "`") { e.preventDefault(); openTerm(); return; }
    if (e.key.length === 1) {
      buf = (buf + e.key.toLowerCase()).slice(-4);
      if (buf === "sudo") { buf = ""; openTerm(); }
    }
  });
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-terminal]");
    if (b) { e.preventDefault(); openTerm(); }
  });

  window.openTerminal = openTerm;
})();
