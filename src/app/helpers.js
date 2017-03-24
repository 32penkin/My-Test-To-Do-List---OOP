import * as Handlebars from 'handlebars';

export const handlebarsTernHelper = Handlebars.registerHelper('tern', function (value, equal, value1, value2) {
  return value === equal ? value1 : value2;
});