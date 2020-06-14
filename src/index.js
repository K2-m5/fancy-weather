import { BuildDom } from './components/BuildDom/BuildDom';

import './styles.css';

const buildDom = new BuildDom(document.body);

buildDom.buildDom();
