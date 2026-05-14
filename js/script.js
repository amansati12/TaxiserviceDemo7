/* ============================================================
   LUXRIDE ANIMATED — script.js
   Canvas Particles · Scroll Reveals · Counters · All Interactions
   ============================================================ */

/* ── Helpers ── */
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

/* ══════════════════════════════════════════
   PAGE LOADER
══════════════════════════════════════════ */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = $('pageLoader');
    if (loader) loader.classList.add('hidden');
  }, 1800);
});

/* ══════════════════════════════════════════
   CANVAS PARTICLE NETWORK
══════════════════════════════════════════ */
function initCanvas() {
  const canvas = $('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, pts = [];

  const COLORS = ['108,99,255', '168,85,247', '6,182,212', '16,185,129'];
  const COUNT  = window.innerWidth < 700 ? 50 : 90;
  const LINK_DIST = 130;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); pts = mkPts(); });

  function mkPt() {
    return {
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r:  Math.random() * 1.8 + 0.5,
      a:  Math.random() * 0.7 + 0.2,
      c:  COLORS[Math.floor(Math.random() * COLORS.length)]
    };
  }
  function mkPts() { return Array.from({ length: COUNT }, mkPt); }
  pts = mkPts();

  let mouseX = -9999, mouseY = -9999;
  window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

  function draw() {
    ctx.clearRect(0, 0, W, H);

    pts.forEach(p => {
      /* move */
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

      /* mouse repel */
      const dx = p.x - mouseX, dy = p.y - mouseY;
      const md = Math.sqrt(dx * dx + dy * dy);
      if (md < 100) { p.x += dx * 0.025; p.y += dy * 0.025; }

      /* draw dot */
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.c},${p.a * 0.65})`;
      ctx.fill();
    });

    /* draw connections */
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j];
        const d = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
        if (d < LINK_DIST) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(108,99,255,${0.18 * (1 - d / LINK_DIST)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }
  draw();
}
initCanvas();

/* ══════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════ */
(function initNav() {
  const nav = $('mainNav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* Active link */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  $$('.nav-link').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  /* Hamburger */
  const ham = $('hamburger');
  const navLinks = $('navLinks');
  if (ham && navLinks) {
    ham.addEventListener('click', () => {
      const open = navLinks.classList.toggle('mobile-open');
      ham.classList.toggle('open', open);
    });
  }
})();

/* ══════════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════════ */
(function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  $$('.reveal, .reveal-left, .reveal-right').forEach(el => io.observe(el));
})();

/* ══════════════════════════════════════════
   ANIMATED COUNTERS
══════════════════════════════════════════ */
(function initCounters() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = parseFloat(el.dataset.count);
      const isDec  = el.dataset.decimal === 'true';
      const suffix = el.dataset.suffix || '';
      const dur    = 2000;
      const step   = target / (dur / 16);
      let cur = 0;
      const timer = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = (isDec ? cur.toFixed(1) : Math.floor(cur).toLocaleString()) + suffix;
        if (cur >= target) clearInterval(timer);
      }, 16);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });

  $$('[data-count]').forEach(el => io.observe(el));
})();

/* ══════════════════════════════════════════
   BACK TO TOP
══════════════════════════════════════════ */
(function initBTT() {
  const btn = $('btt');
  if (!btn) return;
  window.addEventListener('scroll', () =>
    btn.classList.toggle('visible', window.scrollY > 400), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ══════════════════════════════════════════
   NOTIFICATION TOAST
══════════════════════════════════════════ */
function showNotif(msg, isErr = false) {
  let notif = $('notif');
  if (!notif) {
    notif = document.createElement('div');
    notif.id = 'notif';
    notif.className = 'notif';
    document.body.appendChild(notif);
  }
  notif.textContent = msg;
  notif.className = 'notif' + (isErr ? ' err' : '') + ' show';
  clearTimeout(notif._timer);
  notif._timer = setTimeout(() => notif.classList.remove('show'), 3500);
}
window.showNotif = showNotif;

/* ══════════════════════════════════════════
   FAQ ACCORDION
══════════════════════════════════════════ */
(function initFAQ() {
  $$('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item   = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      $$('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
})();

/* ══════════════════════════════════════════
   TICKER
══════════════════════════════════════════ */
function initTicker(containerId) {
  const wrap = $(containerId);
  if (!wrap) return;
  const items = [
    '✈️ Airport Transfers','⭐ 4.9 Star Rating','🏆 Best Taxi 2024',
    '🔒 Verified Drivers','💎 Fixed Pricing','🌿 Eco-Electric Fleet',
    '🤝 Corporate Accounts','🎊 Wedding Cars','🌍 25+ Cities',
    '⚡ Tesla Model S','🛡️ 24/7 Support','💼 Monthly Billing'
  ];
  const full = [...items, ...items];
  wrap.innerHTML = full.map(t =>
    `<span class="ticker-item"><span class="dot">✦</span>${t}</span>`
  ).join('');
}

/* ══════════════════════════════════════════
   FLEET RENDERER + FILTER
══════════════════════════════════════════ */
const FLEET_DATA = [
  { cat:'premium', badge:'Ultra Premium', name:'S-Class',   make:'Mercedes-Benz', icon:'🚙', specs:['4 pax','3 bags','Wi-Fi','AC'],       price:'₹4,500', rate:4500 },
  { cat:'premium', badge:'Premium',       name:'7 Series',  make:'BMW',           icon:'🚙', specs:['4 pax','3 bags','Wi-Fi','AC'],       price:'₹4,200', rate:4200 },
  { cat:'electric',badge:'Electric',      name:'Model S',   make:'Tesla',         icon:'⚡', specs:['5 pax','EV','Wi-Fi','Autopilot'],   price:'₹3,800', rate:3800 },
  { cat:'electric',badge:'Electric',      name:'Model 3',   make:'Tesla',         icon:'⚡', specs:['4 pax','EV','Autopilot','USB-C'],   price:'₹2,800', rate:2800 },
  { cat:'sedan',   badge:'Business',      name:'Camry',     make:'Toyota',        icon:'🚗', specs:['4 pax','Hybrid','AC','USB'],        price:'₹2,200', rate:2200 },
  { cat:'sedan',   badge:'Business',      name:'5 Series',  make:'BMW',           icon:'🚗', specs:['4 pax','Wi-Fi','AC','Leather'],     price:'₹3,000', rate:3000 },
  { cat:'suv',     badge:'SUV',           name:'X7 SUV',    make:'BMW',           icon:'🚐', specs:['7 pax','6 bags','Wi-Fi','Screen'],  price:'₹5,500', rate:5500 },
  { cat:'suv',     badge:'SUV',           name:'GLS 400',   make:'Mercedes',      icon:'🚐', specs:['7 pax','6 bags','Wi-Fi','Bar'],     price:'₹6,200', rate:6200 },
  { cat:'suv',     badge:'SUV',           name:'Fortuner',  make:'Toyota',        icon:'🚐', specs:['7 pax','4WD','AC','USB'],           price:'₹3,200', rate:3200 },
  { cat:'premium', badge:'VIP',           name:'Phantom',   make:'Rolls-Royce',   icon:'👑', specs:['4 pax','Bar','Screen','NDA'],       price:'₹18,000',rate:18000 },
];

function renderFleet(gridId, filter = 'all') {
  const grid = $(gridId);
  if (!grid) return;
  const data = filter === 'all' ? FLEET_DATA : FLEET_DATA.filter(f => f.cat === filter);
  grid.style.animation = 'none';
  grid.innerHTML = data.map((f, i) => `
    <div class="fleet-card reveal" style="transition-delay:${i * 0.06}s" data-category="${f.cat}">
      <div class="fleet-thumb">
        <span class="fleet-badge">${f.badge}</span>
        <span style="font-size:4.5rem">${f.icon}</span>
      </div>
      <div class="fleet-body">
        <div class="fleet-make">${f.make}</div>
        <div class="fleet-name">${f.name}</div>
        <div class="fleet-specs">${f.specs.map(s => `<span class="spec-tag">${s}</span>`).join('')}</div>
        <div class="fleet-foot">
          <span class="fleet-price">${f.price}<small>/trip</small></span>
          <button class="btn-primary" style="padding:.45rem 1rem;font-size:.74rem"
            onclick="selectFleetCar('${f.name}',${f.rate})">Book</button>
        </div>
      </div>
    </div>`).join('');

  /* re-observe new cards */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  grid.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

function selectFleetCar(name, rate) {
  const bookSec = document.getElementById('booking') || document.getElementById('bookSection');
  if (bookSec) bookSec.scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => {
    const opts = $$('.car-opt[data-name]');
    opts.forEach(o => o.classList.remove('sel'));
    const target = document.querySelector(`.car-opt[data-name="${name}"]`);
    if (target) { target.classList.add('sel'); updateBookSummary(); }
  }, 600);
  showNotif(`${name} selected — complete your booking below ✓`);
}
window.selectFleetCar = selectFleetCar;

function initFleetFilter(gridId) {
  renderFleet(gridId, 'all');
  $$('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('[data-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderFleet(gridId, btn.dataset.filter);
    });
  });
}
window.initFleetFilter = initFleetFilter;

/* ══════════════════════════════════════════
   FARE CALCULATOR
══════════════════════════════════════════ */
function initFareCalc() {
  const distRange = $('distRange');
  const paxRange  = $('paxRange');
  const vehClass  = $('vehClass');
  if (!distRange) return;

  function update() {
    const dist = +distRange.value;
    const rate = +vehClass.value;
    if ($('distVal')) $('distVal').textContent = dist + ' km';
    if ($('paxVal'))  $('paxVal').textContent  = (+paxRange?.value || 2) + ' pax';

    const base      = Math.round(80 * 85);  // ₹80 base × ~85 approx
    const distChg   = Math.round(dist * rate * 85);
    const sub       = base + distChg;
    const gst       = Math.round(sub * 0.05);
    const total     = sub + gst;

    if ($('fareResult')) $('fareResult').textContent = '₹' + total.toLocaleString();
    if ($('rBase'))      $('rBase').textContent      = '₹' + base.toLocaleString();
    if ($('rDist'))      $('rDist').textContent      = '₹' + distChg.toLocaleString();
    if ($('rGst'))       $('rGst').textContent       = '₹' + gst.toLocaleString();
    if ($('rTotal'))     $('rTotal').textContent     = '₹' + total.toLocaleString();
  }

  distRange.addEventListener('input', update);
  paxRange?.addEventListener('input', update);
  vehClass?.addEventListener('change', update);
  update();
}
window.initFareCalc = initFareCalc;

/* ══════════════════════════════════════════
   BOOKING FORM
══════════════════════════════════════════ */
const BOOKING_CARS = [
  { name:'Economy',    desc:'4 pax · 2 bags · AC · USB',          icon:'🚗', rate:1800 },
  { name:'Business',   desc:'4 pax · Wi-Fi · Water · Leather',     icon:'🚙', rate:3200, sel:true },
  { name:'SUV',        desc:'7 pax · 6 bags · Wi-Fi · Screen',     icon:'🚐', rate:4800 },
  { name:'Electric',   desc:'5 pax · Zero emissions · Wi-Fi',      icon:'⚡', rate:3600 },
  { name:'VIP Limo',   desc:'6 pax · Bar · Privacy screen · NDA',  icon:'👑', rate:8500 },
];

function renderCarOpts(containerId) {
  const c = $(containerId);
  if (!c) return;
  c.innerHTML = BOOKING_CARS.map(car => `
    <div class="car-opt${car.sel ? ' sel' : ''}" data-name="${car.name}" data-rate="${car.rate}"
      onclick="selCar(this)">
      <span class="car-opt-ico">${car.icon}</span>
      <div>
        <div class="car-opt-name">${car.name}</div>
        <div class="car-opt-desc">${car.desc}</div>
      </div>
      <span class="car-opt-price">₹${car.rate.toLocaleString()}</span>
    </div>`).join('');
}

function selCar(el) {
  $$('.car-opt').forEach(o => o.classList.remove('sel'));
  el.classList.add('sel');
  updateBookSummary();
}
window.selCar = selCar;

function selPay(el) {
  $$('.pay-opt').forEach(o => o.classList.remove('sel'));
  el.classList.add('sel');
}
window.selPay = selPay;

let discountPct = 0;

function updateBookSummary() {
  const sel = document.querySelector('.car-opt.sel');
  if (!sel) return;
  const rate = +sel.dataset.rate;
  const name = sel.dataset.name;
  const gst  = Math.round(rate * 0.05);
  const disc = Math.round(rate * discountPct / 100);
  const total = rate + gst - disc;
  if ($('sBVeh'))  $('sBVeh').textContent  = name;
  if ($('sBBase')) $('sBBase').textContent = '₹' + rate.toLocaleString();
  if ($('sBGst'))  $('sBGst').textContent  = '₹' + gst.toLocaleString();
  if ($('sBDisc')) $('sBDisc').textContent = disc > 0 ? '-₹' + disc.toLocaleString() : '—';
  if ($('sBTotal'))$('sBTotal').textContent= '₹' + total.toLocaleString();
}
window.updateBookSummary = updateBookSummary;

function applyPromo() {
  const code = ($('bPromo') || $('promoCode'))?.value?.trim().toUpperCase();
  const msg  = $('promoMsg');
  if (!msg) return;
  const CODES = { LUXRIDE10: 10, WELCOME20: 20, AIRPORT15: 15 };
  if (CODES[code]) {
    discountPct = CODES[code];
    msg.innerHTML = `<span style="color:var(--grn)">✓ ${CODES[code]}% discount applied!</span>`;
    updateBookSummary();
    showNotif(`Promo ${code} applied — ${CODES[code]}% off! 🎉`);
  } else {
    discountPct = 0;
    msg.innerHTML = `<span style="color:var(--rose)">✗ Invalid code. Try: LUXRIDE10</span>`;
    updateBookSummary();
  }
}
window.applyPromo = applyPromo;

function confirmBook() {
  const required = [
    [$('bPickup'), 'Pickup location'],
    [$('bDrop'),   'Destination'],
    [$('bDate'),   'Date'],
    [$('bName'),   'Your name'],
    [$('bPhone'),  'Phone number'],
  ];
  for (const [el, label] of required) {
    if (!el) continue;
    if (!el.value.trim()) { showNotif(`Please enter ${label}`, true); el.focus(); return; }
  }
  const btn = document.querySelector('.btn-confirm');
  if (btn) { btn.textContent = 'Processing…'; btn.disabled = true; }

  setTimeout(() => {
    const content = $('bookingContent');
    const success = $('successMsg');
    if (content) content.style.display = 'none';
    if (success) success.style.display = 'block';
    showNotif('🎉 Booking confirmed! SMS sent to your number.');
  }, 2200);
}
window.confirmBook = confirmBook;

function resetBook() {
  const content = $('bookingContent');
  const success = $('successMsg');
  if (content) content.style.display = '';
  if (success) success.style.display = 'none';
  const btn = document.querySelector('.btn-confirm');
  if (btn) { btn.textContent = 'Confirm & Book Ride →'; btn.disabled = false; btn.style.background = ''; }
  ['bPickup','bDrop','bName','bPhone','bPromo','promoCode'].forEach(id => { const el=$(id); if (el) el.value=''; });
  if ($('promoMsg')) $('promoMsg').innerHTML = '';
  discountPct = 0;
  updateBookSummary();
}
window.resetBook = resetBook;

/* Quick booking hero → transfer to main form */
function quickBook() {
  const p  = $('qPickup')?.value?.trim();
  const d  = $('qDrop')?.value?.trim();
  const dt = $('qDate')?.value;
  const tm = $('qTime')?.value;
  if (!p || !d || !dt) { showNotif('Please fill pickup, destination and date', true); return; }
  const target = $('booking') || document.querySelector('#bookSection');
  if (target) target.scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => {
    if ($('bPickup')) $('bPickup').value = p;
    if ($('bDrop'))   $('bDrop').value   = d;
    if ($('bDate'))   $('bDate').value   = dt;
    if ($('bTime'))   $('bTime').value   = tm || '10:00';
  }, 600);
  showNotif('Details transferred to booking form ✓');
}
window.quickBook = quickBook;

/* ══════════════════════════════════════════
   NEWSLETTER
══════════════════════════════════════════ */
function subNewsletter(inputId) {
  const inp = $(inputId || 'nlEmail');
  if (!inp) return;
  if (!inp.value.trim() || !inp.value.includes('@')) {
    showNotif('Please enter a valid email address', true); return;
  }
  const val = inp.value;
  inp.value = '';
  inp.placeholder = 'Thank you! ✓';
  setTimeout(() => { inp.placeholder = 'Your email address'; }, 3500);
  showNotif(`Subscribed with ${val} ✓ Welcome to LuxRide!`);
}
window.subNewsletter = subNewsletter;

/* ══════════════════════════════════════════
   CONTACT FORM
══════════════════════════════════════════ */
function submitContact(e) {
  if (e) e.preventDefault();
  const btn = document.querySelector('#contactForm [type=submit]');
  if (btn) { btn.textContent = 'Sending…'; btn.disabled = true; }
  setTimeout(() => {
    if (btn) {
      btn.textContent = '✓ Message Sent!';
      btn.style.background = 'linear-gradient(135deg,var(--grn),#059669)';
    }
    showNotif('Message sent! We\'ll respond within 4 hours.');
    setTimeout(() => {
      if (btn) { btn.textContent = 'Send Message →'; btn.disabled = false; btn.style.background = ''; }
      document.getElementById('contactForm')?.reset();
    }, 3500);
  }, 2000);
}
window.submitContact = submitContact;

/* ══════════════════════════════════════════
   DATE MIN = TODAY
══════════════════════════════════════════ */
const todayStr = new Date().toISOString().split('T')[0];
$$('input[type=date]').forEach(el => { el.min = todayStr; });

/* ══════════════════════════════════════════
   SMOOTH SCROLL FOR ANCHOR LINKS
══════════════════════════════════════════ */
$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ══════════════════════════════════════════
   INIT ON DOMCONTENTLOADED
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  /* Ticker */
  initTicker('ticker');

  /* Fleet (if present) */
  if ($('fleetGrid')) initFleetFilter('fleetGrid');

  /* Fare Calculator */
  initFareCalc();

  /* Car Options in booking */
  renderCarOpts('carOpts');
  updateBookSummary();

  /* Date fields min */
  $$('input[type=date]').forEach(el => { el.min = todayStr; });

  console.log('%c LUXRIDE ANIMATED ', 'background:#6c63ff;color:#fff;font-size:1rem;font-weight:700;padding:4px 12px;border-radius:6px;', '— Particle Dark Theme Loaded ✦');
});
