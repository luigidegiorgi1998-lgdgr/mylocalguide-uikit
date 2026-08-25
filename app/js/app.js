// MyLocalGuide — shared prototype behavior (no framework, no build step)

// Bottom nav items that don't have a real destination yet just no-op quietly
document.querySelectorAll('[data-noop]').forEach((el) => {
  el.addEventListener('click', (e) => e.preventDefault());
});

// Password visibility toggles (Login, Registration)
document.querySelectorAll('[data-toggle-password]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const input = document.querySelector(btn.getAttribute('data-toggle-password'));
    if (!input) return;
    input.type = input.type === 'password' ? 'text' : 'password';
  });
});

// Subscription tier radio cards (Registration)
document.querySelectorAll('[data-tier]').forEach((card) => {
  card.addEventListener('click', () => {
    document.querySelectorAll('[data-tier]').forEach((c) => {
      c.classList.remove('border-black', 'bg-[rgba(249,249,249,0.6)]');
      c.classList.add('border-[rgba(209,209,214,0.5)]', 'bg-[rgba(255,255,255,0.4)]');
      const dot = c.querySelector('[data-tier-dot]');
      if (dot) dot.classList.remove('bg-black', 'border-black');
      if (dot) dot.classList.add('border-2', 'border-[#d1d1d6]');
    });
    card.classList.add('border-black', 'bg-[rgba(249,249,249,0.6)]');
    card.classList.remove('border-[rgba(209,209,214,0.5)]', 'bg-[rgba(255,255,255,0.4)]');
    const dot = card.querySelector('[data-tier-dot]');
    if (dot) {
      dot.classList.add('bg-black', 'border-black');
      dot.classList.remove('border-2', 'border-[#d1d1d6]');
    }
  });
});

// Reservation summary accordion (Booking confirmation)
const summaryToggle = document.querySelector('[data-summary-toggle]');
if (summaryToggle) {
  summaryToggle.addEventListener('click', () => {
    const panel = document.querySelector('[data-summary-panel]');
    const chevron = summaryToggle.querySelector('[data-summary-chevron]');
    if (!panel) return;
    const isOpen = panel.classList.toggle('hidden') === false;
    if (chevron) chevron.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
  });
}

// Chat composer: append the typed message as an outgoing bubble
const chatForm = document.querySelector('[data-chat-form]');
if (chatForm) {
  const input = chatForm.querySelector('input');
  const thread = document.querySelector('[data-chat-thread]');
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text || !thread) return;

    const wrap = document.createElement('div');
    wrap.className = 'flex flex-col items-end w-full pt-2';
    wrap.innerHTML = `
      <div class="flex items-start max-w-[331.5px]">
        <div class="bg-black shadow-sm flex flex-col items-start pl-4 pr-6 py-4 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-sm">
          <p class="text-[15px] text-white leading-5">${text.replace(/</g, '&lt;')}</p>
        </div>
      </div>
      <div class="text-[11px] font-semibold text-[#8e8e93] pt-1">Just now</div>
    `;
    thread.appendChild(wrap);
    input.value = '';
    thread.scrollTop = thread.scrollHeight;
  });
}

// Back buttons that should just go to the previous screen in history
document.querySelectorAll('[data-back]').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (window.history.length > 1) window.history.back();
    else window.location.href = btn.getAttribute('data-back') || 'explore.html';
  });
});
