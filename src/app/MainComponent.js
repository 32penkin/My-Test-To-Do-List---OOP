import {InputForm} from './InputForm';
import {ToDoList} from './ToDoList';
import {ListFilters} from './ListFilters';
import $ from 'jquery';


export class MainComponent {

  constructor() {
    this.elem = $('<main>');
    this.ToDoList = new ToDoList();
    this.InputForm = new InputForm(this.ToDoList);
    this.ListFilters = new ListFilters();
  }

  render() {
    this.ListFilters.onFilterChange(filter => {
      this.ToDoList.setFilter(filter);
    });
    this.elem.append(this.InputForm.render());
    this.elem.append(this.ToDoList.render());
    this.elem.append(this.ListFilters.render());
    return this.elem;
  }
}