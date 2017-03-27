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
      if(filter === 'All'){
        this.ToDoList.getAll();
      }
      else if(filter === 'Active'){
        this.ToDoList.getActive();
      }
      else if(filter === 'Completed'){
        this.ToDoList.getCompleted();
      }
      else if(filter === 'DelComp'){
        this.ToDoList.deleteCompleted();
        this.ListFilters.setCurrentFilter('All');
      }
    });
    this.elem.append(this.InputForm.render());
    this.elem.append(this.ToDoList.render());
    this.elem.append(this.ListFilters.render());
    return this.elem;
  }
}