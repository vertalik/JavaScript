'use strict';

function creatHtmlElement(elementName, elementTag, elementClassArr) {
  const el = $(`<${elementTag}></${elementTag}>`, {
    text: elementName,
  })[0];
  $(el).addClass(elementClassArr);
  return el;
}

function loadFromLocalStorage(key) {
  if (!localStorage.key(key)) {
    return false;
  }
  const data = localStorage.getItem(key);
  return JSON.parse(data);
}

function saveDataToLocalStorage(data, key) {
  const strData = JSON.stringify(data);
  localStorage.setItem(key, strData);
}

function creatRandomId() {
  return Number(Math.random().toFixed(5).slice(2));
}

function creatTable(data, tableAtribute) {
  const table = creatHtmlElement('', 'table', ['main-table']);
  $(table).attr('data-table', tableAtribute);
  const tr = creatHtmlElement('', 'tr', []);

  const tdId = creatHtmlElement('Id', 'td', []);
  const tdName = creatHtmlElement('Name', 'td', []);
  const tdActions = creatHtmlElement('', 'td', ['table-actions']);
  const span = creatHtmlElement('Actions', 'span', []);
  $(tdActions).append(span);

  const addBtn = creatHtmlElement('', 'input', ['addBtn', 'btn', 'btn-success']);
  $(addBtn)
    .attr({
      type: 'button',
      value: 'Add',
    })
    .appendTo(tdActions);

    $(tr)
    .append(tdId, tdName, tdActions)
    .appendTo(table);

  $.each(data, (index, value) => {
    const row = creatTableRow(value.id, value.name);
    $(fragment).append(row);
  });

  $(table)
    .append(fragment)
    .appendTo(tableWrapper)
    .click(e => tabelHandler(e));
}

function creatTableRow(id, name) {
  const tr = creatHtmlElement('', 'tr', ['main-table-row']);
  $(tr).attr('data-id', id);

  const tdId = creatHtmlElement(id, 'td', []);
  const tdName = creatHtmlElement(name, 'td', []);

  const btnView = creatHtmlElement('View', 'button', ['viewBtn', 'btn', 'btn-info']);
  const btnEdit = creatHtmlElement('Edit', 'button', ['editBtn', 'btn', 'btn-warning']);
  const btnDelete = creatHtmlElement('Remove', 'button', ['delBtn', 'btn', 'btn-danger']);

  const actions = creatHtmlElement('', 'td', []);
  $(actions).append(btnView, btnEdit, btnDelete);
  $(tr).append(tdId, tdName, actions);

  return tr;
}

function getDataId(target) {
  let id;
  $('.main-table-row').each((i, data) => {
    if (data.contains(target)) {
      id = data.dataset.id;
    }
  });
  return id;
}

function hideTable() {
  $(mainDataWrapper).html('');
}

function getTableDataSet() {
  return $('.main-table').data('table');
}

function getClickedCard(id, tableData) {
  switch (tableData) {
    case 'persons':
      return persons.filter(valueData => valueData.id === id)[0];
    case 'cars':
      return cars.filter(valueData => valueData.id === id)[0];
    case 'companies':
      return companies.filter(valueData => valueData.id === id)[0];
  }
}

function getCurrentObj(tableData) {
  return tableArray[tableData];
}

function viewInfo(id, tableData) {
  const value = getClickedCard(id, tableData);
  const table = creatTableData(value);
  const div = creatHtmlElement('', 'div', ['close-table-wrapper']);
  const closeBtn = creatHtmlElement('x', 'button', ['close-table-btn']);
  $(closeBtn).click(hideTable);
  $(div)
    .append(closeBtn)
    .appendTo(mainDataWrapper);
  $(mainDataWrapper).append(table);

  addTooltip();
}

