// Load application styles
//import 'styles/index.css';

// ================================
// START YOUR APP HERE
// ================================


// @param { string } -- sliderClassName
function Carousel(sliderClassName, arrowsClassName, dotsClassName) {
  this.slide = Array.from(document.querySelector('.' + sliderClassName).children);
  //this.arrows = arrowClassName;
  this.dots = document.querySelectorAll('.' + dotsClassName);
  this.count = 0;
}

Carousel.prototype.dotsClick = function() {
  //console.log(this.dots);
  this.dots.addEventListener('click', function(){
    console.log(this);
  });
}

const carousel01 = new Carousel('slider-list', 'arrows', 'dot');
carousel01.dotsClick();
