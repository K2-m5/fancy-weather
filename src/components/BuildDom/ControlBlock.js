import { createElement } from '../utils/createElement';
import { symbolCoordinate } from '../const/symbol';

const { hour } = symbolCoordinate;

export class ControlBlock {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.switchUnitTemp = createElement('div', 'switch-temp');
    this.switchUnit = createElement('label', 'switch-label');
    this.switchInput = createElement('input', 'switch-input');
    this.changeLanguage = createElement('select', 'drop-list-language');
    this.changePicture = createElement('button', 'button-base', 'change-picture');
    this.language = '';
    this.temperature = '';
  }

  createControlBlock() {
    if (localStorage.getItem('language')) {
      this.language = localStorage.getItem('language');
    } else {
      this.language = 'en';
      localStorage.setItem('language', this.language);
    }

    if (localStorage.getItem('temperature')) {
      this.temperature = localStorage.getItem('temperature');
    } else {
      this.temperature = 'C' + hour;
      localStorage.setItem('temperature', this.temperature);
    }

    const buttonPanel = createElement('div', 'wrapper', 'button-panel');
    this.changeLanguage = createElement('select', 'drop-list-language');
    const languageEN = createElement('option', 'item-language-en');
    const languageRU = createElement('option', 'item-language-ru');
    const languageBY = createElement('option', 'item-language-by');

    languageEN.setAttribute('value', 'en');
    languageEN.innerText = 'EN';
    languageRU.setAttribute('value', 'ru');
    languageRU.innerText = 'RU';
    languageBY.setAttribute('value', 'by');
    languageBY.innerText = 'BY';

    this.changeLanguage.addEventListener('click', (event) => {
      this.language = event.target.value;
      localStorage.setItem('language', this.language);
    });

    this.switchSpan = createElement('span', 'switch-span');
    const switchSpanHandle = createElement('span', 'switch-handle');

    this.switchUnit.setAttribute('for', 'switch-input');
    this.switchInput.setAttribute('type', 'checkbox');


    if (localStorage.getItem('temperature') === ('C' + hour)) {
      this.switchInput.setAttribute('checked', 'false');
    } else {
      this.switchInput.removeAttribute('checked');
    }
    this.switchSpan.setAttribute('data-on', 'C' + hour);
    this.switchSpan.setAttribute('data-off', 'F' + hour);

    this.switchUnit.append(
      this.switchInput,
      this.switchSpan,
      switchSpanHandle
    );

    this.switchUnitTemp.append(this.switchUnit);

    this.changeLanguage.append(
      languageEN,
      languageRU,
      languageBY
    );

    this.switchUnitInput = this.temperature;
    this.changeLanguage.value = this.language;

    buttonPanel.append(
      this.changePicture,
      this.changeLanguage,
      this.switchUnitTemp
    );

    return buttonPanel;
  }

  bindClickImageBtn(handler) {
    this.changePicture.addEventListener('click', () => {
      handler();
    });
  }

  bindClickSwitchBtn(handler, handlerSec) {
    this.switchUnit.addEventListener('click', () => {
      if (this.switchInput.checked) {
        this.temperature = this.switchSpan.getAttribute('data-off');
        localStorage.setItem('temperature', this.temperature);
        this.switchInput.removeAttribute('checked');
        handler();
      } else {
        this.switchInput.setAttribute('checked', 'true');
        this.temperature = this.switchSpan.getAttribute('data-on');
        localStorage.setItem('temperature', this.temperature);
        handlerSec();
      }
    });
  }
}
