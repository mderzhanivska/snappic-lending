import 'slick-carousel';

$('.slider-js').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  nextArrow: '<span class="arrow-prev"><img src="img/page-1.png" alt=""></span>',
  prevArrow: '<span class="arrow-next"><img src="img/page-2.png" alt=""></span>'
});


$('.radio-js').change((e) => {
  const dom = e.target;
  const parent = dom.closest('.custom');
  parent.classList[dom.classList.contains('black') ? 'add' : 'remove']('black');
});
