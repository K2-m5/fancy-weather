import BuildDom from './components/BuildDom/BuildDom';
import { addMap } from './components/map/index';
import { mapKey } from './components/const/index'

import './styles.css';

const buildDom = new BuildDom(document.body);
buildDom.buildDom();

addMap(mapKey, 50, 60);