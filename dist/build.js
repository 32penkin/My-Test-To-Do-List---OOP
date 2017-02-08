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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Handlebars.registerHelper('tern', function (value, equal, value1, value2) {
  return value === equal ? value1 : value2;
});

var BaseComponent = function () {
  function BaseComponent(containerElement) {
    _classCallCheck(this, BaseComponent);

    this.template;
    this.elem = document.createElement(containerElement);
  }

  _createClass(BaseComponent, [{
    key: 'compile',
    value: function compile() {
      return Handlebars.compile(this.template)(this);
    }
  }]);

  return BaseComponent;
}();

module.exports = BaseComponent;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseComponent = __webpack_require__(0);

var ToDoItem = function (_BaseComponent) {
  _inherits(ToDoItem, _BaseComponent);

  function ToDoItem(value, checked, edit, list) {
    _classCallCheck(this, ToDoItem);

    var _this = _possibleConstructorReturn(this, (ToDoItem.__proto__ || Object.getPrototypeOf(ToDoItem)).call(this, 'li'));

    _this.value = value;
    _this.checked = checked;
    _this.edit = edit;
    _this.list = list;
    _this.template = '<i class="fa fa-hand-o-right"></i>\n                     {{#if edit}}\n                        <input type="text" value="{{ value }}" class="int-el"/>\n                     {{else}}\n                        <span class="{{ tern checked true \'checked\' \'\' }}">{{value}}</span>\n                     {{/if}}\n                     <div class="toolBar">\n                        <button class="check" title="Click to check todo"><i class="fa fa-check"></i></button>\n                        {{#if edit}}\n                          <button class="edit" title="Click to save edition"><i class="fa fa-check-circle-o"></i></button>\n                        {{else}}\n                          <button class="edit" title="Click to edit todo"><i class="fa fa-pencil-square-o"></i></button>\n                        {{/if}}\n                        <button class="del" title="Click to delete todo"><i class="fa fa-times"></i></button>\n                     </div>';
    return _this;
  }

  _createClass(ToDoItem, [{
    key: 'setChecked',
    value: function setChecked() {
      this.checked = !this.checked;
      this.render();
      return false;
    }
  }, {
    key: 'setEdit',
    value: function setEdit() {
      this.edit = !this.edit;
      this.render();
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      this.elem.className = 'view';
      this.elem.innerHTML = this.compile();
      this.elem.querySelector('.check').onclick = function () {
        _this2.setChecked();
      };
      this.elem.querySelector('.edit').onclick = function () {
        if (_this2.edit) _this2.value = _this2.elem.querySelector('.int-el').value;
        _this2.setEdit();
      };
      this.elem.querySelector('.del').onclick = function () {
        _this2.list.deleteItem(_this2);
        _this2.render();
      };
      return this.elem;
    }
  }]);

  return ToDoItem;
}(BaseComponent);

module.exports = ToDoItem;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseComponent = __webpack_require__(0);

var FiltersOfList = function (_BaseComponent) {
  _inherits(FiltersOfList, _BaseComponent);

  function FiltersOfList(list) {
    _classCallCheck(this, FiltersOfList);

    var _this = _possibleConstructorReturn(this, (FiltersOfList.__proto__ || Object.getPrototypeOf(FiltersOfList)).call(this, 'ul'));

    _this.list = list;
    _this.currentFilter = '';
    _this.template = '<li><button id="get_all" class="{{ tern currentFilter \'All\' \'filtered-button\' \'\' }}">All</button></li>\n                     <li><button id="get_active" class="{{ tern currentFilter \'Active\' \'filtered-button\' \'\' }}">Active</button></li>\n                     <li><button id=\'get_completed\' class="{{ tern currentFilter \'Completed\' \'filtered-button\' \'\' }}">Completed</button></li>\n                     <li><button id="clear_completed">Clear completed</button></li>';
    return _this;
  }

  _createClass(FiltersOfList, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      this.elem.innerHTML = this.compile();
      this.elem.querySelector('#get_all').onclick = function () {
        _this2.currentFilter = 'All';
        _this2.list.getAll();
        _this2.elem.innerHTML = '';
        _this2.render();
      };
      this.elem.querySelector('#get_active').onclick = function () {
        _this2.currentFilter = 'Active';
        _this2.list.getActive();
        _this2.elem.innerHTML = '';
        _this2.render();
      };
      this.elem.querySelector('#get_completed').onclick = function () {
        _this2.currentFilter = 'Completed';
        _this2.list.getCompleted();
        _this2.elem.innerHTML = '';
        _this2.render();
      };
      this.elem.querySelector('#clear_completed').onclick = function () {
        _this2.currentFilter = 'All';
        _this2.list.deleteCompleted();
        _this2.elem.innerHTML = '';
        _this2.render();
      };
      return this.elem;
    }
  }]);

  return FiltersOfList;
}(BaseComponent);

module.exports = FiltersOfList;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseComponent = __webpack_require__(0);

