'use strict';

function creatHtmlElement(elementName, elementTag, elementClassArr) {
  const el = document.createElement(elementTag);
  elementClassArr.forEach(classElement => {
    el.classList.add(classElement);
  });
  el.textContent = elementName;

  return el;
}

function getTime() {
  const hours = new Date().getHours().toString().split('');
  const minutes = new Date().getMinutes().toString().split('');
  const seconds = new Date().getSeconds().toString().split('');
  const time = [];

  time.push(checkNumberOfDigits(hours));
  time.push(checkNumberOfDigits(minutes));
  time.push(checkNumberOfDigits(seconds));

  return time;
}

function creatClockTemplate([hours, minutes, seconds]) {
  const hourWrapper = creatHtmlElement('', 'div', ['block__number']);
  const hourFirstNumber = creatHtmlElement('', 'img', ['hours-first-number']);
  hourFirstNumber.src = numberCollection[hours[0]];
  hourFirstNumber.alt = 'First hours number';

  const hourSecondNumber = creatHtmlElement('', 'img', ['hours-second-number']);
  hourSecondNumber.src = numberCollection[hours[1]];
  hourSecondNumber.alt = 'Second hours number';

  const poitWrapper = creatHtmlElement('', 'div', ['point']);
  const span = creatHtmlElement(':', 'span', ['point-title']);
  const poitWrapperMinute = creatHtmlElement('', 'div', ['point','point-minutes']);
  const spanMinute = creatHtmlElement(':', 'span', ['point-title']);

  poitWrapper.appendChild(span);
  poitWrapperMinute.appendChild(spanMinute);

  const minuteWrapper = creatHtmlElement('', 'div', ['block__number']);
  const minuteFirstNumber = creatHtmlElement('', 'img', ['minutes-first-number']);
  minuteFirstNumber.src = numberCollection[minutes[0]];
  minuteFirstNumber.alt = 'First minutes number';

  const minuteSecondNumber = creatHtmlElement('', 'img', ['minutes-second-number']);
  minuteSecondNumber.src = numberCollection[minutes[1]];
  minuteSecondNumber.alt = 'Second minutes number';

  const secondWrapper = creatHtmlElement('', 'div', ['block__number']);
  const secondFirstNumber = creatHtmlElement('', 'img', ['first-seconds-number']);
  secondFirstNumber.src = numberCollection[seconds[0]];
  secondFirstNumber.alt = 'First seconds number';

  const secondSecondNumber = creatHtmlElement('', 'img', ['last-seconds-number']);
  secondSecondNumber.src = numberCollection[seconds[1]];
  secondSecondNumber.alt = 'Last seconds number';

  hourWrapper.appendChild(hourFirstNumber);
  hourWrapper.appendChild(hourSecondNumber);
  
  minuteWrapper.appendChild(minuteFirstNumber);
  minuteWrapper.appendChild(minuteSecondNumber);
  
  secondWrapper.appendChild(secondFirstNumber);
  secondWrapper.appendChild(secondSecondNumber);

  contentWrapper.appendChild(hourWrapper);
  contentWrapper.appendChild(poitWrapper);
  contentWrapper.appendChild(minuteWrapper);
  contentWrapper.appendChild(poitWrapperMinute);
  contentWrapper.appendChild(secondWrapper);
}

function checkNumberOfDigits(arr) {
  if (arr.length < 2) {
    arr.unshift('0');
  }
  return arr;
}

function setDigit(target, digit) {
  const digitalDigit = document.querySelector(target);
  digitalDigit.src = digit;
}

function runClock() {
  const [hours, minutes, seconds] = getTime();
  setDigit('.last-seconds-number', numberCollection[seconds[1]]);

  if (seconds[1] === '0') {
    setDigit('.first-seconds-number', numberCollection[seconds[0]]);
  }
  if (seconds[1] === '0' && seconds[0] === '0') {
    setDigit('.minutes-second-number', numberCollection[minutes[1]]);
  }
  if (seconds[1] === '0' && seconds[0] === '0' && minutes[1] === '0') {
    setDigit('.minutes-first-number', numberCollection[minutes[0]]);
  }
  if (seconds[1] === '0' && seconds[0] === '0' && minutes[1] === '0' && minutes[0] === '0') {
    setDigit('.hours-second-number', numberCollection[hours[1]]);
  }
  if (seconds[1] === '0' && seconds[0] === '0' && minutes[1] === '0' && minutes[0] === '0' && hours[1] === '0' && hours[0] === '0') {
    contentWrapper.innerHTML = '';
    creatClockTemplate([hours, minutes, seconds]);
  }
}
