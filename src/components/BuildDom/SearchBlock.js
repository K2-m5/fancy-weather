import { createElement } from '../component/createElement';

export class SearchBlock {
  constructor(searchHandler){
    this.searchHandler = searchHandler;
    this.searchString = '';
  }

  createSearchBlock() {
    const searchPanel = createElement('div', 'wrapper', 'search-panel');
    const formSearchRoot = createElement('form', 'search-root');
    const inputSearch = createElement('input', 'input_base');
    const buttonSearch = createElement('button', 'button-base', 'search-btn');

    formSearchRoot.setAttribute('name', 'search');
    formSearchRoot.addEventListener('submit', (e) => {
      e.preventDefault();

      this.searchHandler(inputSearch.value);
    });

    buttonSearch.innerText = 'Search';

    formSearchRoot.append(
      inputSearch,
      buttonSearch
    );

    searchPanel.append(
      formSearchRoot
    )

    return searchPanel;
  }
}