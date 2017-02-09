import { InputForm } from './InputForm';
import { ToDoList } from './ToDoList';
import { FiltersOfList } from './FiltersOfList';
import { FooterOfList } from './FooterOfList';
import { ToDoItem } from './ToDoItem';

export class MainComponent {

  constructor() {
    this.elem = document.createElement('main');
    this.myToDoList = new ToDoList();
    this.myInputForm = new InputForm('toDos', this.myToDoList);
    this.myFilterOfList = new FiltersOfList(this.myToDoList);
    this.myFooterOfList = new FooterOfList('Press Enter to add todo');
  }

  render() {
    this.elem.appendChild(this.myInputForm.render());
    this.elem.appendChild(this.myToDoList.render());
    this.elem.appendChild(this.myFilterOfList.render());
    this.elem.appendChild(this.myFooterOfList.render());
    return this.elem;
  }
}