import 'slick-carousel';

$('.slider').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  nextArrow: '<span class="arrow1"><img src="img/page-1.png" alt=""></span>',
  prevArrow: '<span class="arrow2"><img src="img/page-2.png" alt=""></span>'
});


$('.hover__toggle input').change((e) => {
  const dom = e.target;
  const parent = dom.closest('.custom');
  parent.classList[dom.classList.contains('black') ? 'add' : 'remove']('black');
});
