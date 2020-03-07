'use strict';

function getIndex() {
  let res = 0;
  for (let i of parent.children) {
    if (!i.classList.contains('hide')) {
      res = parseInt(i.dataset.index);
      return res;
    }
  }
}

function nextElement(index) {
  if (parent.children[index].nextElementSibling) {
    setSliderClass(index, index + 1);
    setSliderCircleBtnClass(index, index + 1);
  } else {
    setSliderClass(index, firstElement);
    setSliderCircleBtnClass(index, firstElement);
  }
}

function previousElement(index) {
  if (parent.children[index].previousElementSibling) {
    setSliderClass(index, index - 1);
    setSliderCircleBtnClass(index, index - 1);
  } else {
    setSliderClass(index, lastElement);
    setSliderCircleBtnClass(index, lastElement);
  }
}

function showNavigationBtn() {
  const index = getIndex();
  circleBtn[index].classList.add('set-color-white');
}

function goTo(presentIndex, futureIndex) {
  setSliderClass(presentIndex, futureIndex);
  setSliderCircleBtnClass(presentIndex, futureIndex);
}

function setSliderClass(current, nextIndex) {
  parent.children[current].classList.add('hide');
  parent.children[nextIndex].classList.remove('hide');
}

function setSliderCircleBtnClass(current, nextIndex) {
  circleBtn[current].classList.remove('set-color-white');
  circleBtn[nextIndex].classList.add('set-color-white');
}

function autoSlide() {
  sliderInterval = setInterval(function() {
    let index = getIndex();
    nextElement(index);
  }, 3000);
}
