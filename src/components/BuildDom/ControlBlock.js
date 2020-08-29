import { createElement } from '../utils/createElement';

export class ControlBlock {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.switchUnitTemp = createElement('div', 'switch-temp');
    this.switchUnit = createElement('label', 'switch-label');
    this.switchInput = createElement('input', 'switch-input');
    this.changeLanguage = createElement('select', 'drop-list-language');
    this.changePicture = createElement('button', 'button-base', 'change-picture');
  }

  createControlBlock() {
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

    const switchSpan = createElement('span', 'switch-span');
    const switchSpanHandle = createElement('span', 'switch-handle');

    this.switchUnit.setAttribute('for', 'switch-input');
    this.switchInput.setAttribute('type', 'checkbox');
    this.switchInput.setAttribute('checked', 'false');
    switchSpan.setAttribute('data-on', 'C'.concat(String.fromCharCode(176)));
    switchSpan.setAttribute('data-off', 'F'.concat(String.fromCharCode(176)));

    this.switchUnit.append(
      this.switchInput,
      switchSpan,
      switchSpanHandle
    );

    this.switchUnitTemp.append(
      this.switchUnit
    );

    this.changeLanguage.append(
      languageEN,
      languageRU,
      languageBY
    );

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
        this.switchInput.removeAttribute('checked');
        handler();
      } else {
        this.switchInput.setAttribute('checked', 'true');
        handlerSec();
      }
    });
  }
}
