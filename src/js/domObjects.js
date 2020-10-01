/* eslint-disable eqeqeq */
/* eslint-disable no-use-before-define */
import todoItems from './todoItem';

const TodoListItem = (list) => {
  const liDone = false;
  const li = document.createElement('li');
  const liForm = document.createElement('form');

  const liTitleDiv = document.createElement('div');
  const liTitle = document.createElement('input');
  liTitle.required = true;
  liTitle.type = 'text';
  liTitle.placeholder = 'Enter task title...';
  const liCheck = document.createElement('i');
  const liDelete = document.createElement('i');
  const liCaret = document.createElement('i');
  const liToggleDetail = document.createElement('a');

  const liDetail = document.createElement('div');
  const liDetailTop = document.createElement('div');
  const liDescription = document.createElement('textarea');
  liDescription.placeholder = 'Enter task details...';

  const liDetailBottom = document.createElement('div');
  const liDue = document.createElement('div');
  const liDueInput = document.createElement('input');
  liDueInput.type = 'date';
  liDueInput.value = new Date().toISOString().substring(0, 10);
  const liDueLbl = document.createElement('label');
  liDueLbl.innerHTML = 'Due:';

  const liPriority = document.createElement('div');
  const liPriorityLbl = document.createElement('label');
  liPriorityLbl.innerHTML = 'Priority';
  const liPriorityInput = document.createElement('select');

  const liBtns = document.createElement('div');
  const saveBtnIcon = document.createElement('i');
  const saveBtn = document.createElement('button');
  saveBtn.type = 'submit';
  const cancelBtn = document.createElement('i');

  li.classList = 'list-group-item p-0';
  liCheck.classList = 'far fa-circle m-2';
  liTitleDiv.classList = 'd-flex justify-content-between align-items-center';
  liTitle.classList = 'w-100 item-title';
  liDelete.classList = 'fas fa-times delete-btn';
  liCaret.classList = 'fas fa-chevron-down d-block m-2';

  liToggleDetail.classList = 'p-1 d-block';
  liToggleDetail.href = '#item-details-form';
  liToggleDetail.role = 'button';
  liToggleDetail['aria-expanded'] = 'false';
  liToggleDetail['aria-controls'] = 'item-details-form';

  liDetail.classList = 'collapse';
  liDetailTop.classList = 'form-group m-0';
  liDescription.classList = 'w-100 border-0 bg-light';
  liDetailBottom.classList = 'form-inline d-flex justify-content-end align-items-center';
  liDue.classList = 'form-group m-0';
  liDueLbl.classList = 'pr-1 m-0';
  liDueInput.classList = 'border-0 text-center';
  liPriority.classList = 'form-group m-0 d-flex flex-no-wrap';
  liPriorityLbl.classList = 'form-control border-0 pr-1 m-0';
  liPriorityInput.classList = 'form-control border-0';
  liBtns.classList = 'form-group m-0';
  cancelBtn.classList = 'fas fa-times-circle text-danger m-1';
  saveBtnIcon.classList = 'save-icon fas fa-check-circle text-success m-1';
  saveBtn.classList = 'save-btn bg-transparent border-0';

  saveBtn.appendChild(saveBtnIcon);
  liBtns.appendChild(cancelBtn);
  liBtns.appendChild(saveBtn);
  liPriority.appendChild(liPriorityLbl);
  liPriority.appendChild(liPriorityInput);

  for (let index = 1; index < 5; index += 1) {
    const opt = document.createElement('option');
    opt.innerHTML = index;
    liPriorityInput.appendChild(opt);
    if (index === 4) {
      opt.selected = 'selected';
    }
  }

  liDue.appendChild(liDueLbl);
  liDue.appendChild(liDueInput);
  liDetailTop.appendChild(liDescription);
  liDetailBottom.appendChild(liDue);
  liDetailBottom.appendChild(liPriority);
  liDetailBottom.appendChild(liBtns);
  liDetail.appendChild(liDetailTop);
  liDetail.appendChild(liDetailBottom);

  liToggleDetail.appendChild(liCaret);

  liTitleDiv.appendChild(liCheck);
  liTitleDiv.appendChild(liTitle);
  liTitleDiv.appendChild(liDelete);
  liTitleDiv.appendChild(liToggleDetail);

  liForm.appendChild(liTitleDiv);
  liForm.appendChild(liDetail);

  li.appendChild(liForm);

  const startEdit = () => {
    setTimeout(() => {
      liTitle.focus();
    }, 100);
  };

  const submit = (l) => {
    const i = { ...todoItems.Item };
    i.id = generateId(l.items);
    i.title = liTitle.value;
    i.description = liDescription.value;
    i.dueDate = liDueInput.value;
    i.priority = liPriorityInput.value;
    i.done = liDone.value;
    l.items.push(i);
  };

  const edit = (list, id) => {
    const listObjects = list.items;
    listObjects.forEach(item => {
      if (item.id == id) {
        item.title = liTitle.value;
        item.description = liDescription.value;
        item.dueDate = liDueInput.value;
        item.priority = liPriorityInput.value;
        item.done = liDone.value;
      }
    });
  };

  const deleteListItem = (list, id) => {
    const listObjects = list.items;
    listObjects.forEach(item => {
      if (item.id == id) {
        listObjects.splice(listObjects.indexOf(item), 1);
      }
    });
    updateList(list);
  };

  li.addEventListener('click', (e) => {
    if (e.target === liCaret || e.target === liToggleDetail) {
      liDetail.classList.toggle('collapse');
      liCaret.classList.toggle('fa-chevron-down');
      liCaret.classList.toggle('fa-chevron-up');
    }

    if (e.target === liCheck) {
      liCheck.classList.toggle('fa-check-circle');
      liCheck.classList.toggle('fa-circle');
    }

    if (e.target === liDelete) {
      li.remove();
      deleteListItem(list, li.dataset.id);
    }
  });

  liForm.addEventListener('submit', () => {
    if (li.dataset.new) {
      submit(list);
    } else {
      edit(list, li.dataset.id);
    }
    updateList(list);
  });

  const updateList = (list) => {
    let projectList;

    if (localStorage.getItem('projectlist')) {
      projectList = JSON.parse(localStorage.getItem('projectlist'));
    } else {
      projectList = todoItems.List;
      projectList.name = 'Projects';
    }
    projectList.items.forEach((element) => {
      if (element.name === list.name) {
        element.items = [...list.items];
      }
    });
    localStorage.setItem('projectlist', JSON.stringify(projectList));
  };

  return {
    li,
    startEdit,
    submit,
    title: liTitle,
    desc: liDescription,
    due: liDueInput,
    priority: liPriorityInput,
    done: liDone,
  };
};

