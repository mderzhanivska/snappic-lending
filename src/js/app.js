
(function() {

  $('.radio-js').change((e) => {
    const dom = e.target;
    const parent = dom.closest('.custom');
    parent.classList[dom.classList.contains('black') ? 'add' : 'remove']('black');
  });

  const layout = document.getElementById('layout');
  const btnLayout = document.getElementById('lay_control');

  if (btnLayout) {
    btnLayout.addEventListener('click', callback, false);
  }

  function callback(e) {
    if (e.target === e.currentTarget) return;

    const dom = e.target;
    const activeEl = dom.parentElement.querySelector('.active');
    !activeEl || activeEl.classList.remove('active');

    dom.classList.add('active');
    layout.className = dom.dataset.layout;
  }

})();








