Handlebars.registerHelper('tern', function (result, value1, value2, forCompare) {
  if(forCompare.trim() !== '') return result === forCompare ? value1 : value2;
  else return result ? value1 : value2;
});

class CommonParent {
  constructor(containerElement) {
    this.template;
    this.elem = document.createElement(containerElement);
  }
  compile() {
    return Handlebars.compile(this.template)(this);
  }
}

class InputForm extends CommonParent {
  constructor(name, list) {
    super('div');
    this.name = name;
    this.list = list;
    this.template = `<div class="hat"><h1>{{ name }}</h1></div>
                     <input type="text" placeholder="Add task here" class="input-text"/>
                     <button class="add-button"><i class="fa fa-plus"></i></button>`;
  }
  sendNewItem(value) {
    if(!value.trim()) return false;
    this.list.addNewItem(new ToDoItem(value, false, false, this.list));
    this.list.render();
  }
  render() {
    this.elem.innerHTML = this.compile();
    this.elem.querySelector('.input-text').focus();
    let that = this;
    this.elem.querySelector('.add-button').onclick = function() {
      that.sendNewItem(that.elem.querySelector('.input-text').value);
      that.elem.querySelector('.input-text').focus();
      that.elem.querySelector('.input-text').select();
    };
    this.elem.querySelector('.input-text').onkeyup = function(event) {
      if(event.which === 13){
        that.sendNewItem(that.elem.querySelector('.input-text').value);
        that.elem.querySelector('.input-text').focus();
        that.elem.querySelector('.input-text').select();
      }
    };
    return this.elem;
  }
}

class FooterOfList extends CommonParent {
  constructor(str) {
    super('div');
    this.str = str;
    this.template = '<p>{{ str }}</p>';
  }
  render() {
    this.elem.innerHTML = this.compile();
    return this.elem;
  }
}

class FiltersOfList extends CommonParent {
  constructor(list) {
    super('ul');
    this.list = list;
    this.currentFilter = '';
    this.template = `<li><button id="get_all" class="{{ tern currentFilter 'filtered-button' '' 'All' }}">All</button></li>
                     <li><button id="get_active" class="{{ tern currentFilter 'filtered-button' '' 'Active' }}">Active</button></li>
                     <li><button id='get_completed' class="{{ tern currentFilter 'filtered-button' '' 'Completed' }}">Completed</button></li>
                     <li><button id="clear_completed">Clear completed</button></li>`;
  }
  render() {
    this.elem.innerHTML = this.compile();
    let tempList = this.list;
    let that = this;
    this.elem.querySelector('#get_all').onclick = function (){
      that.currentFilter = 'All';
      tempList.getAll();
      that.elem.innerHTML = '';
      that.render()
    };
    this.elem.querySelector('#get_active').onclick = function (){
      that.currentFilter = 'Active';
      tempList.getActive();
      that.elem.innerHTML = '';
      that.render();
    };
    this.elem.querySelector('#get_completed').onclick = function (){
      that.currentFilter = 'Completed';
      tempList.getCompleted();
      that.elem.innerHTML = '';
      that.render();
    };
    this.elem.querySelector('#clear_completed').onclick = function (){
      that.currentFilter = 'All';
      tempList.deleteCompleted();
      that.elem.innerHTML = '';
      that.render();
    };
    return this.elem;
  }
}

class ToDoList extends CommonParent {
  constructor() {
    super('ul');
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

class ToDoItem extends CommonParent {
  constructor(value, checked, edit, list){
    super('li');
    this.value = value;
    this.checked = checked;
    this.edit = edit;
    this.list = list;
    this.template = `<i class="fa fa-hand-o-right"></i>
                     {{#if edit}}
                        <input type="text" value="{{value}}" class="int-el"/>
                     {{else}}
                        <span class="{{ tern checked 'checked' '' '' }}">{{value}}</span>
                     {{/if}}
                     <div class="toolBar">
                        <button class="check" title="Click to check todo"><i class="fa fa-check"></i></button>
                        {{#if edit}}
                          <button class="edit" title="Click to save edition"><i class="fa fa-check-circle-o"></i></button>
                        {{else}}
                          <button class="edit" title="Click to edit todo"><i class="fa fa-pencil-square-o"></i></button>
                        {{/if}}
                        <button class="del" title="Click to delete todo"><i class="fa fa-times"></i></button>
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
    this.elem.innerHTML = this.compile();
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
document.getElementsByTagName('footer')[1].appendChild(myFooterOfList.render());