'use strict';

const sliderImgCollection = [
  './assets/img/1.jpg',
  './assets/img/2.jpg',
  './assets/img/3.jpg',
  './assets/img/4.jpg',
  './assets/img/5.jpg',
];

const contentWrapper = document.querySelector('.content__wrapper');

const newSlider = new Slider(sliderImgCollection).creatSlider();
contentWrapper.appendChild(newSlider);

const parent = document.querySelector('.img__content');
const firstElement = parseInt(parent.firstElementChild.dataset.index);
const lastElement = parseInt(parent.lastElementChild.dataset.index);
const circleBtn = document.querySelectorAll('.circle-btn');

document.addEventListener('DOMContentLoaded', showNavigationBtn);
const sliderWrapper = document.querySelector('.slider__wrapper');

let sliderInterval;
autoSlide();

sliderWrapper.addEventListener('click', e => {
  if (e.target.classList.contains('next-btn')) {
    clearInterval(sliderInterval);
    let index = getIndex();
    nextElement(index);
    autoSlide();
  } else if (e.target.classList.contains('prev-btn')) {
    clearInterval(sliderInterval);
    let index = getIndex();
    previousElement(index);
    autoSlide();
  } else if (e.target.classList.contains('circle-btn')) {
    clearInterval(sliderInterval);
    let goIndex = e.target.dataset.index;
    let index = getIndex();
    goTo(index, goIndex);
    autoSlide();
  }
});
