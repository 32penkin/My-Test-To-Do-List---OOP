class InputForm {
  constructor(name, list) {
    this.name = name;
    this.list = list;
    this.elem = document.createElement('div');
  }
  sendNewItem(value) {
    if(!value.trim().replace(' ', '')) return false;
    this.list.addNewItem(new ToDoItem(value, false, false, this.list));
    this.list.render();
  }
  render() {
    let nameOfListContainer = document.createElement('div');
    nameOfListContainer.className = 'hat';
    let nameOfList = document.createElement('h1');
    nameOfList.innerText = this.name;
    nameOfListContainer.appendChild(nameOfList);
    this.elem.appendChild(nameOfListContainer);

    let inputForm = document.createElement('input');
    inputForm.focus();
    inputForm.type = 'text';
    inputForm.placeholder = 'Add task here';
    inputForm.className = 'text1';
    this.elem.appendChild(inputForm);

    let addButton = document.createElement('button');
    addButton.className = 'add-button';
    let iconAdd = document.createElement('i');
    iconAdd.className = 'fa fa-plus';
    addButton.appendChild(iconAdd);
    this.elem.appendChild(addButton);

    let that = this;
    addButton.onclick = function() {
      that.sendNewItem(inputForm.value);
      inputForm.focus();
      inputForm.select();
    };

    inputForm.onkeyup = function(event) {
      if(event.which === 13){
        that.sendNewItem(inputForm.value);
        inputForm.focus();
        inputForm.select();
      }
    };
    return this.elem;
  }
}

class FooterOfList {
  constructor(str) {
    this.str = str;
    this.elem = document.createElement('p');
  }
  render() {
    this.elem.innerText = this.str;
    return this.elem;
  }
}


class FiltersOfList {
  constructor(list) {
    this.list = list;
    this.elem = document.createElement('ul');
    this.currentFilter = '';
  }
  render() {
    //-------------------------------------------------------
    let showAllContainer = document.createElement('li');
    let showAllButton = document.createElement('button');
    showAllButton.innerText = 'All';
    showAllButton.className = this.currentFilter === 'All' ? 'filtered-button' : '';
    showAllContainer.appendChild(showAllButton);
    this.elem.appendChild(showAllContainer);
    //-------------------------------------------------------
    let showActiveContainer = document.createElement('li');
    let showActiveButton = document.createElement('button');
    showActiveButton.innerText = 'Active';
    showActiveButton.className = this.currentFilter === 'Active' ? 'filtered-button' : '';
    showActiveContainer.appendChild(showActiveButton);
    this.elem.appendChild(showActiveContainer);
    //-------------------------------------------------------
    let showCompletedContainer = document.createElement('li');
    let showCompletedButton = document.createElement('button');
    showCompletedButton.innerText = 'Completed';
    showCompletedButton.className = this.currentFilter === 'Completed' ? 'filtered-button' : '';
    showCompletedContainer.appendChild(showCompletedButton);
    this.elem.appendChild(showCompletedContainer);
    //-------------------------------------------------------
    let deleteCompletedContainer = document.createElement('li');
    let deleteCompletedButton = document.createElement('button');
    deleteCompletedButton.innerText = 'Clear completed';
    deleteCompletedContainer.appendChild(deleteCompletedButton);
    this.elem.appendChild(deleteCompletedContainer);

    let tempList = this.list;
    let that = this;
    showAllButton.onclick = function (){
      that.currentFilter = 'All';
      tempList.getAll();
      that.elem.innerHTML = '';
      that.render();
    };

    showActiveButton.onclick = function(){
      that.currentFilter = 'Active';
      tempList.getActive();
      that.elem.innerHTML = '';
      that.render();
    };

    showCompletedButton.onclick = function (){
      that.currentFilter = 'Completed';
      tempList.getCompleted();
      that.elem.innerHTML = '';
      that.render();
    };

    deleteCompletedButton.onclick = function (){
      that.currentFilter = 'All';
      tempList.deleteCompleted();
      that.elem.innerHTML = '';
      that.render();
    };
    return this.elem;
  }
}

