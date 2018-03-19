// switching the examples in section examples
import 'slick-carousel';
import config from './config';
import GridSlider from './lib/GridSlider';

(function() {

  const gridSlider = new GridSlider('layout', 'lay_control', config.sliders);


  // Create slider grid
  gridSlider.create();


  $('.radio-js').change((e) => {
    const dom = e.target;
    const parent = dom.closest('.custom');
    parent.classList[dom.classList.contains('black') ? 'add' : 'remove']('black');
  });


  //scroll down button for more examples
  $('.scroll-down').click(function() {
    $('html, body').animate({ scrollTop: $('section.examples').offset().top }, 'slow');
    return false;
  });
})();


// menu
(function() {
  let overlay = $('.js-overlay'), burger = $('.js-burger');
  burger.on('click tocuhstart', function(e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.js-nav').slideToggle();
    overlay.toggleClass('visible');
  });
  overlay.on('click tocuhstart', function(e) {
    burger.trigger('click');
  });
}());

$('.slider-js').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true
  // nextArrow: '<img src="img/arrow-right.png>',
  // prevArrow: '<img src="img/arrow-right.png>'
});



