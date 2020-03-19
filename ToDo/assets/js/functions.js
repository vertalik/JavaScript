'use strict';

function creatHtmlElement(parent, elementName, elementTag, elementClassArr) {
  const el = document.createElement(elementTag);
  elementClassArr.forEach(classElement => {
    el.classList.add(classElement);
  });
  el.textContent = elementName;
  if (parent) {
    parent.appendChild(el);
  }
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
  return Math.random()
    .toFixed(5)
    .slice(2);
}

function creatTaskTemplate(task) {
  const tr = creatHtmlElement('', '', 'tr', ['task__item']);
  creatHtmlElement(tr, task.id, 'td', ['id__wrapper']);
  creatHtmlElement(tr, task.name, 'td', ['name__wrapper']);
  creatHtmlElement(tr, task.status, 'td', ['status__wrapper']);
  creatHtmlElement(tr, task.priority, 'td', ['priority__wrapper']);
  const actions = creatHtmlElement(tr, '', 'td', ['actions__wrapper']);
  creatHtmlElement(actions, 'Edit', 'button', ['edit__btn', 'btn', 'btn-primary']);
  creatHtmlElement(actions, 'Delete', 'button', ['delete__btn', 'btn', 'btn-danger']);
  const bgStatus = setStatusColor(task.status);
  tr.classList.add(bgStatus);
  tr.dataset.id = task.id;
  return tr;
}

function setStatusColor(status) {
  switch (status) {
    case 'Done':
      return 'status-done';
    case 'In progress':
      return 'status-inProgress';
    case 'Open':
      return 'status-open';
  }
}

function initApp() {
  const contentWrapper = creatHtmlElement(root, '', 'div', ['content__wrapper']);
  const navWrapper = creatHtmlElement(contentWrapper, '', 'div', ['navigation__wrapper']);
  const input = creatHtmlElement(navWrapper, '', 'input', ['add-new-task__input']);
  input.setAttribute('placeholder', 'Enter the task');
  const label = creatHtmlElement(navWrapper, 'Priority', 'label', ['priority-label']);
  const prioritySelect = creatHtmlElement(label, '', 'select', ['priority-select__container']);
  prioritySelect.insertAdjacentHTML('afterbegin', '<option value="empty">----</option>');
  const addNewTaskBtn = creatHtmlElement(navWrapper, 'Add New Task', 'button', [
    'add-new-task__btn',
    'btn',
    'btn-success',
  ]);
  addNewTaskBtn.addEventListener('click', () => {
    addTaskHandler(input, prioritySelect);
  });
  contentWrapper.appendChild(navWrapper);

  const tasksContainer = creatHtmlElement(contentWrapper, '', 'table', ['task__container']);
  const tr = creatHtmlElement(tasksContainer, '', 'tr', ['table-header']);
  creatHtmlElement(tr, 'Id', 'td', []);
  creatHtmlElement(tr, 'Task', 'td', []);
  creatHtmlElement(tr, 'Status', 'td', []);
  creatHtmlElement(tr, 'Priority', 'td', []);
  creatHtmlElement(tr, 'Actions', 'td', []);

  getDataJson();

  tasksContainer.addEventListener('click', e => {
    tasksListHandler(e);
  });
}

function addOptionToSelect(target, value) {
  value.forEach(elem => {
    target.insertAdjacentHTML('beforeend', `<option value="${elem}">${elem}</option>`);
  });
}

function loadTasks() {
  const tasksContainer = document.querySelector('table');
  tasksList = loadFromLocalStorage('toDoList') || defTasks;

  tasksList.forEach(task => {
    if (!statusList.includes(task.status) && priorityList.includes(task.priority)) {
      task.status = 'Not Defined';
    }
    if (statusList.includes(task.status) && !priorityList.includes(task.priority)) {
      task.priority = 'Not Defined';
    }
    if (!statusList.includes(task.status) && !priorityList.includes(task.priority)) {
      task.status = 'Not Defined';
      task.priority = 'Not Defined';
    }
    const taskHtml = creatTaskTemplate(task);
    fragment.appendChild(taskHtml);
  });
  tasksContainer.appendChild(fragment);
}

