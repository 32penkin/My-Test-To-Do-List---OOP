import * as Handlebars from 'handlebars';
import $ from 'jquery';

export function attachMainComponent(component) {
  $('body').html(component);
}

export const handlebarsTernHelper = Handlebars.registerHelper('tern', function (value, equal, value1, value2) {
  return value === equal ? value1 : value2;
});