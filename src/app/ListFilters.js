import {BaseComponent} from './BaseComponent';

export class ListFilters extends BaseComponent {

  constructor() {
    super('<footer>');
    this.changeFunc = () =>{};
    this.currentFilter = '';
    this.template = `<ul><li><button id="get_all" class="{{ tern currentFilter 'All' 'filtered-button' '' }}">All</button></li>
                     <li><button id="get_active" class="{{ tern currentFilter 'Active' 'filtered-button' '' }}">Active</button></li>
                     <li><button id='get_completed' class="{{ tern currentFilter 'Completed' 'filtered-button' '' }}">Completed</button></li>
                     <li><button id="clear_completed">Clear completed</button></li></ul>`;
  };

  setCurrentFilter(value) {
    this.currentFilter = value;
  }

  onFilterChange(func) {
    this.changeFunc = func;
  }

  render() {
    this.elem.addClass('footer');
    this.elem.html('');
    this.elem.html(this.compile());
    this.elem.find('#get_all').click(() => {
      this.currentFilter = 'All';
      this.render();
    });
    this.elem.find('#get_active').click(() => {
      this.currentFilter = 'Active';
      this.render();
    });
    this.elem.find('#get_completed').click(() => {
      this.currentFilter = 'Completed';
      this.render();
    });
    this.elem.find('#clear_completed').click(() => {
      this.currentFilter = 'DelComp';
      this.render();
    });
    this.changeFunc(this.currentFilter);
    return this.elem;
  }
}