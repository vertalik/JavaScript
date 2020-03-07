'use strict';

const products = {
  phones: [
    {
      name: 'Iphone X',
      addInfo: {
        color: 'black',
        memory: '254 Gb',
        price: '1500$'
      }
    },
    {
      name: 'Samsung S8',
      addInfo: {
        color: 'white',
        memory: '128 Gb',
        price: '1200$'
      }
    }
  ],
  laptops: [
    {
      name: 'Asus Eee 1001-pxd',
      addInfo: {
        color: 'gold',
        diskSize: '1Tb',
        ram: '8Gb',
        waranty: '12 months',
        price: '800$'
      }
    },
    {
      name: 'Acer Aspire One',
      addInfo: {
        color: 'blue',
        diskSize: '256Gb',
        ram: '16 Gb',
        waranty: '12 months',
        price: '1400$'
      }
    }
  ],
  monitors: [
    {
      name: 'Samsung 24',
      addInfo: {
        color: 'black',
        resolution: 'fullHD',
        waranty: '24 months',
        price: '600$'
      }
    },
    {
      name: 'LG 29',
      addInfo: {
        color: 'silver',
        resolution: '4K',
        waranty: '12 months',
        price: '550$'
      }
    }
  ]
};

const productsKey = {
  ram: 'RAM',
  color: 'Color',
  resolution: 'Resolution',
  waranty: 'Waranty',
  price: 'Price',
  diskSize: 'Disk size',
  memory: 'Memory'
};

const shop = document.querySelector('.shop__wrapper');
const formWrapper = document.querySelector('.main-form__wrapper');
const formContent = document.querySelector('.main-form__content');
const categories = document.querySelector('.categories');
const prod = document.querySelector('.products');
const info = document.querySelector('.add-info');

const fragment = document.createDocumentFragment();
const form = document.forms.mainForm;

const alertMsg = document.querySelector('.alert-msg');

loadCategories(products);

document.addEventListener('click', e => {
  if (e.target.classList.contains('close-btn')) {
    hideForm();
    return;
  }
  if (!formContent.classList.contains('show__form')) {
    resetSubElements(true);
    removeActive(categories);
  }
});

shop.addEventListener('click', e => {
  e.stopPropagation();
  if (e.target.classList.contains('category')) {
    hideOrder();
    hideForm();
    resetSubElements(true);

    removeActive(e.target.parentNode);

    e.target.classList.add('active');

    const productsOfCategory = e.target.textContent.toLowerCase();
    prod.setAttribute('data-category', productsOfCategory);

    loadProducts(productsOfCategory);
  } else if (e.target.classList.contains('product')) {
    hideForm();
    removeActive(e.target.parentNode);

    e.target.classList.add('active');

    resetSubElements(false);

    const produtcName = e.target.textContent;
    const categoryName = e.target.parentNode.dataset.category;
    info.setAttribute('data-product', produtcName);

    const price = getPrice(products[categoryName], produtcName);
    info.setAttribute('data-price', price);

    loadProductAddInfo(products[categoryName], produtcName);
  }
  if (e.target.classList.contains('buy-btn')) {
    hideOrder();
    showFrom();
  }
});

form.addEventListener('keyup', () => {
  const formData = getDataFromForm();
  replaceFormInput(formData);
});

form.addEventListener('click', e => {
  if (e.target.classList.contains('close-btn')) {
    hideForm();
  }
  if (e.target.classList.contains('sendBtn')) {
    alertMsg.innerHTML = '';
    const formData = getDataFromForm();
    const checkStatus = fillingCheck(formData);
    checkStatus && getOrder(formData);
  }
});

form.addEventListener('change', () => {
  hideErrorMsg();
});
