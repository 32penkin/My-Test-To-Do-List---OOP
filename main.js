const InputForm = require('./js/InputForm');
const ToDoList = require('./js/ToDoList');
const FiltersOfList = require('./js/FiltersOfList');
const FooterOfList = require('./js/FooterOfList');
const ToDoItem = require('./js/ToDoItem');

let myToDoList = new ToDoList();
let myInputForm = new InputForm('toDos', myToDoList);
let myFilterOfList = new FiltersOfList(myToDoList);
let myFooterOfList = new FooterOfList('Press Enter to add todo');


document.getElementsByTagName('header')[0].appendChild(myInputForm.render());
document.getElementsByTagName('main')[0].appendChild(myToDoList.render());
document.getElementsByTagName('footer')[0].appendChild(myFilterOfList.render());
document.getElementsByTagName('footer')[1].appendChild(myFooterOfList.render());

