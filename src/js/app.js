
$('.radio-js').change((e) => {
  const dom = e.target;
  const parent = dom.closest('.custom');
  parent.classList[dom.classList.contains('black') ? 'add' : 'remove']('black');
});
