import { MainComponent } from './app/MainComponent';
import { attachMainComponent } from './app/helpers';
import './styles/style.scss';


attachMainComponent(new MainComponent().render());