function addTooltip() {
  const carsData = $('[data-car="cars"]');
  if (carsData.text() === '') {
    return;
    }
    carsData.addClass('tooltip__color');
    const tooltipData = [];
    const carArray = carsData.text().split(',');
    carArray.forEach(car => {
      const carBuyDate = cars.filter(carVal => carVal.name === car)[0];
        tooltipData.push(`<p><b>${car}</b> was bought</p><p><em>${getDate(carBuyDate.buyDate)}</em></p>`);
    });
    carsData.attr({
        ['data-toggle']: 'tooltip',
        ['data-html']: true,
        ['data-placement']: 'top',
        title: tooltipData,
      })
      .hover()
      .tooltip();
}

function editInfo(id, tableData) {
  const value = getClickedCard(id, tableData);
  creatForm(value, tableData, true);
}

function creatTableData(dataObj) {
  const table = creatHtmlElement('', 'table', ['view-table']);

  Object.entries(dataObj).forEach(([key, value]) => {
    if (key === 'car') {
      value = getName(value, cars);
    }
    if (key === 'owner' && value !== '') {
      value = getOwner(value);
    }
    key = createUserFriendlyKey(key);
    const tr = creatHtmlElement('', 'tr', []);
    const tdKey = creatHtmlElement(`${key}:`, 'td', ['key']);
    const tdValue = creatHtmlElement(value, 'td', ['value']);
    if (key === 'Car') {
      tdValue.dataset.car = 'cars';
    }

    $(tr)
      .append(tdKey, tdValue)
      .appendTo(fragment);
  });

  $(table).append(fragment);

  return table;
}

function createUserFriendlyKey(key) {
  const indexUperrCase = key.search(/[A-Z]/g);
  if (indexUperrCase < 0) {
    key = key[0].toUpperCase() + key.slice(1);
    return key;
  }
  const splitArr = key.split('');
  splitArr.splice(indexUperrCase, 0, ' ');
  let str = splitArr.join('');
  str = str[0].toUpperCase() + str.slice(1);
  return str;
}

function creatNavigationBtn() {
  const personsBtn = creatHtmlElement('Persons', 'button', [
    'persons__btn',
    'nav__btn',
    'btn',
    'btn-outline-primary',
  ]);
  const carsBtn = creatHtmlElement('Cars', 'button', [
    'cars__btn',
    'nav__btn',
    'btn',
    'btn-outline-primary',
  ]);
  const companyBtn = creatHtmlElement('Companies', 'button', [
    'company__btn',
    'nav__btn',
    'btn',
    'btn-outline-primary',
  ]);
  $(fragment)
    .append(personsBtn, carsBtn, companyBtn)
    .appendTo(navigationWrapper);
  $(navigationWrapper).click(e => navigationHandler(e));
}

function navigationHandler({ target }) {
  Object.entries(tableArray).forEach(([key, value]) => {
    if ($(target).text().toLowerCase() === key) {
      hideTable();
      removeActiveClass();
      addActiveClass(target);
      removeTableData();
      creatTable(value, key);
    }
  });
}

function removeTableData() {
  $('.main-table').remove();
}

function tabelHandler({ target }) {
  const tableElements = ['viewBtn', 'editBtn', 'delBtn', 'addBtn'];
  $.each(tableElements, (index, value) => {
    if ($(target).hasClass(value)) {
      hideTable();
      const tableData = getTableDataSet();
      const id = parseInt(getDataId(target));
      const newData = creatNewData(tableData);
      tableActions(value, id, tableData, newData);
    }
  });
}

function tableActions(btnName, id, tableData, newData) {
  switch (btnName) {
    case 'viewBtn':
      return viewInfo(id, tableData);
    case 'editBtn':
      return editInfo(id, tableData);
    case 'delBtn':
      return delInfo(id, tableData);
    case 'addBtn':
      return creatForm(newData, tableData, false);
  }
}

