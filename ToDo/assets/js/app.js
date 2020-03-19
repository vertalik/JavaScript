'use strict';
let statusList = [];
let priorityList = [];
let defTasks = [];
let tasksList = [];

const root = document.getElementById('app');
const fragment = document.createDocumentFragment();


window.addEventListener('DOMContentLoaded', () => {
  initApp();
});

