import {BaseComponent} from './BaseComponent';

export class ToDoItem extends BaseComponent {

  constructor(value, checked, edit, list) {
    super('<li>');
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
                        <div class="to-do-cont"><span class="{{ tern checked true 'checked' '' }} to-do-span">{{value}}</span></div>
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
    this.elem.addClass('view');
    this.elem.html(this.compile());
    this.elem.find('.check').change(() => {
      this.setChecked();
    });
    this.elem.find('.edit').click(() => {
      if (this.edit) this.value = this.elem.find('.internal-element').val();
      this.setEdit();
    });
    this.elem.find('.delete').click(() => {
      this.list.deleteItem(this);
      this.render();
    });
    return this.elem;
  }
}