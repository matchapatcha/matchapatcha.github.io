(() => {
  const data = window.PORTFOLIO || { projects: [], skills: [], experience: [] };
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const noMotion = () => reduced.matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Render: projects ---------- */
  const colors = ["lime", "violet", "coral", "sky", "sand"];
  const glyphs = ["{ }", "</>", "=>", "[ ]", "&&"];
  $("#projects").innerHTML = data.projects.map((p, i) => `
    <article class="card card--${colors[i % colors.length]}" style="--i:${i}">
      <div class="card-meta"><span>${String(i + 1).padStart(2, "0")} / ${String(data.projects.length).padStart(2, "0")}</span><span>${esc(p.kind || p.year || "")}</span></div>
      <h3 class="card-title">${esc(p.title)}</h3>
      <span class="card-glyph" aria-hidden="true">${esc(glyphs[i % glyphs.length])}</span>
      <div class="card-body">
        <div>
          <p class="card-summary">${esc(p.summary)}</p>
          ${p.role ? `<span class="card-role">${esc(p.role)}</span>` : ""}
          <ul class="card-tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        </div>
        ${p.link || p.repo ? `<div class="card-actions">
          ${p.link ? `<a class="pill pill--dark" href="${esc(p.link)}" rel="noopener">Visit <span aria-hidden="true">↗</span></a>` : ""}
          ${p.repo ? `<a class="pill card-btn--ghost" href="${esc(p.repo)}" rel="noopener">Code</a>` : ""}
        </div>` : ""}
      </div>
    </article>`).join("");

  /* ---------- Render: skills + filters ---------- */
  const groups = ["All", ...new Set(data.skills.map((s) => s.group))];
  $("#skill-filters").innerHTML = groups.map((g, i) =>
    `<button class="filter" type="button" aria-pressed="${i === 0}" data-group="${esc(g)}">${esc(g)}</button>`).join("");
  $("#skill-chips").innerHTML = data.skills.map((s) =>
    `<li class="chip" data-group="${esc(s.group)}">${esc(s.name)}</li>`).join("");
  $("#skill-filters").addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    $$(".filter").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
    const g = btn.dataset.group;
    $$(".chip").forEach((c) => c.classList.toggle("is-dim", g !== "All" && c.dataset.group !== g));
  });

  /* ---------- Render: experience ---------- */
  $("#experience-list").innerHTML = data.experience.map((x) => `
    <li class="row reveal">
      <span class="row-dates">${esc(x.dates)}</span>
      <span class="row-company"><span title="${esc(x.company)}">${esc(x.short || x.company)}</span></span>
      <span class="row-role">${esc(x.role)}<span class="row-note">${esc(x.note || x.company)}</span></span>
      <span class="row-arrow" aria-hidden="true">→</span>
    </li>`).join("");

  /* ---------- Marquee ---------- */
  const words = (data.marquee || data.skills.slice(0, 10).map((s) => s.name)).map((w) => `<span>${esc(w)}</span>`).join("");
  $("#marquee-track").innerHTML = words + words;

  /* ---------- Year ---------- */
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Mobile menu ---------- */
  const menuBtn = $(".menu-btn"), mobileNav = $("#mobile-nav");
  const setMenu = (open) => {
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    mobileNav.hidden = !open;
  };
  menuBtn.addEventListener("click", () => setMenu(mobileNav.hidden));
  mobileNav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  /* ---------- Hero word rotator ---------- */
  const rWords = $$(".rotator-word");
  let rIdx = 0;
  setInterval(() => {
    if (noMotion() || document.hidden) return;
    const cur = rWords[rIdx];
    rIdx = (rIdx + 1) % rWords.length;
    cur.classList.remove("is-active"); cur.classList.add("is-leaving");
    rWords[rIdx].classList.remove("is-leaving"); rWords[rIdx].classList.add("is-active");
    setTimeout(() => cur.classList.remove("is-leaving"), 650);
  }, 2400);

  /* ---------- Statement word split ---------- */
  const statement = $("[data-words]");
  statement.innerHTML = statement.textContent.trim().split(/\s+/).map((w) => `<span class="w">${esc(w)}</span>`).join(" ");
  const sWords = $$(".w", statement);

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  $$(".reveal").forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 70}ms`; io.observe(el); });

  /* ---------- Count-up stats ---------- */
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target, target = +el.dataset.count, suffix = el.dataset.suffix || "";
      countIO.unobserve(el);
      const fmt = (n) => n.toLocaleString("en-US");
      if (noMotion()) { el.textContent = fmt(target) + suffix; return; }
      const t0 = performance.now(), dur = 1400;
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(Math.round(target * e)) + (p === 1 ? suffix : "");
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });
  $$("[data-count]").forEach((el) => countIO.observe(el));

  /* ---------- Copy email ---------- */
  $$("[data-copy]").forEach((b) => b.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(b.dataset.copy); b.textContent = "Copied ✓"; }
    catch { b.textContent = b.dataset.copy; }
    setTimeout(() => (b.textContent = "Copy email"), 2000);
  }));

  /* ---------- Contact glow follows pointer ---------- */
  const contact = $(".contact");
  contact.addEventListener("pointermove", (e) => {
    if (noMotion()) return;
    const r = contact.getBoundingClientRect();
    contact.style.setProperty("--mx", `${e.clientX - r.left}px`);
    contact.style.setProperty("--my", `${e.clientY - r.top}px`);
  });

  /* ---------- Footer wordmark fit ---------- */
  const wm = $("#wordmark"), wmWrap = wm.parentElement;
  const fitWordmark = () => {
    const cs = getComputedStyle(wmWrap);
    const avail = wmWrap.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    wmWrap.style.fontSize = "100px";
    wmWrap.style.fontSize = `${Math.floor(100 * avail / wm.getBoundingClientRect().width)}px`;
  };
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(fitWordmark);

  /* ---------- Scroll-driven effects ---------- */
  const header = $(".header");
  const navLinks = $$(".nav a");
  const sections = navLinks.map((a) => $(a.getAttribute("href")));
  const shapes = $$(".shape");
  const cards = $$(".card");
  let lastY = window.scrollY, ticking = false;

  const onScroll = () => {
    ticking = false;
    const y = window.scrollY, vh = window.innerHeight;

    // header state
    header.classList.toggle("is-scrolled", y > 20);
    const menuOpen = !mobileNav.hidden;
    header.classList.toggle("is-hidden", !menuOpen && y > lastY && y > vh * 0.6);
    lastY = y;

    // active nav link
    let active = -1;
    sections.forEach((s, i) => { if (s && s.getBoundingClientRect().top < vh * 0.4) active = i; });
    navLinks.forEach((a, i) => a.classList.toggle("is-active", i === active));

    // statement word highlight
    const sr = statement.getBoundingClientRect();
    const prog = noMotion() ? 1 : Math.min(1, Math.max(0, (vh * 0.85 - sr.top) / (sr.height + vh * 0.35)));
    const lit = Math.round(prog * sWords.length);
    sWords.forEach((w, i) => w.classList.toggle("on", i < lit));

    if (noMotion()) {
      shapes.forEach((s) => (s.style.transform = ""));
      cards.forEach((c) => { c.style.transform = ""; c.style.filter = ""; });
      return;
    }

    // hero parallax
    if (y < vh * 1.2) shapes.forEach((s) => {
      const d = parseFloat(s.dataset.depth || 0);
      s.style.transform = `translate3d(0, ${y * d}px, 0) rotate(${y * d * 0.08}deg)`;
    });

    // stacking cards shrink as the next one slides over
    cards.forEach((c, i) => {
      const next = cards[i + 1];
      if (!next) return;
      const dist = next.getBoundingClientRect().top - c.getBoundingClientRect().top;
      const t = Math.min(1, Math.max(0, 1 - dist / c.offsetHeight));
      c.style.transform = `scale(${1 - t * 0.06})`;
      c.style.filter = `brightness(${1 - t * 0.35})`;
    });
  };
  const requestTick = () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } };
  window.addEventListener("scroll", requestTick, { passive: true });
  window.addEventListener("resize", () => { fitWordmark(); requestTick(); });
  reduced.addEventListener?.("change", requestTick);
  onScroll();
})();
