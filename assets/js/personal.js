(() => {
  const navigation = document.querySelector('.greedy-nav');
  if (!navigation) return;
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'theme-toggle';
  const update = () => {
    const dark = document.documentElement.dataset.theme === 'dark';
    toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.innerHTML = dark ? '<i class="fas fa-sun" aria-hidden="true"></i>' : '<i class="far fa-sun" aria-hidden="true"></i>';
  };
  toggle.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('han-li-theme', next); } catch (_) {}
    update();
  });
  navigation.append(toggle);
  update();
})();
