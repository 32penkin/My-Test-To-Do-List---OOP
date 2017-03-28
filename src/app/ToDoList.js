import {BaseComponent} from './BaseComponent';

export class ToDoList extends BaseComponent {

  constructor() {
    super('<ul>');
    this.itemsArr = [];
  }

  addNewItem(item) {
    this.itemsArr.push(item);
    item.render();
  }

  deleteItem(instance) {
    this.itemsArr = this.itemsArr.filter(item => item !== instance);
    this.render();
  }

  setFilter(value) {
    if(value === 'All'){
      this.render();
    }
    else if(value === 'Active') {
      let temp = this.itemsArr;
      this.itemsArr = this.itemsArr.filter(item => !item.checked);
      this.render();
      this.itemsArr = temp;
    }
    else if(value === 'Completed') {
      let temp = this.itemsArr;
      this.itemsArr = this.itemsArr.filter(item => item.checked);
      this.render();
      this.itemsArr = temp;
    }
    else if(value === 'DelComp') {
      this.itemsArr = this.itemsArr.filter(item => !item.checked);
      this.render();
    }
  }

  render() {
    this.elem.html('');
    this.elem.addClass('main');
    this.itemsArr.forEach((item) => {
      this.elem.append(item.render());
    });
    return this.elem;
  }
}