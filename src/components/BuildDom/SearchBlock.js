import { createElement } from '../component/createElement';
import { words } from '../const/words';

export class SearchBlock {
  constructor() {
    this.searchString = '';
    this.buttonSearch = createElement('button', 'button-base', 'search-btn');
    this.inputSearch = createElement('input', 'input_base');
    this.formSearchRoot = createElement('form', 'search-root');
  }

  createSearchBlock() {
    const searchPanel = createElement('div', 'wrapper', 'search-panel');
    this.formSearchRoot.setAttribute('name', 'search');

    this.buttonSearch.id = 'buttonSearch';
    this.buttonSearch.innerText = 'Search';

    this.formSearchRoot.append(
      this.inputSearch,
      this.buttonSearch
    );

    searchPanel.append(
      this.formSearchRoot
    );

    return searchPanel;
  }

  renderDataLanguage(lang) {
    let buttonSearchText = words.find(item => item.language === lang);
    this.buttonSearch.innerText = buttonSearchText.searchElements;
  }
}
