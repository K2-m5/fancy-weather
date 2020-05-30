import { createElement } from "./component/component";

function createHeader () {
  const headerRoot = createElement ('div', 'header');
  headerRoot.append(
    document.body
  );
}

createHeader();