import { BuildDom } from './components/BuildDom/BuildDom';

import './styles.css';

const buildDom = new BuildDom(document.getElementById('root'));

buildDom.buildDom();
