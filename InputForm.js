const BaseComponent = require('./BaseComponent');

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

module.exports = InputForm;