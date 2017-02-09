import { BaseComponent } from './BaseComponent';

export class FooterOfList extends BaseComponent {

  constructor(str) {
    super('div');
    this.str = str;
    this.template = '<p>{{ str }}</p>';
  }

  render() {
  	this.elem.className = 'last-foot';
    this.elem.innerHTML = this.compile();
    return this.elem;
  }
}