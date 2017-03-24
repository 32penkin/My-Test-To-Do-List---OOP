import {InputForm} from './InputForm';
import {ToDoList} from './ToDoList';
import {ListFilters} from './ListFilters';
import {ListFooter} from './ListFooter';
import $ from 'jquery';


export class MainComponent {

  constructor() {
    this.elem = $('<main>');
    this.ToDoList = new ToDoList();
    this.InputForm = new InputForm('', this.ToDoList);
    this.ListFilters = new ListFilters(this.ToDoList);
    this.ListFooter = new ListFooter('');
  }

  render() {
    this.elem.append(this.InputForm.render());
    this.elem.append(this.ToDoList.render());
    this.elem.append(this.ListFilters.render());
    this.elem.append(this.ListFooter.render());
    return this.elem;
  }
}