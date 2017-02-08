const BaseComponent = require('./BaseComponent');

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

module.exports = ToDoItem;