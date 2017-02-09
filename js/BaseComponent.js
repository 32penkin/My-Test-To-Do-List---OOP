export class BaseComponent {

  constructor(containerElement) {
    this.template;
    this.elem = document.createElement(containerElement);
  }

  compile() {
    return Handlebars.compile(this.template)(this);
  }
}