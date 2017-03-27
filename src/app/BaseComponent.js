import * as Handlebars from 'handlebars';
import $ from 'jquery';

export class BaseComponent {

  constructor(containerElement) {
    this.template;
    this.list;
    this.elem = $(containerElement);
  }

  compile() {
    return Handlebars.compile(this.template)(this);
  }
}