import {MainComponent} from './app/MainComponent';
import './app/helpers';
import './styles/style-fb.scss';
import $ from 'jquery';

$('body').html(new MainComponent().render());