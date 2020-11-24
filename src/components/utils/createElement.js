export const createElement = (tag, ...classNames) => {
  const element = document.createElement(tag);

  if (!!classNames && classNames.length > 0) {
    element.classList.add(...classNames);
  }

  return element;
};
