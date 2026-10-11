(function () {
  var preference = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  var frame = 0;
  var x = 0;
  var y = 0;

  function hide() {
    cancelAnimationFrame(frame);
    frame = 0;
    document.body.classList.remove('spotlight-active');
  }

  document.addEventListener('pointermove', function (event) {
    if (!preference.matches || event.pointerType !== 'mouse') return;
    x = event.clientX;
    y = event.clientY;
    if (frame) return;
    frame = requestAnimationFrame(function () {
      frame = 0;
      document.documentElement.style.setProperty('--spotlight-x', x + 'px');
      document.documentElement.style.setProperty('--spotlight-y', y + 'px');
      document.body.classList.add('spotlight-active');
    });
  });

  document.documentElement.addEventListener('pointerleave', hide);
  window.addEventListener('blur', hide);
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) hide();
  });
  preference.addEventListener('change', hide);
})();
