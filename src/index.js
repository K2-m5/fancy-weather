import { App } from './components/app/app';

import './styles.css';

const buildDom = new App(document.getElementById('root'));

buildDom.initApp();
