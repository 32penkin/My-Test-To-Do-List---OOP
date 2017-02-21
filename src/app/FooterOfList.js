import { BaseComponent } from './BaseComponent';
import $ from 'jquery';

export class FooterOfList extends BaseComponent {

  constructor(str) {
    super('<div>');
    this.str = str;
    this.template = `<p>{{ str }}</p>
                     <button class="test-button">Test</button>`;
  }

  render() {
    this.elem.addClass('last-footer');
    this.elem.html(this.compile());
    this.elem.find('.test-button').click = () => {
      alert('This is a test sentence!');
    };
    return this.elem;
  }
}