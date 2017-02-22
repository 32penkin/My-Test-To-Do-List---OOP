import {InputForm} from './InputForm';
import {ToDoList} from './ToDoList';
import {FiltersOfList} from './FiltersOfList';
import {FooterOfList} from './FooterOfList';
import $ from 'jquery';


export class MainComponent {

  constructor() {
    this.elem = $('<main>');
    this.myToDoList = new ToDoList();
    this.myInputForm = new InputForm('', this.myToDoList);
    this.myFilterOfList = new FiltersOfList(this.myToDoList);
    this.myFooterOfList = new FooterOfList('');
  }

  render() {
    this.elem.append(this.myInputForm.render());
    this.elem.append(this.myToDoList.render());
    this.elem.append(this.myFilterOfList.render());
    this.elem.append(this.myFooterOfList.render());
    return this.elem;
  }
}