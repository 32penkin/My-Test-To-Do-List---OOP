import * as Handlebars from 'handlebars';
export function attachMainComponent(component) {
  document.getElementsByTagName('body')[0].appendChild(component);
}

export const handlebarsTernHelper = Handlebars.registerHelper('tern', function (value, equal, value1, value2) {
  return value === equal ? value1 : value2;
});