function tasksListHandler({ target }) {
  const actionCollection = ['delete__btn', 'edit__btn'];

  for (let item of target.classList) {
    if (actionCollection.includes(item)) {
      const parent = getParent(target);
      const id = parent.dataset.id;
      const task = tasksList.filter(element => element.id === id)[0];
      getTaskAction(item, task, parent);
    }
  }
}

function getParent(target) {
  const trCollection = document.querySelectorAll('tr');
  for (let tr of trCollection) {
    if (tr.contains(target)) {
      return tr;
    }
  }
}

function getTaskAction(name, task, parent) {
  switch (name) {
    case 'delete__btn':
      deleteTask(task, parent);
    case 'edit__btn':
      editTask(task, parent);
  }
}

function deleteCurrentTaskFromHtml(id) {
  const tasksCollection = document.querySelectorAll('tr');
  tasksCollection.forEach(task => {
    if (task.dataset.id === id) {
      task.remove();
    }
  });
}

function deleteTaskFromTaskList(id) {
  tasksList.forEach((task, index) => {
    if (task.id === id) {
      tasksList.splice(index, 1);
      saveDataToLocalStorage(tasksList, 'toDoList');
    }
  });
}

function getDataJson() {
  const priority = document.querySelector('.priority-select__container');

  fetch('./assets/js/data.json')
    .then(responce => responce.json())
    .then(content => parseJsonData(content))
    .then(() => addOptionToSelect(priority, priorityList))
    .then(() => loadTasks())
    .catch(err => console.log(err));
}

function parseJsonData(data) {
  Object.entries(data).forEach(([key, value]) => {
    switchTargetToPush(key, value);
  });
}

function switchTargetToPush(key, value) {
  switch (key) {
    case 'status':
      return pushDataToArr(value, statusList);
    case 'priority':
      return pushDataToArr(value, priorityList);
    case 'tasks':
      return pushDataToArr(value, defTasks);
  }
}

function pushDataToArr(data, target) {
  data.forEach(element => {
    target.push(element);
  });
}

function editTask(task, parent) {
  const tdInput = creatHtmlElement('', '', 'td', []);
  const input = creatHtmlElement(tdInput, '', 'input', []);
  input.setAttribute('name', 'name');
  input.setAttribute('value', task.name);
  const taskName = parent.querySelector('.name__wrapper');
  taskName.replaceWith(input);

  const tdStatus = creatHtmlElement('', '', 'td', ['label-status']);
  const status = creatHtmlElement(tdStatus, '', 'select', ['status-edit']);
  addOptionToSelect(status, statusList);
  status.value = task.status;
  const statusSelect = parent.querySelector('.status__wrapper');
  statusSelect.replaceWith(tdStatus);

  const tdPriority = creatHtmlElement('', '', 'td', ['label-priority']);
  const priority = creatHtmlElement(tdPriority, '', 'select', ['priority-edit']);
  addOptionToSelect(priority, priorityList);
  priority.value = task.priority;
  const prioritySelect = parent.querySelector('.priority__wrapper');
  prioritySelect.replaceWith(tdPriority);

  parent.querySelector('.actions__wrapper').remove();

  const tdBtn = creatHtmlElement('', '', 'td', ['save-btn__wrapper']);
  const saveBtn = creatHtmlElement(tdBtn, 'Save', 'button', ['save-btn', 'btn', 'btn-primary']);
  saveBtn.dataset.id = task.id;
  parent.appendChild(tdBtn);
  saveBtn.addEventListener('click', () => {
    saveTaskHandler(input, status, priority, task.id);
  });
}

