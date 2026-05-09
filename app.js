/* ═══════════════════════════════════════
   QUPID — app.js
   Shared logic across all pages
═══════════════════════════════════════ */

/* ── PAGE TRANSITION ── */
function navigate(url) {
  const curtain = document.getElementById('curtain');
  curtain.style.animation     = 'curtainIn 0.35s ease forwards';
  curtain.style.pointerEvents = 'all';
  setTimeout(() => { window.location.href = url; }, 370);
}

/* ── DARK MODE ── */
function initTheme() {
  const saved = localStorage.getItem('qupid_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  applyTheme(theme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('qupid_theme', theme);
  const icon = document.getElementById('theme-icon');
  if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  // Update PWA theme-color meta tag
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = theme === 'dark' ? '#16130F' : '#FAF7F2';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

/* ── FULLSCREEN ── */
function initFullscreen() {
  updateFsIcon();
  document.addEventListener('fullscreenchange',       updateFsIcon);
  document.addEventListener('webkitfullscreenchange', updateFsIcon);
}

function updateFsIcon() {
  const icon = document.getElementById('fs-icon');
  if (!icon) return;
  const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
  icon.textContent = isFs ? '⊡' : '⛶';
}

function toggleFullscreen() {
  const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
  if (isFs) {
    (document.exitFullscreen || document.webkitExitFullscreen || (() => {})).call(document);
  } else {
    const el = document.documentElement;
    const req = el.requestFullscreen || el.webkitRequestFullscreen;
    if (req) req.call(el).catch(() => {});
  }
}

/* ── CHIME (replaces vibration) ── */
function playChime() {
  try {
    const ctx   = new (window.AudioContext || window.webkitAudioContext)();
    // Three descending notes: C5 → G4 → E4
    const notes = [523.25, 392.00, 329.63];

    notes.forEach((freq, i) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const t = ctx.currentTime + i * 0.28;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.28, t + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.6);

      osc.start(t);
      osc.stop(t + 1.6);
    });
  } catch (e) {
    // Audio context unavailable — fail silently
  }
}

/* ── AUTO-INIT on every page ── */
(function () {
  initTheme();
  document.addEventListener('DOMContentLoaded', initFullscreen);
})();
