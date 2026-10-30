(() => {
  const image = document.getElementById('twin-motion');
  const button = document.querySelector('.motion-toggle');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let playing = false;
  function setPlaying(value) {
    playing = value;
    image.src = playing ? 'assets/digital-twin-loop.gif' : 'assets/digital-twin-poster.png';
    button.textContent = playing ? 'Pause background' : 'Play background';
    button.setAttribute('aria-pressed', String(playing));
  }
  button.addEventListener('click', () => setPlaying(!playing));
  reduced.addEventListener('change', () => setPlaying(!reduced.matches));
  setPlaying(!reduced.matches);
})();
