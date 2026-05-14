# LuxRide Animated — Neon Particle Dark Theme

A unique, heavily-animated premium taxi booking website featuring:
- **Canvas particle network** — real-time animated background with 90 floating nodes, proximity-based connection lines, and mouse-repel physics
- **Neon violet/purple/cyan** colour palette on deep space dark backgrounds  
- **Glassmorphism** booking cards with frosted backdrop-filter
- **Full JavaScript interactivity** — fare calculator, fleet filter, booking form, promo codes, counters, and toast notifications
- **Space Grotesk + Inter** typography pairing for maximum impact

---

## 📁 File Structure

```
luxride-animated/
├── index.html        ← Home (hero + canvas, stats, services, fleet, calculator, app, testimonials, FAQ, CTA)
├── about.html        ← About (story, CEO quote, animated timeline, awards, team)
├── services.html     ← Services (6 detailed sections with anchor navigation)
├── fleet.html        ← Fleet (10 vehicles with JS category filter)
├── airport.html      ← Airport (6 airports, 4-step flow, 3-tier pricing table)
├── tours.html        ← Tours (5 premium packages with ratings)
├── blog.html         ← Blog (5 article cards with category badges)
├── blog-single.html  ← Blog Post (full article, author box, sidebar, comments, share)
├── booking.html      ← Booking (5-step form, fare estimator, vehicle selector, promo codes)
├── contact.html      ← Contact (form, info cards, hours, socials, FAQ)
├── css/
│   └── style.css     ← Complete animated theme stylesheet (1,200+ lines)
└── js/
    └── script.js     ← All JavaScript (canvas, reveals, counters, interactions)
```

---

## 🎨 Design System

### Colour Palette
| Token | Hex | Usage |
|---|---|---|
| `--neon`  | `#6c63ff` | Primary violet — buttons, icons, borders |
| `--neon2` | `#a855f7` | Purple — gradients, featured states |
| `--neon3` | `#06b6d4` | Cyan — counter gradients, accents |
| `--gold`  | `#f59e0b` | Amber — pricing, star ratings |
| `--grn`   | `#10b981` | Emerald — success, eco badges |
| `--rose`  | `#f43f5e` | Rose — error states, emergency |
| `--ink`   | `#0a0a12` | Primary background |
| `--ink2`  | `#12121e` | Section alternates |
| `--ink3`  | `#1a1a2e` | Card accents |

### Typography
- **Space Grotesk** — headings, logos, prices (bold geometric)
- **Inter** — body, labels, UI elements (clean modern)

---

## ✨ Unique JavaScript Features

### Canvas Particle Network
```javascript
// 90 animated particles with:
// - Brownian motion physics
// - Proximity-based connection lines (opacity fades with distance)
// - Mouse repel effect (particles avoid cursor)
// - Colour-coded particles: violet, purple, cyan, emerald
```

### Live Fare Calculator
- Distance slider (1–100 km)
- Passenger slider (1–7)
- Vehicle class dropdown (5 rates)
- Real-time updates: base fare + distance charge + 5% GST = total
- Smooth number transitions

### Fleet Filter System
- JavaScript dynamic card rendering from `FLEET_DATA` array
- 5 categories: All / Sedan / SUV / Electric / Ultra Premium
- Animated card re-render with staggered delays
- Click-to-book transfers to booking form

### Scroll Reveal System
- `IntersectionObserver` — efficient, performant
- Three animation directions: up, left, right
- Staggered delays via CSS `transition-delay`

### Booking Flow
- 5 vehicle options with selectable highlight
- 6 payment methods with toggle selection
- Promo code validator (`LUXRIDE10`, `WELCOME20`, `AIRPORT15`)
- Live summary sidebar updates on every selection
- Form validation with field-specific error messages
- Success state with reset option

### Animated Counters
- `IntersectionObserver` triggers on scroll
- Supports integers, decimals, and suffix strings
- 2-second smooth animation with `setInterval`

---

## 🔑 Active Promo Codes
| Code | Discount |
|---|---|
| `LUXRIDE10` | 10% off any booking |
| `WELCOME20` | 20% off (new users) |
| `AIRPORT15` | 15% off airport transfers |

---

## 🔗 CDN Dependencies (no npm needed)
```html
Bootstrap 5.3.2  — grid, utilities
Font Awesome 6.5.0 — icons
Google Fonts: Space Grotesk, Inter
```

**No build step. No npm. No frameworks.**  
Open `index.html` in any modern browser.

---

## 🚀 Deploy Anywhere
- **Netlify** — drag & drop the folder
- **Vercel** — `vercel deploy`
- **GitHub Pages** — push to `gh-pages`
- **cPanel** — upload to `public_html/`

---

## 🆚 How This Differs From the Other Two Themes

| Feature | Dark Gold (v1) | Light Cream (v2) | Animated Neon (v3) |
|---|---|---|---|
| Background | Black + gold | Warm cream | Deep space + particles |
| Accent | Gold / #C9A84C | Terracotta / #C4622D | Violet neon / #6c63ff |
| Typography | Cormorant + Outfit | Playfair + DM Sans | Space Grotesk + Inter |
| Hero | Fullscreen image | Split panel clip-path | Canvas particle network |
| Card hover | Gold border reveal | Terra bottom stripe | Neon border + glow |
| Animations | AOS + CSS | AOS + CSS floats | Custom IntersectionObserver + Canvas |
| Fare Calc | ❌ | ❌ | ✅ Real-time sliders |
| Mouse effect | ❌ | ❌ | ✅ Particle repel |
| Fleet filter | JS toggle | JS toggle | JS dynamic render |
| Feel | Opulent editorial | Magazine luxury | Futuristic tech |

---

*Designed with ♥ — Particle canvas, neon glow, cinematic dark aesthetic.*
