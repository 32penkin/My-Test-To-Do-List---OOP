class InputForm {
  constructor(name, list) {
    this.name = name;
    this.list = list;
    this.elem = document.getElementById('head');
    this.template = `<div class='hat'><h1>{{nameOfList}}</h1></div>
                     <input type='text' placeholder='Add task here' class='text1' id='inp'/>
                     <button class='add-button' id='addbtn'><i class='fa fa-plus'></i></button>`;
  }
  sendNewItem(value) {
    if(!value.trim()) return false;
    this.list.addNewItem(new ToDoItem(value, false, false, this.list));
    this.list.render();
  }
  render() {
    this.elem.innerHTML = Handlebars.compile(this.template)({'nameOfList': this.name});
    document.getElementById('inp').focus();
    let that = this;
    document.getElementById('addbtn').onclick = function(){
      that.sendNewItem(document.getElementById('inp').value);
      document.getElementById('inp').focus();
      document.getElementById('inp').select();
    };
    document.getElementById('inp').onkeyup = function(event) {
      if(event.which === 13){
        that.sendNewItem(document.getElementById('inp').value);
        document.getElementById('inp').focus();
        document.getElementById('inp').select();
      }
    };
    return this.elem;
  }
}

class FooterOfList {
  constructor(str) {
    this.str = str;
    this.template = '<p>{{str}}</p>';
  }
  render() {
    return Handlebars.compile(this.template)({'str': this.str});
  }
}

class FiltersOfList {
  constructor(list) {
    this.list = list;
    this.elem = document.getElementById('llist');
    this.template = `<li><button id='get_all' class='{{filteredButtonAllClass}}'>All</button></li>
                     <li><button id='get_active' class='{{filteredButtonActiveClass}}'>Active</button></li>
                     <li><button id='get_completed' class='{{filteredButtonCompletedClass}}'>Completed</button></li>
                     <li><button id='clear_completed'>Clear completed</button></li>`;
    this.currentFilter = '';
  }
  render() {
    this.elem.innerHTML = Handlebars.compile(this.template)({
      'filteredButtonAllClass': this.currentFilter === 'All' ? 'filtered-button' : '',
      'filteredButtonActiveClass': this.currentFilter === 'Active' ? 'filtered-button' : '',
      'filteredButtonCompletedClass': this.currentFilter === 'Completed' ? 'filtered-button' : ''
    });
    let tempList = this.list;
    let that = this;
    document.getElementById('get_all').onclick = function (){
      that.currentFilter = 'All';
      tempList.getAll();
      that.elem.innerHTML = '';
      that.render()
    };
    document.getElementById('get_active').onclick = function (){
      that.currentFilter = 'Active';
      tempList.getActive();
      that.elem.innerHTML = '';
      that.render();
    };
    document.getElementById('get_completed').onclick = function (){
      that.currentFilter = 'Completed';
      tempList.getCompleted();
      that.elem.innerHTML = '';
      that.render();
    };
    document.getElementById('clear_completed').onclick = function (){
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
    this.elem = document.getElementById('tList');
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
    this.template = `<i class='fa fa-hand-o-right'></i>
                     {{#if editCh}}
                        <input type = 'text' value = '{{value}}' class = 'int-el'/>
                     {{else}}
                        <span class='{{checkCh}}'>{{value}}</span>
                     {{/if}}
                     <div class='toolBar'>
                        <button class='check' title='Click to check todo'><i class='fa fa-check'></i></button>
                        {{#if editCh}}
                          <button class='edit' title='Click to save edition'><i class='fa fa-check-circle-o'></i></button>
                        {{else}}
                          <button class='edit' title='Click to edit todo'><i class='fa fa-pencil-square-o'></i></button>
                        {{/if}}
                        <button class='del' title='Click to delete todo'><i class='fa fa-times''></i></button>
                     </div>`;
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
    this.elem.className = 'view';
    this.elem.innerHTML = Handlebars.compile(this.template)({
      'editCh': this.edit,
      'value': this.value,
      'checkCh': this.checked ? 'checked' : ''
    });
    let instance = this;
    let parentList = this.list;
    this.elem.querySelector('.check').onclick = function(){
      instance.setChecked();
    };
    this.elem.querySelector('.edit').onclick = function() {
      if (instance.edit) instance.value = instance.elem.querySelector('.int-el').value;
      instance.setEdit();
    };
    this.elem.querySelector('.del').onclick = function() {
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
document.getElementById('last_foot').innerHTML = myFooterOfList.render();