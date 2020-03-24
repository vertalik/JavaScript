'use strict';

const persons = loadFromLocalStorage('persons') || personsData;
const cars = loadFromLocalStorage('cars') || carsData;
const companies = loadFromLocalStorage('companies') || companyData;

const tableArray = {
  persons: persons,
  cars: cars,
  companies: companies
};

const fragment = document.createDocumentFragment();
const navigationWrapper = $('.navigation')[0];
const tableWrapper = $('.table__wrapper')[0];

creatNavigationBtn();
creatTable(persons, 'persons');
addActiveClass(navigationWrapper.firstChild);

const mainDataWrapper = $('.main-data__wrapper')[0];
