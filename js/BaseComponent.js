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