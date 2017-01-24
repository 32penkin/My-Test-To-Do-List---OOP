function InputForm(name, list) {
  this.elem = document.createElement('div');
  this.name = name;
  this.list = list;


  this.sendNewItem = function (value) {
    if (!value || value === '' || value === ' ') return false;
    this.list.addNewItem(new ToDoItem(value, false, false, list));
    list.render();
  };

  this.render = function () {
    var nameOfListContainer = document.createElement('div');
    nameOfListContainer.className = 'hat';
    var nameOfList = document.createElement('h1');
    nameOfList.innerText = this.name;
    nameOfListContainer.appendChild(nameOfList);
    this.elem.appendChild(nameOfListContainer);

    var inputForm = document.createElement('input');
    inputForm.focus();
    inputForm.type = 'text';
    inputForm.placeholder = 'Add task here';
    inputForm.className = 'text1';
    this.elem.appendChild(inputForm);

    var addButton = document.createElement('button');
    addButton.className = 'addButton';
    var iconAdd = document.createElement('i');
    iconAdd.className = 'fa fa-plus';
    addButton.appendChild(iconAdd);
    this.elem.appendChild(addButton);

    var that = this;
    addButton.onclick = function () {
      that.sendNewItem(inputForm.value);
      inputForm.focus();
      inputForm.select();
    };

    inputForm.onkeyup = function (event) {
      if (event.which === 13) {
        that.sendNewItem(inputForm.value);
        inputForm.focus();
        inputForm.select();
      }
    };
    return this.elem;
  };
};

function FooterOfList(str) {
  this.str = str;
  this.elem = document.createElement('p');
  this.render = function () {
    this.elem.innerText = this.str;
    return this.elem;
  };
};

function FiltersOfList(list) {
  this.list = list;
  this.elem = document.createElement('ul');
  this.currentFilter = '';

  this.render = function () {
    //-------------------------------------------------------
    var showAllContainer = document.createElement('li');
    var showAllButton = document.createElement('button');
    showAllButton.innerText = 'All';
    showAllButton.className = this.currentFilter === 'All' ? 'filtered_button' : '';
    showAllContainer.appendChild(showAllButton);
    this.elem.appendChild(showAllContainer);
    //-------------------------------------------------------
    var showActiveContainer = document.createElement('li');
    var showActiveButton = document.createElement('button');
    showActiveButton.innerText = 'Active';
    showActiveButton.className = this.currentFilter === 'Active' ? 'filtered_button' : '';
    showActiveContainer.appendChild(showActiveButton);
    this.elem.appendChild(showActiveContainer);
    //-------------------------------------------------------
    var showCompletedContainer = document.createElement('li');
    var showCompletedButton = document.createElement('button');
    showCompletedButton.innerText = 'Completed';
    showCompletedButton.className = this.currentFilter === 'Completed' ? 'filtered_button' : '';
    showCompletedContainer.appendChild(showCompletedButton);
    this.elem.appendChild(showCompletedContainer);
    //-------------------------------------------------------
    var deleteCompletedContainer = document.createElement('li');
    var deleteCompletedButton = document.createElement('button');
    deleteCompletedButton.innerText = 'Clear completed';
    deleteCompletedContainer.appendChild(deleteCompletedButton);
    this.elem.appendChild(deleteCompletedContainer);

    var tempList = this.list;
    var that = this;
    showAllButton.onclick = function () {
      that.currentFilter = 'All';
      tempList.getAll();
      that.elem.innerHTML = '';
      that.render();
      
    };

    showActiveButton.onclick = function () {
      that.currentFilter = 'Active';
      tempList.getActive();
      that.elem.innerHTML = '';
      that.render();
     
    };

    showCompletedButton.onclick = function () {
      that.currentFilter = 'Completed';
      tempList.getCompleted();
      that.elem.innerHTML = '';
      that.render();
      
    };

    deleteCompletedButton.onclick = function () {
      tempList.deleteCompleted();
      that.elem.innerHTML = '';
      that.render();
    };
    
    return this.elem;
  };

};


