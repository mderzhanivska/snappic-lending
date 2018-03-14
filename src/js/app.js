
(function() {

  /**
	*	@param {array} order: position image: 0 - first row, 1 - second row, -1 - big picture all column 
	*/
  const config = {
    images: [
    	'img/ex1.png', 
    	'img/ex11.png', 
    	'img/ex3.png', 
    	'img/ex4.png', 
    	'img/ex5.png', 
    	'img/ex6.png',
    	'img/ex7.png',
    	'img/ex8.png',
    	'img/ex9.png',
    	'img/ex10.png'
    ],
    sliders: [{
      key: 'layout-1',
      order: [0, 0, 0, 0, 0]
    }, {
      key: 'layout-2',
      order: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1]
    }, {
      key: 'layout-3',
      order: [-1, 0, 0, 0, 1, 1, 1]
    }, {
      key: 'layout-4',
      order: [0, 0, 1, 1, -1, 0, 0, 1, 1]
    }]
  };


  $('.radio-js').change((e) => {
    const dom = e.target;
    const parent = dom.closest('.custom');
    parent.classList[dom.classList.contains('black') ? 'add' : 'remove']('black');
  });

  const layout = document.getElementById('layout');
  const btnLayout = document.getElementById('lay_control');

  if (btnLayout && layout) {
  	btnLayout.innerHTML = config.sliders.map((btn, i) => 
  		`<button class="layout-control__btn btn-${i + (i !== 0 || ' active')}" data-layout=${btn.key}></button>`
  	).join('');
    layout.innerHTML = config.images.map(img => 
    	`<div class="img"><img src=${img} alt=""></div>`
    ).join('');

    !config.sliders.length || generateImages(config.sliders[0].key);
    btnLayout.addEventListener('click', callback, false);
  }


  function callback(e) {
    if (e.target === e.currentTarget) return;

    const dom = e.target;
    const activeEl = dom.parentElement.querySelector('.active');

    if (activeEl === e.target) return;

    !activeEl || activeEl.classList.remove('active');
    dom.classList.add('active');
    layout.className = dom.dataset.layout;

    generateImages(dom.dataset.layout);
  }


  function generateImages(key) {
  	const bigSize = 33.3333;

  	const images = layout.querySelectorAll('.img');
  	const order = config.sliders.find(s => s.key === key).order;
  	
  	const maxWidth = layout.clientWidth;
  	const maxHeight = Math.max(...order) + 1;
  	const rowSize = order.reduce((p, n) => { n || ++p; return p; }, 0);
  	const widthSize = (order.find(o => o === -1) ? 100 - bigSize : 100) / rowSize;
  	const heightRow = maxWidth / 100 * widthSize;

    for (let i = 0; i < images.length; i++) {
      images[i].style.top = 0;
      images[i].style.left = 0;
    }

  	setTimeout(() => {
  		for (let i = 0; i < images.length; i++) {
	    	const style = images[i].style;

        if (order.length <= i) {
	    		style.opacity = 0;
	    		style.visibility = 'hidden';
	    		continue;
	    	}

	    	const left = order.filter((_, index) => index < i).reduce((p, n) => {
	    		if (n === order[i] || (order[i] === -1 && n === 0)) {
	    			p += widthSize;
	    		} else if (n === -1) {
	    			p += bigSize;
	    		}
	    		return p;
	    	}, 0);

	    	style.zIndex = order.length - i;
    		style.opacity = 1;
	  		style.position = 'absolute';
	  		style.visibility = 'visible';
	      style.top = `${order[i] !== -1 ? heightRow * order[i] : 0}px`;
	      style.left = `${left}%`;

	    	if (order[i] === -1) {
	    		style.width = `${bigSize}%`;
	    		style.height = '100%';
	    	} else {
	    		style.width = `${widthSize}%`;
	    		style.height = `${maxWidth / 100 * widthSize}px`;
	    	}
	    }

	    layout.style.height = `${heightRow * maxHeight}px`;
  	}, 250);
  }
})();








