import { createElement } from '../component/createElement';

export class ControlBlock {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.switchUnitTemp = createElement('div', 'switch-temp');
    this.switchUnit = createElement('label', 'switch-label');
    this.switchInput = createElement('input', 'switch-input');
  }

  createControlBlock(rootElement) {
    const buttonPanel = createElement('div', 'wrapper', 'button-panel');
    const changePicture = createElement('button', 'button-base', 'change-picture');

    const changeLanguage = createElement('select', 'drop-list-language');
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

    this.switchUnit.addEventListener('click', () => {
      this.switchBtnClickHandler();
    });

    this.switchUnit.append(
      this.switchInput,
      switchSpan,
      switchSpanHandle
    );

    this.switchUnitTemp.append(
      this.switchUnit
    );

    changeLanguage.append(
      languageEN,
      languageRU,
      languageBY
    );

    buttonPanel.append(
      changePicture,
      changeLanguage,
      this.switchUnitTemp
    );

    return buttonPanel;
  }

  switchBtnClickHandler() {
    if (this.switchInput.checked) {
      this.switchInput.removeAttribute('checked');
    } else {
      this.switchInput.setAttribute('checked', 'true');
    }
  }

}
