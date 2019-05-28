// Load application styles
import 'styles/index.css';

// ================================
// START YOUR APP HERE
// ================================

// @param { string } -- sliderClassName
// @param { string } -- arrowsClassName
// @param { string } -- dotsClassName
// @param { string } -- duration
function Carousel(sliderClassName, arrowsClassName, dotsClassName, duration = '.3s') {
  this.arrows = Array.from(document.querySelectorAll('.' + arrowsClassName));
  this.dots = Array.from(document.querySelector('.' + dotsClassName).children);
  this.slider = Array.from(document.querySelector('.' + sliderClassName).children);
  this.beforeNum = 0;
  this.state = false;
  this.buttonState = null;

  this.durationSet(duration);
  this.arrowClick();
  this.dotsClick();
}

Carousel.prototype.durationSet = function (duration) {
  document.getElementsByTagName("html")[0].style.setProperty('--duration', duration);
}

Carousel.prototype.arrowClick = function() {
  this.arrows.forEach(arrow => arrow.addEventListener('click', () => {
    if (this.state) return;
    this.state = true;
    this.buttonState = 'arrow';
    
    let currentIdx = arrow.classList.contains('prev') ? this.beforeNum - 1 : this.beforeNum + 1;
    
    if (currentIdx < 0) {
      currentIdx = this.slider.length - 1;
    } else if (currentIdx === this.slider.length ){
      currentIdx = 0
    }

    this.dotsChange(currentIdx);
    this.slideShow(currentIdx);
  }));
}

Carousel.prototype.dotsClick = function() {
  this.dots.forEach((dot, idx) => dot.addEventListener('click', () => {
    if (this.state) return;
    if (this.beforeNum === idx) return;
    this.state = true;

    this.dotsChange(idx);
    this.slideShow(idx);
  }));
}

Carousel.prototype.dotsChange = function (next) {
  this.dots[this.beforeNum].classList.remove('is-selected');
  this.dots[next].classList.add('is-selected');
}

Carousel.prototype.slideShow = function(idx) {
  const beforeSlide = this.slider[this.beforeNum];

  const lastToFirst = (this.beforeNum === this.slider.length - 1 && idx === 0);
  const firstToLast = (this.beforeNum === 0 && idx === this.slider.length - 1);

  const arrowNextLoop = (this.buttonState === 'arrow' && lastToFirst);
  const arrowPrevLoop = (this.buttonState === 'arrow' && firstToLast);

  beforeSlide.classList.remove('right-show', 'left-show');
  
  if ((this.beforeNum < idx && !arrowPrevLoop )|| arrowNextLoop) {
    this.sliding(idx, 'left-hide', 'right-show');

  } else {
    this.sliding(idx, 'right-hide', 'left-show');
  }

  this.beforeNum = idx;
  this.buttonState = null;
}

Carousel.prototype.sliding = function (idx, beforeClass, nextClass) {
  const beforeSlide = this.slider[this.beforeNum];
  const nextSlide = this.slider[idx];

  beforeSlide.classList.add(beforeClass);
  nextSlide.classList.add(nextClass);

  nextSlide.addEventListener('animationend', () => {
    beforeSlide.classList.remove(beforeClass);
    this.state = false;
  });
}

const carousel01 = new Carousel('slider-list', 'arrow', 'dots', '.4s');
