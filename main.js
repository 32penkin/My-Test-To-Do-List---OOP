import { MainComponent } from './js/MainComponent';
import { attachMainComponent } from './js/helpers';
import './styles/style.scss';


attachMainComponent(new MainComponent().render());