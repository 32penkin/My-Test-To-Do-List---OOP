const BaseComponent = require('./BaseComponent');

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

module.exports = ToDoList;