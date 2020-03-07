'use strict';

function loadCategories(products) {
  Object.keys(products).forEach(categElement => {
    const element = creatHtmlElement(
      formatName(categElement),
      'li',
      'category'
    );
    fragment.appendChild(element);
  });
  categories.appendChild(fragment);
}

function loadProducts(dataProducts) {
  const title = document.createElement('h3');
  title.textContent = ` / ${formatName(dataProducts)}`;

  Object.values(products[dataProducts]).forEach(produtc => {
    const element = creatHtmlElement(produtc.name, 'li', 'product');
    fragment.appendChild(element);
  });

  prod.appendChild(title);
  prod.appendChild(fragment);
}

function loadProductAddInfo(product, selectedProduct) {
  const title = document.createElement('h3');
  title.textContent = ` / ${selectedProduct}`;

  for (let i = 0; i < product.length; i++) {
    if (selectedProduct === product[i].name) {
      const productElement = product[i].addInfo;

      Object.entries(productElement).forEach(([key, value]) => {
        if (productsKey.hasOwnProperty(key)) {
          key = productsKey[key];
        }

        const element = creatHtmlElement(`${key} : ${value}`, 'li', 'info');
        fragment.appendChild(element);
      });
    }
  }
  info.appendChild(title);
  info.appendChild(fragment);

  creatBuyBtn();
}

function creatBuyBtn() {
  const buyBtn = document.createElement('button');
  buyBtn.textContent = 'Buy';
  buyBtn.classList.add('buy-btn', 'btn', 'btn-primary');

  info.appendChild(buyBtn);
}

function creatHtmlElement(element, elementTag, elementClass) {
  const el = document.createElement(elementTag);
  el.classList.add(elementClass, 'list-group-item', 'list-group-item-action');
  el.textContent = element;

  return el;
}

function resetSubElements(isTarget) {
  if (isTarget) {
    if (prod.hasChildNodes) {
      prod.removeAttribute('data-category');
      prod.innerHTML = '';
    }
    if (info.hasChildNodes) {
      info.innerHTML = '';
      info.removeAttribute('data-product');
    }
  } else {
    if (info.hasChildNodes) {
      info.innerHTML = '';
      info.removeAttribute('data-product');
    }
  }
}

function removeActive(target) {
  for (let i of target.children) {
    if (i.classList.contains('active')) {
      i.classList.remove('active');
    }
  }
}

function formatName(name) {
  return name[0].toUpperCase() + name.slice(1);
}

function replaceFormInput({
  firstName,
  lastName,
  middleName,
  phone,
  storage,
  numberOfProduct
}) {
  form.elements.firstName.value = firstName.replace(
    /[^a-zA-ZА-Яа-яЁё\s+]/g,
    ''
  );
  form.elements.lastName.value = lastName.replace(/[^a-zA-ZА-Яа-яЁё\s+]/g, '');
  form.elements.middleName.value = middleName.replace(
    /[^a-zA-ZА-Яа-яЁё\s+]/g,
    ''
  );
  form.elements.phoneNumber.value = phone.replace(/[^0-9]/g, '');
  form.elements.storage.value = storage.replace(/[^1-9]/g, '');
  form.elements.numberOfItems.value = numberOfProduct.replace(/[^1-9]/g, '');
}

function getDataFromForm() {
  const formData = {
    firstName: form.elements.firstName.value,
    lastName: form.elements.lastName.value,
    middleName: form.elements.middleName.value,
    phone: form.elements.phoneNumber.value,
    city: form.elements.city.value,
    storage: form.elements.storage.value,
    payMethod: form.elements.payMethod.value,
    numberOfProduct: form.elements.numberOfItems.value,
    coments: form.elements.coments.value
  };
  return formData;
}

function fillingCheck({
  firstName,
  lastName,
  middleName,
  city,
  phone,
  storage,
  payMethod,
  numberOfProduct
}) {
  let isCorrect = true;

  isCorrect = showErrorMsg(lastName, 'Enter your last name!');
  isCorrect = showErrorMsg(firstName, 'Enter your first name!');
  isCorrect = showErrorMsg(middleName, 'Enter your middle name!');
  isCorrect = showErrorMsg(phone, 'Enter your phone number!');
  isCorrect = showErrorMsg(city, 'Select a city!');
  isCorrect = showErrorMsg(storage, 'Enter Nova Poshta storage!');
  isCorrect = showErrorMsg(payMethod, 'Choose a payment method!');
  isCorrect = showErrorMsg(numberOfProduct, 'Enter quantity of goods');

  return isCorrect;
}

function showErrorMsg(checkData, msg) {
  if (!checkData || checkData === '0') {
    if (alertMsg.hasChildNodes()) {
      return;
    }
    const div = document.createElement('div');
    div.classList.add(
      'alert',
      'alert-danger',
      'alert-dismissible',
      'fade',
      'show'
    );
    div.setAttribute('role', 'alert');
    div.textContent = msg;

    const btn = document.createElement('button');
    btn.classList.add('close');
    btn.setAttribute('data-dismiss', 'alert');
    btn.setAttribute('aria-label', 'Close');

    const span = document.createElement('span');
    span.innerHTML = '&times;';
    span.setAttribute('aria-hidden', 'true');

    btn.appendChild(span);
    div.appendChild(btn);
    alertMsg.appendChild(div);

    return false;
  }
  return true;
}

function hideErrorMsg() {
  if (alertMsg.children.length > 0) {
    alertMsg.innerHTML = '';
  }
}

function hideForm() {
  form.reset();
  formContent.classList.remove('show__form');
  hideErrorMsg();
}

function showFrom() {
  formContent.classList.add('show__form');
}

function hideOrder() {
  for (let i of formWrapper.children) {
    if (i.classList.contains('order-table')) {
      i.remove();
    }
  }
}

function getPrice(product, selectedProduct) {
  for (let i = 0; i < product.length; i++) {
    if (selectedProduct === product[i].name) {
      const productElement = product[i].addInfo.price;
      return productElement;
    }
  }
}

function getOrder({
  firstName,
  lastName,
  middleName,
  phone,
  city,
  storage,
  payMethod,
  numberOfProduct,
  coments
}) {
  const buyer = `${lastName} ${firstName} ${middleName}`;
  const cityName = form.elements.city.options[city].text;
  const productTotalPrice = `${
    info.dataset.product
  } , Number: ${numberOfProduct} * Price: ${
    info.dataset.price
  } = Total price: ${parseInt(numberOfProduct) *
    parseInt(info.dataset.price)}$`;

  const orderObj = {
    ['Buyer: ']: buyer,
    ['Phone number: ']: phone,
    ['City: ']: cityName,
    ['Storage: ']: storage,
    ['Pay method: ']: payMethod,
    ['Product: ']: productTotalPrice,
    ['Coments: ']: coments
  };

  const table = document.createElement('table');
  table.classList.add('order-table');

  Object.entries(orderObj).forEach(([key, value]) => {
    const element = tableTemplate(key, value);
    fragment.appendChild(element);
  });

  table.appendChild(fragment);

  hideForm();
  formWrapper.insertAdjacentElement('afterbegin', table);
}

function tableTemplate(key, value) {
  const tr = document.createElement('tr');
  const td_key = document.createElement('td');
  const td_value = document.createElement('td');
  td_key.textContent = key;
  td_value.textContent = value;
  tr.appendChild(td_key);
  tr.appendChild(td_value);

  return tr;
}