function saveTaskHandler(input, status, priority, taskId) {
  const id = taskId;
  const task = tasksList.filter(task => task.id === id)[0];
  const isValid = validInputData('editTask');
  if (input.value && isValid) {
    task.name = input.value;
    task.status = status.value;
    task.priority = priority.value;
    const tr = creatTaskTemplate(task);
    const parent = input.parentElement;
    parent.replaceWith(tr);
    saveDataToLocalStorage(tasksList, 'toDoList');
  }
}

function addTaskHandler(input, priority) {
  const getRandomId = creatRandomId();
  const checkData = validInputData('newTask');
  if (!checkData) {
    return;
  }
  const newTaskObj = {
    id: getRandomId,
    name: input.value,
    status: getDefaultStatus(),
    priority: priority.value,
  };
  tasksList.push(newTaskObj);
  saveDataToLocalStorage(tasksList, 'toDoList');

  const tr = creatTaskTemplate(newTaskObj);
  const tasksContainer = document.querySelector('.task__container');
  tasksContainer.appendChild(tr);
  input.value = '';
  priority.value = 'empty';
}

function getDefaultStatus() {
  if (statusList.includes('Open')) {
    return 'Open';
  } else {
    return 'Not Defined';
  }
}

function validInputData(taskField) {
  let status = true;
  const inputTask = document.querySelector('.add-new-task__input');
  const priorityList = document.querySelector('.priority-select__container');
  const inputEdit = document.querySelector('input[name="name"]');
  const priorityEdit = document.querySelector('.priority-edit');
  const statusEdit = document.querySelector('.status-edit');

  switch (taskField) {
    case 'newTask':
      tasksList.forEach(task => {
        if (inputTask.value === task.name) {
          showMsg('This task is exist');
          status = false;
          return;
        }
      })
      if (inputTask.value === '') {
        showMsg('Enter the task');
        status = false;
        break;
      }
      if (priorityList.value === 'empty') {
        showMsg('Select the task priority');
        status = false;
        break;
      }
      break;
    case 'editTask':
      if (inputEdit.value === '') {
        showMsg('Enter the task');
        status = false;
        break;
      }
      if (priorityEdit.value === '') {
        showMsg('Select the task priority');
        status = false;
        break;
      }
      if (statusEdit.value === '') {
        showMsg('Select the task status');
        status = false;
        break;
      }
      break;
  }
  return status;
}

function showMsg(msg) {
  const target = document.querySelector('.content__wrapper');
  const msgElement = creatHtmlElement(target, msg, 'div', ['msg', 'alert', 'alert-danger']);
  target.insertAdjacentElement('beforebegin', msgElement);
  setTimeout(removeMsg, 3000);
}

function removeMsg() {
  const msg = document.querySelector('.msg');
  if (msg) {
    msg.remove();
  }
}

function deleteTask(task, parent) {
  const deleteMsgWrapper = creatHtmlElement('', '', 'tr', [
    'delete-msg__wrapper',
    'alert',
    'alert-danger',
  ]);
  deleteMsgWrapper.dataset.id = task.id;
  const tdMsg = creatHtmlElement(
    deleteMsgWrapper,
    `Do you really want to delete "${task.name}" ?`,
    'td',
    ['delete-msg']
  );
  tdMsg.setAttribute('colspan', 4);
  const actionsBtn = creatHtmlElement(deleteMsgWrapper, '', 'td', ['actions__wrapper']);
  const yesBtn = creatHtmlElement(actionsBtn, 'Yes', 'button', ['yes-btn', 'btn', 'btn-success']);
  const noBtn = creatHtmlElement(actionsBtn, 'No', 'button', ['no-btn', 'btn', 'btn-danger']);

  parent.replaceWith(deleteMsgWrapper);

  deleteMsgWrapper.addEventListener('click', ({ target }) => {
    if (target.contains(yesBtn)) {
      deleteCurrentTaskFromHtml(task.id);
      deleteTaskFromTaskList(task.id);
    }
    if (target.contains(noBtn)) {
      deleteMsgWrapper.replaceWith(creatTaskTemplate(task));
    }
  });
}
