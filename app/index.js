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
  this.slider = Array.from(document.querySelector('.' + sliderClassName).children);
  this.arrows = Array.from(document.querySelectorAll('.' + arrowsClassName));
  this.dots = Array.from(document.querySelector('.' + dotsClassName).children);
  this.beforeIdx = 0;
  this.isSliding = false;
  this.isArrowClick = false;

  this.setDuration(duration);
  this.arrowClick();
  this.dotsClick();
}

Carousel.prototype.setDuration = function (duration) {
  document.getElementsByTagName("html")[0].style.setProperty('--duration', duration);
}

Carousel.prototype.arrowClick = function() {
  this.arrows.forEach(arrow => arrow.addEventListener('click', () => {
    if (this.isSliding) return;
    this.isSliding = true;
    this.isArrowClick = true;
    
    let currentIdx = arrow.classList.contains('prev') ? this.beforeIdx - 1 : this.beforeIdx + 1;
    
    if (currentIdx < 0) {
      currentIdx = this.slider.length - 1;
    } else if (currentIdx === this.slider.length){
      currentIdx = 0
    }

    this.dotsChange(currentIdx);
    this.slideShow(currentIdx);
  }));
}

Carousel.prototype.dotsClick = function() {
  this.dots.forEach((dot, idx) => dot.addEventListener('click', () => {
    if (this.isSliding) return;
    if (this.beforeIdx === idx) return;
    this.isSliding = true;

    this.dotsChange(idx);
    this.slideShow(idx);
  }));
}

Carousel.prototype.dotsChange = function (next) {
  this.dots[this.beforeIdx].classList.remove('is-selected');
  this.dots[next].classList.add('is-selected');
}

Carousel.prototype.slideShow = function(idx) {
  const beforeSlide = this.slider[this.beforeIdx];

  const isLastToFirst = (this.beforeIdx === this.slider.length - 1 && !idx);
  const isFirstToLast = (!this.beforeIdx && idx === this.slider.length - 1);

  const isPrevLoop = (this.isArrowClick && isFirstToLast);
  const isNextLoop = (this.isArrowClick && isLastToFirst);

  beforeSlide.classList.remove('right-show', 'left-show');
  
  if ((this.beforeIdx < idx && !isPrevLoop ) || isNextLoop) {
    this.sliding(idx, 'left-hide', 'right-show');
  } else {
    this.sliding(idx, 'right-hide', 'left-show');
  }

  this.beforeIdx = idx;
  this.isArrowClick = false;
}

Carousel.prototype.sliding = function (idx, beforeClass, nextClass) {
  const beforeSlide = this.slider[this.beforeIdx];
  const nextSlide = this.slider[idx];

  beforeSlide.classList.add(beforeClass);
  nextSlide.classList.add(nextClass);

  nextSlide.addEventListener('animationend', () => {
    beforeSlide.classList.remove(beforeClass);
    this.isSliding = false;
  });
}

new Carousel('slider-list', 'arrow', 'dots', '.35s');
