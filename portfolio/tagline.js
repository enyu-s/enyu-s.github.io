(() => {
  const element = document.getElementById('portfolio-tagline');
  if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const slogans = [
    'Turning AI into meaningful products.',
    'Make Something People Want',
    "Do Things That Don't Scale",
    'AI for Everyone'
  ];
  let index = 0;
  let length = 0;
  let erasing = false;
  element.textContent = '';

  function type() {
    const slogan = slogans[index];
    length += erasing ? -1 : 1;
    element.textContent = slogan.slice(0, length);
    let delay = erasing ? 45 : 85;
    if (!erasing && length === slogan.length) {
      erasing = true;
      delay = 2000;
    } else if (erasing && length === 0) {
      erasing = false;
      index = (index + 1) % slogans.length;
      delay = 350;
    }
    setTimeout(type, delay);
  }
  setTimeout(type, 350);
})();
