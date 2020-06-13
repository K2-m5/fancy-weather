import { createElement } from '../component/createElement';
import { words } from '../const/words';

export class SearchBlock {
  constructor(searchHandler) {
    this.searchHandler = searchHandler;
    this.searchString = '';
    this.buttonSearch = createElement('button', 'button-base', 'search-btn');
  }

  createSearchBlock() {
    const searchPanel = createElement('div', 'wrapper', 'search-panel');
    const formSearchRoot = createElement('form', 'search-root');
    const inputSearch = createElement('input', 'input_base');
    formSearchRoot.setAttribute('name', 'search');
    formSearchRoot.addEventListener('submit', (e) => {
      e.preventDefault();

      this.searchHandler(inputSearch.value);
    });
    this.buttonSearch.id = 'buttonSearch';
    this.buttonSearch.innerText = 'Search';

    formSearchRoot.append(
      inputSearch,
      this.buttonSearch
    );

    searchPanel.append(
      formSearchRoot
    );

    return searchPanel;
  }

  static renderDataLanguage(lang) {
    let buttonSearchText = words.find(item => item.language === lang);
    const buttonSearch = document.getElementById('buttonSearch');
    buttonSearch.innerText = buttonSearchText.searchElements;
  }
}