function creatNewData(tabledata) {
  const date = setCurrentDate();
  switch (tabledata) {
    case 'persons':
      return creatNewPerson(date);
    case 'cars':
      return new Car(creatRandomId(), date, '', '', '', '');
    case 'companies':
      return new Company(creatRandomId(), date, '', '', '', []);
  }
}

function creatNewPerson(date) {
  const newPerson = new Human(creatRandomId(), date, '');
  newPerson.age = '';
  newPerson.money = '';
  newPerson.car = [];

  return newPerson;
}

function creatForm(objValue, tableData, btnShow) {
  const formWrapper = creatHtmlElement('', 'div', ['form__wrapper']);
  const form = creatHtmlElement('', 'form', ['main-form']);
  $(form).attr('name', 'mainForm');

  const divClose = creatHtmlElement('', 'div', ['close-btn']);
  const closeBtn = creatHtmlElement('', 'input', ['closeBtn']);
  $(closeBtn).attr({
      type: 'button',
      name: 'closeBtn',
      value: 'x',
    })
    .click(hideTable)
    .appendTo(divClose);

  Object.entries(objValue).forEach(([key, value]) => {
    if (key === 'car') {
      value = getName(value, cars);
    }
    if (key === 'owner' && value !== '') {
      value = getOwner(value);
    }
    const div = creatHtmlElement(`${createUserFriendlyKey(key)}:`, 'div', [`${key.toLowerCase()}-container`,]);
    key = key[0].toLowerCase() + key.slice(1);
    const val = creatHtmlElement('', 'input', []);

    Object.keys(inputAttribute).forEach(inputKey => {
      if (key === inputKey) {
        Object.entries(inputAttribute[key]).forEach(([keyObj, valueObj]) => {
          $(val).attr({
            [keyObj]: [valueObj],
            value: value,
          });
        });
      } else {
        $(val).attr({
          name: key,
          value: value,
        });
      }
    });
    $(div).append(val).appendTo(fragment);
  });

  const divBtn = creatHtmlElement('', 'div', ['btn-container']);
  const saveBtn = creatHtmlElement('', 'input', ['saveBtn', 'btn', 'btn-primary']);

  $(saveBtn).attr({
      type: 'button',
      name: 'saveBtn',
      value: 'Save',
    }).click(saveHandler);

  if (btnShow && tableData !== 'cars') {
    const buyCar = creatHtmlElement('', 'input', ['buyCar', 'btn', 'btn-outline-primary']);
    $(buyCar).attr({
        type: 'button',
        name: 'buyCar',
        value: 'Buy Car',
      }).appendTo(divBtn);

    const sellCar = creatHtmlElement('', 'input', ['btn', 'btn-outline-primary', 'sellCar']);
    $(sellCar).attr({
        type: 'button',
        name: 'sellCar',
        value: 'Sell Car',
      }).appendTo(divBtn);

    $(form).click(e => {
      if ($(e.target).hasClass('buyCar')) {
        creatTableCarHandler('buy');
      }
      if ($(e.target).hasClass('sellCar')) {
        creatTableCarHandler('sell');
      }
    });
  }
  $(divBtn).append(saveBtn);
  $(form)
    .append(divClose, fragment, divBtn)
    .appendTo(formWrapper);
  $(mainDataWrapper).append(formWrapper);
}

function saveHandler() {
  const formValid = checkValidFormField();
  if (!formValid) {
    return;
  }
  const id = parseInt($('input[name="id"]').val());
  const mainTable = $('.main-table')[0];

  const tableData = getTableDataSet();
  const currentObj = getCurrentObj(tableData);
  const valueObj = getClickedCard(id, tableData);

  if (valueObj) {
    saveDataFromForm(valueObj);
    for (let i of mainTable.children) {
      if (parseInt(i.dataset.id) === id) {
        const newRow = creatTableRow(id, valueObj.name);
        i.replaceWith(newRow);
      }
    }
    saveDataToLocalStorage(currentObj, tableData);
    hideTable();
    return;
  }
  const newData = creatNewData(tableData);
  saveDataFromForm(newData);

  currentObj.push(newData);
  const newRow = creatTableRow(newData.id, newData.name);
  $(mainTable).append(newRow);
  saveDataToLocalStorage(currentObj, tableData);
  hideTable();
}

