'use strict';

function Slider(imgCollection) {
  this.imgCollection = imgCollection;

  this.creatSlider = function() {
    function randomNumber(min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    }

    let random = randomNumber(0, this.imgCollection.length - 1);
    let setHideClass;

    function parseName(url) {
      let splitName = url.split('/');
      for (let i of splitName) {
        if (i.includes('.jpg')) {
          return i;
        }
      }
      return url;
    }

    function creatImgHtml(imgUrl, show, index) {
      const img = document.createElement('img');
      img.src = imgUrl;
      img.alt = parseName(img.src);
      img.setAttribute('data-index', index);
      if (show) {
        img.classList.add('hide');
      }

      return img;
    }

    function creatCircleBtn(index) {
      const btn = document.createElement('div');
      btn.classList.add('circle-btn');
      btn.setAttribute('data-index', index);
      return btn;
    }

    const sliderWrapper = document.createElement('div');
    sliderWrapper.classList.add('slider__wrapper');

    const sliderCircleBtnWrapper = document.createElement('div');
    sliderCircleBtnWrapper.classList.add('slider-circle-btn');

    const navigationPrev = document.createElement('div');
    navigationPrev.classList.add('navigation', 'prev-btn');

    const navigatioNext = document.createElement('div');
    navigatioNext.classList.add('navigation', 'next-btn');

    const imageContent = document.createElement('div');
    imageContent.classList.add('img__content');

    const prevBtn = document.createElement('button');
    prevBtn.classList.add('prev-btn');
    prevBtn.textContent = '<';

    const nextBtn = document.createElement('button');
    nextBtn.classList.add('next-btn');
    nextBtn.textContent = '>';

    navigationPrev.appendChild(prevBtn);

    for (let i = 0; i < this.imgCollection.length; i++) {
      setHideClass = true;
      if (random === i) {
        setHideClass = false;
      }
      const imgHtml = creatImgHtml(this.imgCollection[i], setHideClass, i);
      const circleBtn = creatCircleBtn(i);

      sliderCircleBtnWrapper.appendChild(circleBtn);
      imageContent.appendChild(imgHtml);
    }

    navigatioNext.appendChild(nextBtn);

    sliderWrapper.appendChild(navigationPrev);
    sliderWrapper.appendChild(imageContent);
    sliderWrapper.appendChild(navigatioNext);
    sliderWrapper.appendChild(sliderCircleBtnWrapper);

    return sliderWrapper;
  };
}