class ToDoList {
  constructor() {
    this.elem = document.createElement('ul');
    this.itemsArr = [];
  }
  addNewItem(item) {
    this.itemsArr.push(item);
    item.render();
  }
  deleteItem(instance) {
    this.itemsArr = this.itemsArr.filter( item => item !== instance );
    this.render();
  }
  getAll() {
    this.render();
  }
  getActive() {
    let temp = this.itemsArr;
    this.itemsArr = this.itemsArr.filter( item => !item.checked );
    this.render();
    this.itemsArr = temp;
  }
  getCompleted() {
    let temp = this.itemsArr;
    this.itemsArr = this.itemsArr.filter( item => item.checked );
    this.render();
    this.itemsArr = temp;
  }
  deleteCompleted() {
    this.itemsArr = this.itemsArr.filter(item => !item.checked );
    this.render();
  }
  render() {
    this.elem.innerHTML = '';
    let that = this;
    that.itemsArr.forEach( function(item) {
      that.elem.appendChild(item.render());
    });
    return this.elem;
  }
}


class ToDoItem {
  constructor(value, checked, edit, list){
    this.value = value;
    this.checked = checked;
    this.edit = edit;
    this.list = list;
    this.elem = document.createElement('li');
  }
  setChecked() {
    this.checked = !this.checked;
    this.render();
    return false;
  }
  setEdit() {
    this.edit = !this.edit;
    this.render();
    return false;
  }
  render() {
    this.elem.innerHTML = '';
    this.elem.className = 'view';

    if (this.edit) {
      var internalElement = document.createElement('input');
      internalElement.type = 'text';
      internalElement.value = this.value;
      internalElement.className = 'int-el';
    } else {
      var internalElement = document.createElement('span');
      internalElement.className = (this.checked) ? 'checked' : '';
      internalElement.innerHTML = this.value;
    }

    let fontAweTest = document.createElement('i');
    fontAweTest.className = 'fa fa-hand-o-right';

    let toolBar = document.createElement('div');
    toolBar.className = 'toolBar';

    let doneButton = document.createElement('button');
    doneButton.setAttribute('title', 'Click to check todo');
    let iconCh = document.createElement('i');
    iconCh.className = 'fa fa-check';
    doneButton.className = 'check';
    doneButton.appendChild(iconCh);


    let editButton = document.createElement('button');
    editButton.setAttribute('title', 'Click to edit todo');
    let iconEdit = document.createElement('i');
    let iconSave = document.createElement('i');
    iconEdit.className = 'fa fa-pencil-square-o';
    iconSave.className = 'fa fa-check-circle-o';
    editButton.className = 'edit';
    if(this.edit){ editButton.appendChild(iconSave); }
    else { editButton.appendChild(iconEdit); }

    let deleteButton = document.createElement('button');
    deleteButton.setAttribute('title', 'Click to delete todo');
    let iconDel = document.createElement('i');
    iconDel.className = 'fa fa-times';
    deleteButton.className = 'del';
    deleteButton.appendChild(iconDel);

    toolBar.appendChild(doneButton);
    toolBar.appendChild(editButton);
    toolBar.appendChild(deleteButton);
    this.elem.appendChild(fontAweTest);
    this.elem.appendChild(internalElement);
    this.elem.appendChild(toolBar);

    let instance = this;
    doneButton.onclick = function (){
      instance.setChecked();
    };
    editButton.onclick = function (){
      if (instance.edit) instance.value = internalElement.value;
      instance.setEdit();
    };
    internalElement.onkeyup = function(event){
      if(event.which === 13){
        if (instance.edit) instance.value = internalElement.value;
        instance.setEdit();
      }
    };
    let parentList = this.list;
    deleteButton.onclick = function (){
      parentList.deleteItem(instance);
      instance.render();
    };

    return this.elem;
  }
}


let myToDoList = new ToDoList();
let myInputForm = new InputForm('toDos', myToDoList);
let myFilterOfList = new FiltersOfList(myToDoList);
let myFooterOfList = new FooterOfList('Press Enter to add todo');

document.getElementsByTagName('header')[0].appendChild(myInputForm.render());
document.getElementsByTagName('main')[0].appendChild(myToDoList.render());
document.getElementsByTagName('footer')[0].appendChild(myFilterOfList.render());
document.getElementsByTagName('footer')[1].appendChild(myFooterOfList.render());