function saveDataFromForm(ObjValue) {
  const form = document.forms.mainForm;
  for (let input of form.elements) {
    if (inputAttribute.hasOwnProperty(input.name)) {
      if (input.type === 'number') {
        ObjValue[input.name] = parseInt(input.value);
      } else if (input.name === 'car' || input.name === 'owner') {
        continue;
      } else {
        ObjValue[input.name] = input.value;
      }
    }
  }
}

function delInfo(id, tableData) {
  const value = getClickedCard(id, tableData);

  const modal = document.getElementById('modalMsg');
  modal.querySelector('.modal-title').textContent = 'Delete';
  modal.querySelector('.modal-body').textContent = `Do you really want to remove "${value.name}" ?`;
  const yesBtn = creatHtmlElement('Yes', 'button', ['confirm-yes-btn', 'btn', 'btn-success']);
  const noBtn = creatHtmlElement('No', 'button', ['confirm-no-btn', 'btn', 'btn-danger']);

  $(yesBtn).attr({
    'type': 'button',
  }).appendTo('.modal-footer').on('click', () => {
    $(modal).modal('hide');
    deleteElement(value, tableData);
  });

  $(noBtn).attr({
    'type': 'button',
    ['data-dismiss']: 'modal',
  }).appendTo('.modal-footer');

  $(modal).modal('show');

  $(modal).on('hidden.bs.modal', () => {
    $(yesBtn).remove();
    $(noBtn).remove();
  });
}

function removeCarFromCarList(value, targetData) {
  const dataObj = getCurrentObj(targetData);
  dataObj.forEach(data => {
    if (data.car.includes(value.id)) {
      const index = data.car.indexOf(value.id);
      data.car.splice(index, 1);
    }
  });
}

function deleteElement(value, tableData) {
  if (tableData === 'persons' || tableData === 'companies') {
    cars.forEach(car => {
      if (parseInt(car.owner) === value.id) {
        car.owner = '';
        car.buyDate = '';
      }
      saveDataToLocalStorage(cars, 'cars');
    });
  }
  if (tableData === 'cars') {
    removeCarFromCarList(value, 'persons');
    removeCarFromCarList(value, 'companies');
    saveDataToLocalStorage(persons, 'persons');
    saveDataToLocalStorage(cars, 'cars');
  }
  const masterObj = getCurrentObj(tableData);
  deleteFromObjAndHtml(value, masterObj);
}

function deleteFromObjAndHtml(obj, masterObj) {
  const mainTable = $('.main-table')[0];
  for (let data of mainTable.children) {
    if (parseInt(data.dataset.id) === obj.id) {
      data.remove();

      Object.values(masterObj).forEach((value, index) => {
        if (value.id === obj.id) {
          masterObj.splice(index, 1);
          const tableName = getTableDataSet();
          saveDataToLocalStorage(masterObj, tableName);
        }
      });
    }
  }
}

function creatTableCarHandler(action) {
  closeCarTable();
  const formWrapper = $('.form__wrapper');
  const div = creatHtmlElement('', 'div', ['tabel_car__wrapper']);
  const carTable = creatHtmlElement('', 'table', ['Car__table']);
  const closeBtn = creatHtmlElement('x', 'button', ['close-table-btn']);
  $(closeBtn).click(closeCarTable);
  const tr = creatHtmlElement('', 'tr', []);

  const tdId = creatHtmlElement('Id', 'td', []);
  const tdName = creatHtmlElement('Name', 'td', []);
  const tdPrice = creatHtmlElement('Price', 'td', []);
  const tdActions = creatHtmlElement('Action', 'td', ['table-actions']);

  $(tr)
    .append(tdId, tdName, tdActions, tdPrice)
    .appendTo(carTable);

  const money = parseInt($('input[name="money"]').val());
  const tableData = getTableDataSet();
  const currentObj = getCurrentObj(tableData);

  let rezaultTable;
  if (action === 'buy') {
    rezaultTable = creatBuyCarTable(money);
  }
  if (action === 'sell') {
    rezaultTable = creatSellCarTable(currentObj);
  }
  if (rezaultTable) {
    $(carTable)
      .append(fragment)
      .click(e => selectedCarHandler(e));
    $(div)
      .append(closeBtn, carTable)
      .appendTo(formWrapper);
  }
}

