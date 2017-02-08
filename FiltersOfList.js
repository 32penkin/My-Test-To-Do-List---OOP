const BaseComponent = require('./BaseComponent');

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

module.exports = FiltersOfList;