# Aiden Aydenjian — portfolio

Plain HTML/CSS/JS, no build step.

| File | What it is |
|---|---|
| `index.html` | Page structure, hero/about/contact text. |
| `CNAME` | Tells GitHub Pages to serve the site at aidenaydenjian.dev. |
| `content.js` | Projects, skills and experience as data. Edit this to change those sections. |
| `styles.css` | All styling. Colours/fonts are tokens at the top (`:root`). |
| `main.js` | Rendering + motion (stacking cards, word reveal, rotator, parallax, filters). |
| `terminal.js` | The `~` terminal easter egg. Add commands in its `COMMANDS` object. |
| `serve.ps1` | Tiny local server: `powershell -File serve.ps1` then open http://localhost:5173 |

Motion respects `prefers-reduced-motion` (cards stop scaling, marquee/rotator stop, text shows fully).

## Deploying to GitHub Pages
1. Create a repo on GitHub (e.g. `matchapatcha.github.io` for the root URL, or any name like `portfolio`).
2. Upload everything in this folder (Add file → Upload files works fine; `.claude/` is not needed).
3. Repo → Settings → Pages → Source: "Deploy from a branch", Branch: `main`, folder `/ (root)` → Save.
4. Live in ~1 minute at `https://matchapatcha.github.io/` (or `/portfolio/`).
5. Custom domain `aidenaydenjian.dev` (the `CNAME` file in this folder already contains it — upload it too):
   - Settings → Pages → Custom domain: `aidenaydenjian.dev` → Save.
   - At the domain's DNS provider, delete old records on `@` and `www` that point to the previous host, then add:
     - A `@` → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
     - AAAA `@` (optional, IPv6) → 2606:50c0:8000::153, 2606:50c0:8001::153, 2606:50c0:8002::153, 2606:50c0:8003::153
     - CNAME `www` → `matchapatcha.github.io`
   - If the DNS is on Cloudflare, set these records to "DNS only" (grey cloud) until HTTPS is issued.
   - Wait for the DNS check to pass, then tick "Enforce HTTPS" (`.dev` only works over HTTPS).
   - Recommended: GitHub → your profile Settings → Pages → "Add a domain" to verify `aidenaydenjian.dev` (adds one TXT record) so nobody else can claim it on GitHub.

## Status
Filled in from Aiden's résumé. Phone number intentionally left off the public site.

Still optional to add:
- `link` / `repo` URLs for projects in `content.js` (buttons appear automatically)
- Project photos/screenshots
