'use strict';

const numberCollection = {
  0: './assets/img/0.png',
  1: './assets/img/1.png',
  2: './assets/img/2.png',
  3: './assets/img/3.png',
  4: './assets/img/4.png',
  5: './assets/img/5.png',
  6: './assets/img/6.png',
  7: './assets/img/7.png',
  8: './assets/img/8.png',
  9: './assets/img/9.png',
};

const contentWrapper = document.querySelector('.clock__wrapper');

const time = getTime();

creatClockTemplate(time);

setInterval(runClock, 1000);
