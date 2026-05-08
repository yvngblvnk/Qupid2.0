/* ═══════════════════════════════════════
   Qupid — app.js
   Shared logic used across all pages
═══════════════════════════════════════ */

/**
 * navigate(url)
 * Fades the curtain in, then redirects.
 * The curtain fades back out automatically on the next page load
 * via the curtainOut animation in shared.css.
 */
function navigate(url) {
  const curtain = document.getElementById('curtain');
  curtain.style.animation    = 'curtainIn 0.35s ease forwards';
  curtain.style.pointerEvents = 'all';
  setTimeout(() => { window.location.href = url; }, 370);
}