import {BaseComponent} from './BaseComponent';

export class FooterOfList extends BaseComponent {

  constructor(str) {
    super('<div>');
    this.str = str;
    this.template = `<p>{{ str }}</p>`;
  }

  render() {
    this.elem.addClass('last-footer');
    this.elem.html(this.compile());
    return this.elem;
  }
}