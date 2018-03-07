import 'slick-carousel';

$('.slider-js').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false
});


$('.radio-js').change((e) => {
  const dom = e.target;
  const parent = dom.closest('.custom');
  parent.classList[dom.classList.contains('black') ? 'add' : 'remove']('black');
});
