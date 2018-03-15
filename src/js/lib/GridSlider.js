const defaultBigWidth = 33.3333;

const templateBtn = (key, i) => {
  const className = `layout-control__btn btn-${i + (i !== 0 || ' active')}`;
  return `<button class="${className}" data-layout=${key}></button>`;
};


class GridSlider {
  /**
   * @constructor
   * @param {string} layout: id layout
   * @param {string} btnLayout: id parent buttons
   * @param {array} sliders: ojects
   *   {string} key: key for type
   *   {number} bigWidth: width size big picture in percent, default: 33.33
   *   {array} order: position image: 0 - first row, 1 - second row, -1 - big picture all column
   * @param {number} delay: for changing animation grid slide
   */
  constructor(layout = '', btnLayout = '', sliders = [], delay = 250) {
    this.layout = document.getElementById(layout);
    this.btnLayout = document.getElementById(btnLayout);
    this.sliders = sliders;
    this._delay = delay;

    this._animateImages = this._animateImages.bind(this);
    this._generateImages = this._generateImages.bind(this);
    this._handleClickByBtnLayout = this._handleClickByBtnLayout.bind(this);
  }


  create() {
    if (!this.layout && !this.btnLayout && this.sliders.length === 0) {
      console.error('Didn\'t find layout, btn-layout or sliders is null');
      return;
    }

    // first active grid slider
    this._active = this.sliders[0].key;

    // Getting images from layout
    this.images = this.layout.querySelectorAll('.img');

    // Setting buttons from sliders
    this.btnLayout.innerHTML = this.sliders
      .map((btn, i) => templateBtn(btn.key, i)).join('');

    this._generateImages(true);
    window.addEventListener('resize', this._animateImages, false);
    this.btnLayout.addEventListener('click', this._handleClickByBtnLayout, false);
  }


  _handleClickByBtnLayout(e) {
    if (e.target === e.currentTarget) return;

    const dom = e.target;
    const activeEl = dom.parentElement.querySelector('.active');

    if (activeEl === e.target) return;

    !activeEl || activeEl.classList.remove('active');
    dom.classList.add('active');
    layout.className = dom.dataset.layout;

    this._active = dom.dataset.layout;
    this._generateImages(this._active);
  }


  _generateImages(isFirst = false) {
    for (let i = 0; i < this.images.length; i++) {
      Object.assign(this.images[i].style, {
        top: 0,
        left: 0
      });
    }

    setTimeout(this._animateImages, isFirst ? this._delay : 0);
  }


  _animateImages(isAnimate = true) {
    const slider = this.sliders.find(s => s.key === this._active);
    const order = this.sliders.find(s => s.key === this._active).order;

    const maxWidth = this.layout.clientWidth;
    const maxHeight = Math.max(...order) + 1;
    const bigSize = slider.bigWidth || defaultBigWidth;
    const rowSize = order.reduce((p, n) => { n || ++p; return p; }, 0);
    const widthSize = (order.find(o => o === -1) ? 100 - bigSize : 100) / rowSize;
    const heightRow = maxWidth / 100 * widthSize;

    for (let i = 0; i < this.images.length; i++) {
      const style = this.images[i].style;

      if (order.length <= i) {
        style.opacity = 0;
        style.visibility = 'hidden';
        continue;
      }


      style.opacity = 1;
      style.visibility = 'visible';
      style.zIndex = order.length - i;

      if (typeof(isAnimate) === 'boolean' && isAnimate) {
        this._getPositions(style, order, widthSize, heightRow, bigSize, i);
      }

      if (order[i] === -1) {
        style.width = `${bigSize}%`;
        style.height = '100%';
      } else {
        style.width = `${widthSize}%`;
        style.height = `${maxWidth / 100 * widthSize}px`;
      }
    }

    layout.style.height = `${heightRow * maxHeight}px`;
  }


  _getPositions(style, order, widthSize, heightRow, bigSize, i) {

    const top = order[i] !== -1 ? heightRow * order[i] : 0;
    const left = order.filter((_, index) => index < i).reduce((p, n) => {
      if (n === order[i] || (order[i] === -1 && n === 0)) {
        p += widthSize;
      } else if (n === -1) {
        p += bigSize;
      }
      return p;
    }, 0);

    style.top = `${top}px`;
    style.left = `${left}%`;
  }
}


export default GridSlider;
