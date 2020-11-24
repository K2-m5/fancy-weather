import { createElement } from '../utils/createElement';
import { words } from '../const/words';

import './SearchPanel.css';

window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

export default class SearchPanel {
  constructor() {
    this.searchString = '';
    this.buttonSearch = createElement('button', 'button-base', 'search-btn');
    this.inputSearch = createElement('input', 'input_base');
    this.formSearchRoot = createElement('form', 'search-root');
    this.voiceButton = createElement('button', 'button-base', 'voice-btn');
    this.recognition = new SpeechRecognition();
    this.recognizing = false;
  }

  recognitionHandler(handler) {
    this.recognition.addEventListener('start', () => {
      this.recognizing = true;
    });

    this.recognition.addEventListener('end', () => {
      this.recognizing = false;
      this.recognition.abort();
    });

    this.recognition.addEventListener('result', (t) => {
      this.recognizing = false;
      let { transcript } = t.results[0][0];

      if (transcript === 0) {
        return;
      }
      this.inputSearch.value = transcript;
      handler(this.inputSearch.value);
      this.inputSearch.value = '';
      this.recognition.abort();
    });
  }

  createSearchBlock() {
    const searchPanel = createElement('div', 'wrapper', 'search-panel');
    const voiceSymbol = createElement('i', 'fas', 'fa-microphone');
    this.formSearchRoot.setAttribute('name', 'search');
    this.inputSearch.setAttribute('type', 'text');
    this.buttonSearch.id = 'buttonSearch';
    this.buttonSearch.innerText = 'Search';
    this.voiceButton.append(voiceSymbol);

    this.formSearchRoot.append(this.inputSearch, this.voiceButton, this.buttonSearch);

    searchPanel.append(this.formSearchRoot);

    return searchPanel;
  }

  bindClickFormSearch(handler) {
    this.buttonSearch.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.inputSearch.value.length === 0) {
        return;
      }
      handler(this.inputSearch.value);
      this.inputSearch.value = '';
    });

    this.voiceButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (!this.recognizing) {
        this.recognition.start();
      }
      this.recognitionHandler(handler);
    });

    document.body.addEventListener('keypress', (e) => {
      if (e.code !== 'Enter') return;
      e.preventDefault();
      if (this.inputSearch.value.length === 0) {
        return;
      }
      handler(this.inputSearch.value);
      this.inputSearch.value = '';
    });
  }

  renderDataLanguage(lang) {
    let buttonSearchText = words.find((item) => item.language === lang);
    this.buttonSearch.innerText = buttonSearchText.searchElements;
  }
}
