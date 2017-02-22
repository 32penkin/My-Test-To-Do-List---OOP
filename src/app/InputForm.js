import {BaseComponent} from'./BaseComponent';
import {ToDoItem} from './ToDoItem';

export class InputForm extends BaseComponent {

  constructor(name, list) {
    super('<header>');
    this.name = name;
    this.list = list;
    this.template = `<label class="label-for-checkbox">
                        <input type="checkbox" class="check-all">
                        <span class="pseudo-checkbox"><i class="fa fa-check"></i></span>
                     </label>
                     <input type="text" placeholder="Add task here" class="input-text"/>
                     <button class="add-button"><i class="fa fa-plus"></i></button>`;
  }

  sendNewItem(value) {
    if (!value.trim()) return false;
    this.list.addNewItem(new ToDoItem(value, false, false, this.list));
    this.list.render();
  }

  render() {
    this.elem.addClass('.header');
    this.elem.html(this.compile());
    this.elem.find('.input-text').focus();
    this.elem.find('.check-all').change(() => {
      this.list.itemsArr.forEach((item) => {
        item.setChecked();
      });
    });
    this.elem.find('.add-button').click(() => {
      this.sendNewItem(this.elem.find('.input-text').val());
      this.elem.find('.input-text').focus();
      this.elem.find('.input-text').select();
    });
    this.elem.find('.input-text').keyup((event) => {
      if (event.which === 13) {
        this.sendNewItem(this.elem.find('.input-text').val());
        this.elem.find('.input-text').focus();
        this.elem.find('.input-text').select();
      }
    });
    return this.elem;
  }
}