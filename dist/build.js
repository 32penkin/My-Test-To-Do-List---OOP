/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

Handlebars.registerHelper('tern', function (value, equal, value1, value2) {
  return value === equal ? value1 : value2;
});

class BaseComponent {

  constructor(containerElement) {
    this.template;
    this.elem = document.createElement(containerElement);
  }

  compile() {
    return Handlebars.compile(this.template)(this);
  }
}

module.exports = BaseComponent;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const BaseComponent = __webpack_require__(0);

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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const BaseComponent = __webpack_require__(0);

class FooterOfList extends BaseComponent {

  constructor(str) {
    super('div');
    this.str = str;
    this.template = '<p>{{ str }}</p>';
  }

  render() {
    this.elem.innerHTML = this.compile();
    return this.elem;
  }
}

module.exports = FooterOfList;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const BaseComponent = __webpack_require__(0);

class InputForm extends BaseComponent {

  constructor(name, list) {
    super('div');
    this.name = name;
    this.list = list;
    this.template = `<div class="hat"><h1>{{ name }}</h1></div>
                     <input type="text" placeholder="Add task here" class="input-text"/>
                     <button class="add-button"><i class="fa fa-plus"></i></button>`;
  }

  sendNewItem(value) {
    if(!value.trim()) return false;
    this.list.addNewItem(new ToDoItem(value, false, false, this.list));
    this.list.render();
  }

  render() {
    this.elem.innerHTML = this.compile();
    this.elem.querySelector('.input-text').focus();
    this.elem.querySelector('.add-button').onclick = () => {
      this.sendNewItem(this.elem.querySelector('.input-text').value);
      this.elem.querySelector('.input-text').focus();
      this.elem.querySelector('.input-text').select();
    };
    this.elem.querySelector('.input-text').onkeyup = (event) => {
      if(event.which === 13){
        this.sendNewItem(this.elem.querySelector('.input-text').value);
        this.elem.querySelector('.input-text').focus();
        this.elem.querySelector('.input-text').select();
      }
    };
    return this.elem;
  }
}

module.exports = InputForm;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const BaseComponent = __webpack_require__(0);

class ToDoList extends BaseComponent {

  constructor() {
    super('ul');
    this.itemsArr = [];
  }

  addNewItem(item) {
    this.itemsArr.push(item);
    item.render();
  }

  deleteItem(instance) {
    this.itemsArr = this.itemsArr.filter( item => item !== instance );
    this.render();
  }

  getAll() {
    this.render();
  }

  getActive() {
    let temp = this.itemsArr;
    this.itemsArr = this.itemsArr.filter( item => !item.checked );
    this.render();
    this.itemsArr = temp;
  }

  getCompleted() {
    let temp = this.itemsArr;
    this.itemsArr = this.itemsArr.filter( item => item.checked );
    this.render();
    this.itemsArr = temp;
  }

  deleteCompleted() {
    this.itemsArr = this.itemsArr.filter(item => !item.checked );
    this.render();
  }

  render() {
    this.elem.innerHTML = '';
    this.itemsArr.forEach( (item) => {
      this.elem.appendChild(item.render());
    });
    return this.elem;
  }
}

module.exports = ToDoList;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const InputForm = __webpack_require__(3);
const ToDoList = __webpack_require__(4);
const FiltersOfList = __webpack_require__(1);
const FooterOfList = __webpack_require__(2);


let myToDoList = new ToDoList();
let myInputForm = new InputForm('toDos', myToDoList);
let myFilterOfList = new FiltersOfList(myToDoList);
let myFooterOfList = new FooterOfList('Press Enter to add todo');


document.getElementsByTagName('header')[0].appendChild(myInputForm.render());
document.getElementsByTagName('main')[0].appendChild(myToDoList.render());
document.getElementsByTagName('footer')[0].appendChild(myFilterOfList.render());
document.getElementsByTagName('footer')[1].appendChild(myFooterOfList.render());

module.exports = main;

/***/ })
/******/ ]);