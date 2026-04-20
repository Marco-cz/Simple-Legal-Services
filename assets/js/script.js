// Cookie banner dismiss
function dismissCookies() {
  const banner = document.getElementById('cookieBanner');
  if (banner) banner.classList.add('hidden');
  try { localStorage.setItem('sls_cookies_ok', '1'); } catch (e) {}
}

// Hide banner if previously accepted
document.addEventListener('DOMContentLoaded', () => {
  try {
    if (localStorage.getItem('sls_cookies_ok') === '1') {
      document.getElementById('cookieBanner')?.classList.add('hidden');
    }
  } catch (e) {}

  // Mobile nav toggle
  const burger = document.getElementById('hamburger');
  const links = document.querySelector('.nav-links');
  burger?.addEventListener('click', () => links?.classList.toggle('open'));

  // Close mobile nav on link click
  document.querySelectorAll('.nav-links a').forEach(a =>
    a.addEventListener('click', () => links?.classList.remove('open'))
  );

  // ---------- ROI Calculator ----------
  const roi = {
    spend:   document.getElementById('roi-spend'),
    matters: document.getElementById('roi-matters'),
    team:    document.getElementById('roi-team'),
    hours:   document.getElementById('roi-hours'),
  };

  if (roi.spend && roi.matters && roi.team && roi.hours) {
    const out = {
      spend:     document.getElementById('roi-spend-out'),
      matters:   document.getElementById('roi-matters-out'),
      team:      document.getElementById('roi-team-out'),
      hours:     document.getElementById('roi-hours-out'),
      total:     document.getElementById('roi-total'),
      spendSave: document.getElementById('roi-spend-save'),
      hoursSave: document.getElementById('roi-hours-save'),
      prodSave:  document.getElementById('roi-prod-save'),
      payback:   document.getElementById('roi-payback'),
    };

    const fmtMoney = n =>
      n >= 1_000_000
        ? '$' + (n / 1_000_000).toFixed(n >= 10_000_000 ? 1 : 2) + 'M'
        : '$' + Math.round(n).toLocaleString('en-US');
    const fmtNum = n => Number(n).toLocaleString('en-US');

    function recalc() {
      const spend   = +roi.spend.value;     // $
      const matters = +roi.matters.value;
      const team    = +roi.team.value;
      const hours   = +roi.hours.value;     // hrs/week on invoice review

      // Live labels
      out.spend.textContent   = fmtMoney(spend);
      out.matters.textContent = fmtNum(matters);
      out.team.textContent    = fmtNum(team);
      out.hours.textContent   = hours + ' hrs';

      // Assumptions (industry benchmarks)
      const SPEND_REDUCTION   = 0.12;   // 12% savings on outside-counsel spend
      const HOURS_AUTOMATED   = 0.65;   // 65% of invoice-review hours automated
      const BLENDED_RATE      = 95;     // $/hr internal blended rate
      const WEEKS_PER_YEAR    = 48;
      const MATTER_EFFICIENCY = 35;     // $ saved per matter via workflow automation
      const PLATFORM_COST     = 24000 + team * 1500; // rough annual platform cost

      const spendSavings = spend * SPEND_REDUCTION;
      const hoursSaved   = hours * HOURS_AUTOMATED * WEEKS_PER_YEAR;
      const prodSavings  = hoursSaved * BLENDED_RATE;
      const matterSavings = matters * MATTER_EFFICIENCY;
      const totalSavings = spendSavings + prodSavings + matterSavings;

      const payback = totalSavings > 0
        ? Math.max(1, Math.round((PLATFORM_COST / totalSavings) * 12))
        : null;

      out.total.textContent     = fmtMoney(totalSavings);
      out.spendSave.textContent = fmtMoney(spendSavings);
      out.hoursSave.textContent = fmtNum(Math.round(hoursSaved)) + ' hrs';
      out.prodSave.textContent  = fmtMoney(prodSavings);
      out.payback.textContent   = payback ? `${payback} months` : '— months';
    }

    Object.values(roi).forEach(input =>
      input.addEventListener('input', recalc)
    );
    recalc();
  }
});
