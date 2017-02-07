Handlebars.registerHelper('tern', function (value, equal, value1, value2) {
  return value === equal ? value1 : value2;
});

class BaseComponent {

  constructor(containerElement) {
    this.template;
    this.elem = document.createElement(containerElement);
  }

  compile() {
    return Handlebars.compile(this.template)(this);
  }
}

class InputForm extends BaseComponent {

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
    this.elem.querySelector('.add-button').onclick = () => {
      this.sendNewItem(this.elem.querySelector('.input-text').value);
      this.elem.querySelector('.input-text').focus();
      this.elem.querySelector('.input-text').select();
    };
    this.elem.querySelector('.input-text').onkeyup = (event) => {
      if(event.which === 13){
        this.sendNewItem(this.elem.querySelector('.input-text').value);
        this.elem.querySelector('.input-text').focus();
        this.elem.querySelector('.input-text').select();
      }
    };
    return this.elem;
  }
}

class FooterOfList extends BaseComponent {

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

class FiltersOfList extends BaseComponent {

  constructor(list) {
    super('ul');
    this.list = list;
    this.currentFilter = '';
    this.template = `<li><button id="get_all" class="{{ tern currentFilter 'All' 'filtered-button' '' }}">All</button></li>
                     <li><button id="get_active" class="{{ tern currentFilter 'Active' 'filtered-button' '' }}">Active</button></li>
                     <li><button id='get_completed' class="{{ tern currentFilter 'Completed' 'filtered-button' '' }}">Completed</button></li>
                     <li><button id="clear_completed">Clear completed</button></li>`;
  }

  render() {
    this.elem.innerHTML = this.compile();
    this.elem.querySelector('#get_all').onclick = () => {
      this.currentFilter = 'All';
      this.list.getAll();
      this.elem.innerHTML = '';
      this.render()
    };
    this.elem.querySelector('#get_active').onclick =  () => {
      this.currentFilter = 'Active';
      this.list.getActive();
      this.elem.innerHTML = '';
      this.render();
    };
    this.elem.querySelector('#get_completed').onclick = () => {
      this.currentFilter = 'Completed';
      this.list.getCompleted();
      this.elem.innerHTML = '';
      this.render();
    };
    this.elem.querySelector('#clear_completed').onclick = () => {
      this.currentFilter = 'All';
      this.list.deleteCompleted();
      this.elem.innerHTML = '';
      this.render();
    };
    return this.elem;
  }
}

class ToDoList extends BaseComponent {

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
    this.itemsArr.forEach( (item) => {
      this.elem.appendChild(item.render());
    });
    return this.elem;
  }
}

class ToDoItem extends BaseComponent {

  constructor(value, checked, edit, list){
    super('li');
    this.value = value;
    this.checked = checked;
    this.edit = edit;
    this.list = list;
    this.template = `<i class="fa fa-hand-o-right"></i>
                     {{#if edit}}
                        <input type="text" value="{{ value }}" class="int-el"/>
                     {{else}}
                        <span class="{{ tern checked true 'checked' '' }}">{{value}}</span>
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
    this.elem.querySelector('.check').onclick = () => {
      this.setChecked();
    };
    this.elem.querySelector('.edit').onclick = () => {
      if (this.edit) this.value = this.elem.querySelector('.int-el').value;
      this.setEdit();
    };
    this.elem.querySelector('.del').onclick = () => {
      this.list.deleteItem(this);
      this.render();
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