function ToDoList() {
  this.elem = document.createElement('ul');
  this.itemsArr = [];

  this.addNewItem = function (item) {
    this.itemsArr.push(item);
    item.render();
  };
  this.deleteItem = function (instance) {
    this.itemsArr = this.itemsArr.filter(function (item) {
      return item !== instance;
    });
    this.render();
  };
  this.getAll = function () {
    this.render();
  };
  this.getActive = function () {
    var temp = this.itemsArr;
    this.itemsArr = this.itemsArr.filter(function (item) {
      if (item.checked === false) return item;
    });
    this.render();
    this.itemsArr = temp;
  };
  this.getCompleted = function () {
    var temp = this.itemsArr;
    this.itemsArr = this.itemsArr.filter(function (item) {
      if (item.checked === true) return item;
    });
    this.render();
    this.itemsArr = temp;
  };
  this.deleteCompleted = function () {
    this.itemsArr = this.itemsArr.filter(function (item) {
      if (item.checked === false) return item;
    });
    this.render();
  };

  this.render = function () {
    this.elem.innerHTML = '';
    var that = this;
    that.itemsArr.forEach(function (item) {
      that.elem.appendChild(item.render());
    });

    return this.elem;
  };

};


function ToDoItem(value, checked, edit, list) {
  this.value = value;
  this.checked = checked;
  this.edit = edit;
  this.list = list;

  this.elem = document.createElement('li');

  this.setChecked = function () {
    this.checked = !this.checked;
    this.render();
    return false;
  };

  this.setEdit = function () {
    this.edit = !this.edit;
    this.render();
    return false;
  };

  this.render = function () {
    this.elem.innerHTML = '';
    this.elem.className = 'view';

    if (this.edit === true) {
      var internalElement = document.createElement('input');
      internalElement.type = 'text';
      internalElement.value = this.value;
      internalElement.className = 'int_el';
    } else {
      var internalElement = document.createElement('span');
      internalElement.className = (this.checked === true) ? 'checked' : '';
      internalElement.innerHTML = this.value;
    }

    var fontAweTest = document.createElement('i');
    fontAweTest.className = 'fa fa-hand-o-right';

    var tBar = document.createElement('div');
    tBar.className = 'tBar';

    var doneButton = document.createElement('button');
    doneButton.setAttribute('title', 'Click to check todo');
    var iconCh = document.createElement('i');
    iconCh.className = 'fa fa-check';
    doneButton.className = 'check';
    doneButton.appendChild(iconCh);


    var editButton = document.createElement('button');
    editButton.setAttribute('title', 'Click to edit todo');
    var iconEdit = document.createElement('i');
    var iconEdit1 = document.createElement('i');
    iconEdit.className = 'fa fa-pencil-square-o';
    iconEdit1.className = 'fa fa-check-circle-o';
    editButton.className = 'edit';
    if (this.edit === true) {
      editButton.appendChild(iconEdit1);
    } else {
      editButton.appendChild(iconEdit);
    }

    var deleteButton = document.createElement('button');
    deleteButton.setAttribute('title', 'Click to delete todo');
    var iconDel = document.createElement('i');
    iconDel.className = 'fa fa-times';
    deleteButton.className = 'del';
    deleteButton.appendChild(iconDel);

    tBar.appendChild(doneButton);
    tBar.appendChild(editButton);
    tBar.appendChild(deleteButton);
    this.elem.appendChild(fontAweTest);
    this.elem.appendChild(internalElement);
    this.elem.appendChild(tBar);

    var instance = this;
    doneButton.onclick = function () {
      instance.setChecked();
    };

    editButton.onclick = function () {
      if (instance.edit === true) instance.value = internalElement.value;
      instance.setEdit();
    };
    internalElement.onkeyup = function (event) {
      if (event.which === 13) {
        if (instance.edit === true) instance.value = internalElement.value;
        instance.setEdit();
      }
    };

    var parentList = this.list;
    deleteButton.onclick = function () {
      //debugger;
      parentList.deleteItem(instance);
      instance.render();
    };

    return this.elem;
  };

};


var myToDoList = new ToDoList();
var myInputForm = new InputForm('toDos', myToDoList);
var myFilterOfList = new FiltersOfList(myToDoList);
var myFooterOfList = new FooterOfList('Press Enter to add todo');

document.getElementsByTagName('header')[0].appendChild(myInputForm.render());
document.getElementsByTagName('main')[0].appendChild(myToDoList.render());
document.getElementsByTagName('footer')[0].appendChild(myFilterOfList.render());
document.getElementsByTagName('footer')[1].appendChild(myFooterOfList.render());