const ProjectListItem = (list) => {
  const btn = document.createElement('button');
  const btnForm = document.createElement('form');
  const submit = document.createElement('button');
  submit.type = 'submit';
  const btnName = document.createElement('input');
  btn.classList = 'btn btn-info rounded-pill text-white p-1 m-1';
  btnName.classList = 'project-name w-100 font-weight-bold text-white';
  submit.classList = 'd-none';
  btn.appendChild(btnForm);
  btnForm.appendChild(btnName);
  btnForm.appendChild(submit);

  const startEdit = () => {
    setTimeout(() => {
      btnName.focus();
    }, 100);
  };

  btnForm.addEventListener('submit', () => {
    const newProject = { ...todoItems.List };
    newProject.name = btnName.value;
    newProject.items = [];
    list.items.push(newProject);

    const mainSection = document.getElementById('main-section');
    setTimeout(() => {
      const todo = TodoList(newProject);
      mainSection.innerHTML = '';
      mainSection.append(todo);
    }, 100);


    localStorage.setItem('projectlist', JSON.stringify(list));
  });

  return {
    startEdit, btn, name: btnName, form: btnForm,
  };
};

const ProjectList = (list) => {
  const listNode = document.createElement('div');
  const header = listHeader('Projects');
  const actualList = listBody(list, 'project');

  listNode.appendChild(header.container);
  listNode.appendChild(actualList);

  header.addButton.addEventListener('click', () => {
    const newProject = ProjectListItem(list);
    if (!actualList.querySelector('button[data-new=true]')) {
      actualList.insertBefore(newProject.btn, actualList.firstChild);
      newProject.btn.dataset.new = true;
      newProject.startEdit();
    }
  });

  actualList.addEventListener('click', (e) => {
    const mainSection = document.getElementById('main-section');
    const listName = e.target.dataset.name;
    list.items.forEach((item) => {
      if (listName === item.name) {
        setTimeout(() => {
          const todo = TodoList(item);
          mainSection.innerHTML = '';
          mainSection.append(todo);
        }, 100);
      }
    });
  });

  return listNode;
};

const TodoList = (list) => {
  const listNode = document.createElement('div');
  const header = listHeader(list.name);
  const actualList = listBody(list, 'todo');

  listNode.appendChild(header.container);
  listNode.appendChild(actualList);

  header.addButton.addEventListener('click', () => {
    const li = TodoListItem(list);
    if (!actualList.querySelector('li[data-new=true]')) {
      actualList.insertBefore(li.li, actualList.firstChild);
      li.li.dataset.new = true;
      li.startEdit();
    }
  });

  return listNode;
};



export default { TodoListItem, TodoList, ProjectList };