function creatBuyCarTable(money) {
  const carsList = cars.filter(element => element.owner === '' && element.price <= money);
  if (carsList.length === 0) {
    showPatternMsg('Sorry, all cars bought or not enough money.', 'alert-danger');
    return false;
  }
  carsList.forEach(elem => {
    const tr = creatTableRow(elem.id, elem.name);
    const tdPrice = creatHtmlElement(elem.price, 'td', []);
    const td = creatHtmlElement('', 'td', []);
    const buyBtn = creatHtmlElement('Buy', 'button', ['buy__car__btn', 'btn', 'btn-success']);
    $(td).append(buyBtn);
    $(tr)
      .children()
      .last()
      .replaceWith(td);
    $(tr)
      .append(tdPrice)
      .appendTo(fragment);
  });
  return true;
}

function creatSellCarTable(currentObj) {
  const seller = currentObj.filter(obj => obj.id === parseInt($('input[name="id"]').val()))[0];
  if (seller.car.length === 0) {
    showPatternMsg('Sorry, nothing to sell.', 'alert-danger');
    return false;
  }
  seller.car.forEach(car => {
    const carOnSale = cars.filter(carObj => carObj.id === car)[0];
    const tr = creatTableRow(carOnSale.id, carOnSale.name);
    const td = creatHtmlElement('', 'td', []);
    const tdPrice = creatHtmlElement(carOnSale.price - carOnSale.price * 0.3, 'td', []);
    const sellBtn = creatHtmlElement('Sell', 'button', ['sell__car__btn', 'btn', 'btn-danger']);
    $(td).append(sellBtn);
    $(tr)
      .children()
      .last()
      .replaceWith(td);
    $(tr)
      .append(tdPrice)
      .appendTo(fragment);
  });
  return true;
}

function selectedCarHandler({ target }) {
  const form = document.forms.mainForm;
  const id = parseInt(getDataId(target));
  const tableData = getTableDataSet();
  const car = getClickedCard(id, 'cars');
  const currentObj = getCurrentObj(tableData);

  if ($(target).hasClass('buy__car__btn')) {
    car.owner = $('input[name="id"]').val();
    car.buyDate = setCurrentDate();
    saveDataToLocalStorage(cars, 'cars');
    const buyer = currentObj.filter(obj => obj.name === $('input[name="name"]').val())[0];
    buyer.car.push(car.id);
    form.elements.money.value -= car.price;
    $('input[name="car"]').val(getName(buyer.car, cars));
    buyer.money = parseInt($('input[name="money"]').val());
    showPatternMsg(`Congratulations! You bought ${car.name}. Total price ${car.price} $`,'alert-success');
    saveDataToLocalStorage(currentObj, tableData);
    delTableRow(target);
    closeCarTable();
  }
  if ($(target).hasClass('sell__car__btn')) {
    const seller = currentObj.filter(obj => obj.name === $('input[name="name"]').val())[0];
    let proceeds = 0;
    seller.car.forEach((carFromArr, index) => {
      if (carFromArr === car.id) {
        car.owner = '';
        car.buyDate = '';
        seller.car.splice(index, 1);
        $('input[name="car"]').val(getName(seller.car, cars));
        proceeds = car.price - car.price * 0.3;
        form.elements.money.value =
          parseInt($('input[name="money"]').val()) + car.price - car.price * 0.3;
        seller.money = parseInt($('input[name="money"]').val());
        delTableRow(target);
        closeCarTable();
      }
    });
    showPatternMsg(`You sold ${car.name}. Total price ${proceeds} $ (-30%)`, 'alert-success');
    saveDataToLocalStorage(cars, 'cars');
    saveDataToLocalStorage(currentObj, tableData);
  }
}

