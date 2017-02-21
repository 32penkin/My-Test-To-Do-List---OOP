import { BaseComponent } from './BaseComponent';
import { handlebarsTernHelper } from './helpers';

export class ToDoItem extends BaseComponent {

  constructor(value, checked, edit, list){
    super('li');
    this.value = value;
    this.checked = checked;
    this.edit = edit;
    this.list = list;
    this.template = `<label class="label-for-check">
                        <input type="checkbox" class="check" {{ tern checked true 'checked' '' }}>
                        <span class="pseudo-checkbox"><i class="fa fa-check"></i></span>
                     </label>
                     {{#if edit}}
                        <input type="text" value="{{ value }}" class="internal-element"/>
                     {{else}}
                        <span class="{{ tern checked true 'checked' '' }} to-do-span">{{value}}</span>
                     {{/if}}
                     <div class="tool-bar">
                        {{#if edit}}
                          <button class="edit" title="Click to save edition"><i class="fa fa-check-circle-o"></i></button>
                        {{else}}
                          <button class="edit" title="Click to edit todo"><i class="fa fa-pencil-square-o"></i></button>
                        {{/if}}
                        <button class="delete" title="Click to delete todo"><i class="fa fa-trash"></i></button>
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
    this.elem.querySelector('.check').onchange = () => {
      this.setChecked();
    };
    this.elem.querySelector('.edit').onclick = () => {
      if (this.edit) this.value = this.elem.querySelector('.internal-element').value;
      this.setEdit();
    };
    this.elem.querySelector('.delete').onclick = () => {
      this.list.deleteItem(this);
      this.render();
    };
    return this.elem;
  }
}