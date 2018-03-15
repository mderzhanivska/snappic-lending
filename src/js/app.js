// switching the examples in section examples

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


