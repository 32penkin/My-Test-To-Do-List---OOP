const BaseComponent = require('./BaseComponent');

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