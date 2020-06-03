import { createElement } from '../component/createElement';

export class ControlBlock {
  constructor(rootElement) {
    this.rootElement = rootElement;
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

    const switchUnitTemp = createElement('div', 'switch-temp');
    const switchUnit = createElement('label', 'switch-label');
    const switchInput = createElement('input', 'switch-input');
    const switchSpan = createElement('span', 'switch-span');
    const switchSpanHandle = createElement('span', 'switch-handle');

    switchUnit.setAttribute('for','switch-input');
    switchInput.setAttribute('checked','true');
    switchSpan.setAttribute('data-on', ''.concat(String.fromCharCode(176), 'F'));
    switchSpan.setAttribute('data-off',''.concat(String.fromCharCode(176), 'C'));

    switchUnit.append(
      switchInput,
      switchSpan,
      switchSpanHandle
    );

    switchUnitTemp.append(
      switchUnit
    );

    changeLanguage.append(
      languageEN,
      languageRU,
      languageBY
    );

    buttonPanel.append(
      changePicture,
      changeLanguage,
      switchUnitTemp
    );

    return buttonPanel;
  };
}