var FooterOfList = function (_BaseComponent) {
  _inherits(FooterOfList, _BaseComponent);

  function FooterOfList(str) {
    _classCallCheck(this, FooterOfList);

    var _this = _possibleConstructorReturn(this, (FooterOfList.__proto__ || Object.getPrototypeOf(FooterOfList)).call(this, 'div'));

    _this.str = str;
    _this.template = '<p>{{ str }}</p>';
    return _this;
  }

  _createClass(FooterOfList, [{
    key: 'render',
    value: function render() {
      this.elem.innerHTML = this.compile();
      return this.elem;
    }
  }]);

  return FooterOfList;
}(BaseComponent);

module.exports = FooterOfList;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseComponent = __webpack_require__(0);
var ToDoItem = __webpack_require__(1);

var InputForm = function (_BaseComponent) {
  _inherits(InputForm, _BaseComponent);

  function InputForm(name, list) {
    _classCallCheck(this, InputForm);

    var _this = _possibleConstructorReturn(this, (InputForm.__proto__ || Object.getPrototypeOf(InputForm)).call(this, 'div'));

    _this.name = name;
    _this.list = list;
    _this.template = '<div class="hat"><h1>{{ name }}</h1></div>\n                     <input type="text" placeholder="Add task here" class="input-text"/>\n                     <button class="add-button"><i class="fa fa-plus"></i></button>';
    return _this;
  }

  _createClass(InputForm, [{
    key: 'sendNewItem',
    value: function sendNewItem(value) {
      if (!value.trim()) return false;
      this.list.addNewItem(new ToDoItem(value, false, false, this.list));
      this.list.render();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      this.elem.innerHTML = this.compile();
      this.elem.querySelector('.input-text').focus();
      this.elem.querySelector('.add-button').onclick = function () {
        _this2.sendNewItem(_this2.elem.querySelector('.input-text').value);
        _this2.elem.querySelector('.input-text').focus();
        _this2.elem.querySelector('.input-text').select();
      };
      this.elem.querySelector('.input-text').onkeyup = function (event) {
        if (event.which === 13) {
          _this2.sendNewItem(_this2.elem.querySelector('.input-text').value);
          _this2.elem.querySelector('.input-text').focus();
          _this2.elem.querySelector('.input-text').select();
        }
      };
      return this.elem;
    }
  }]);

  return InputForm;
}(BaseComponent);

module.exports = InputForm;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseComponent = __webpack_require__(0);

var ToDoList = function (_BaseComponent) {
  _inherits(ToDoList, _BaseComponent);

  function ToDoList() {
    _classCallCheck(this, ToDoList);

    var _this = _possibleConstructorReturn(this, (ToDoList.__proto__ || Object.getPrototypeOf(ToDoList)).call(this, 'ul'));

    _this.itemsArr = [];
    return _this;
  }

  _createClass(ToDoList, [{
    key: 'addNewItem',
    value: function addNewItem(item) {
      this.itemsArr.push(item);
      item.render();
    }
  }, {
    key: 'deleteItem',
    value: function deleteItem(instance) {
      this.itemsArr = this.itemsArr.filter(function (item) {
        return item !== instance;
      });
      this.render();
    }
  }, {
    key: 'getAll',
    value: function getAll() {
      this.render();
    }
  }, {
    key: 'getActive',
    value: function getActive() {
      var temp = this.itemsArr;
      this.itemsArr = this.itemsArr.filter(function (item) {
        return !item.checked;
      });
      this.render();
      this.itemsArr = temp;
    }
  }, {
    key: 'getCompleted',
    value: function getCompleted() {
      var temp = this.itemsArr;
      this.itemsArr = this.itemsArr.filter(function (item) {
        return item.checked;
      });
      this.render();
      this.itemsArr = temp;
    }
  }, {
    key: 'deleteCompleted',
    value: function deleteCompleted() {
      this.itemsArr = this.itemsArr.filter(function (item) {
        return !item.checked;
      });
      this.render();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      this.elem.innerHTML = '';
      this.itemsArr.forEach(function (item) {
        _this2.elem.appendChild(item.render());
      });
      return this.elem;
    }
  }]);

  return ToDoList;
}(BaseComponent);

module.exports = ToDoList;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var InputForm = __webpack_require__(4);
var ToDoList = __webpack_require__(5);
var FiltersOfList = __webpack_require__(2);
var FooterOfList = __webpack_require__(3);
var ToDoItem = __webpack_require__(1);

var myToDoList = new ToDoList();
var myInputForm = new InputForm('toDos', myToDoList);
var myFilterOfList = new FiltersOfList(myToDoList);
var myFooterOfList = new FooterOfList('Press Enter to add todo');

document.getElementsByTagName('header')[0].appendChild(myInputForm.render());
document.getElementsByTagName('main')[0].appendChild(myToDoList.render());
document.getElementsByTagName('footer')[0].appendChild(myFilterOfList.render());
document.getElementsByTagName('footer')[1].appendChild(myFooterOfList.render());

/***/ })
/******/ ]);