function delTableRow(target) {
  const tr = document.querySelectorAll('.main-table-row');
  for (let data of tr) {
    if (data.contains(target)) {
      data.remove();
    }
  }
}

function checkValidFormField() {
  let status = true;
  const form = document.forms.mainForm;
  const tableData = getTableDataSet();
  for (let input of form.elements) {
    if (input.name !== 'car' && input.name !== 'owner' && input.name !=='buyDate') {
      if (input.value.length === 0) {
        $(input).addClass('error__input');
        showPatternMsg('Fill the Fields', 'alert-danger');
        return false;
      }
      if (patternCollection[tableData].hasOwnProperty(input.name)) {
        const regExp = new RegExp(patternCollection[tableData][input.name].pattern);
        const isValid = regExp.test(input.value);
        if (!isValid) {
          $(input).addClass('error__input');
          showPatternMsg(patternCollection[tableData][input.name].msg, 'alert-danger');
          return false;
        } else {
          removeInputError(true);
        }
      }
    }
  }
  return status;
}

function showPatternMsg(msg, msgStatus) {
  const modal = document.getElementById('modalMsg');
  modal.querySelector('.modal-body').textContent = msg;
  const closeBtn = creatHtmlElement('Close', 'button', ['btn', 'btn-secondary']);
  $(closeBtn).attr({
    'type': 'button',
    ['data-dismiss']: 'modal',
  }).appendTo('.modal-footer');

  switch (msgStatus) {
    case 'alert-danger':
      modal.querySelector('.modal-title').textContent = 'Alert';
      $('.modal-header').addClass('alert-danger');
      break;
    case 'alert-success':
      modal.querySelector('.modal-title').textContent = 'Success!';
      $('.modal-header').addClass('alert-success');
      break;
  }
  $(modal).modal('show');

  $(modal).on('hidden.bs.modal', () => {
    $('.modal-header').removeClass('alert-danger');
    $('.modal-header').removeClass('alert-success');
    $(closeBtn).remove();
  });
}

function removeInputError(vailid) {
  const form = document.forms.mainForm;
  for (let input of form.elements) {
    if (input.value !== '' && vailid) {
      $(input).removeClass('error__input');
    }
  }
}

function addActiveClass(target) {
  $(target).addClass('active');
}

function removeActiveClass() {
  for (let btn of navigationWrapper.children) {
    if ($(btn).hasClass('active')) {
      $(btn).removeClass('active');
    }
  }
}

function closeCarTable() {
  const formWrapper = $('.form__wrapper')[0];
  for (let child of formWrapper.children) {
    if ($(child).hasClass('tabel_car__wrapper')) {
      child.remove();
    }
  }
}

function getName(idArr, obj) {
  let names = [];
  idArr.forEach(id => {
    const objName = obj.filter(el => el.id === id)[0];
    if (objName) {
      names.push(objName.name);
    }
  });
  return names;
}

function getOwner(value) {
  const arr = [persons, companies];
  const creatOwnerArr = [Number(value)];
  let ownerName = '';
  arr.forEach(obj => {
    const name = getName(creatOwnerArr, obj).toString();
    if (name) {
      ownerName = name;
    }
  });
  return ownerName;
}

function setCurrentDate() {
  return moment().format('MMM Do YYYY, hh:mm a');
}

function getDate(date) {
  return moment(date, 'MMM Do YYYY, hh:mm a').format('MMM Do YYYY, hh:mm a');
}
