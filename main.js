import { MainComponent } from './js/MainComponent';
import { attachMainComponent } from './js/helpers';
import './styles/style.scss';
//import './node_modules/font-awesome/scss/font-awesome.scss';

attachMainComponent(new MainComponent().render());