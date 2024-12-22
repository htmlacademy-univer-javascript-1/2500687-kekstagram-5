//Вспомогательные функции
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomArrayElement = (array) => array[getRandomNumber(0, array.length - 1)];
const body = document.querySelector('body');
const successTemplate = document.querySelector('#success').content.cloneNode(true);
const successElement = successTemplate.querySelector('.success');
const successButton = successElement.querySelector('.success__button');
const errorTemplate = document.querySelector('#error').content.cloneNode(true);
const errorElement = errorTemplate.querySelector('.error');
const errorButton = errorElement.querySelector('.error__button');

function getRandomMessage(messages) {
  const numberOfMessage = getRandomNumber(1,2); //1 или 2 сообщения
  const randomMessages = [];
  for (let i = 0; i < numberOfMessage; i++) {
    randomMessages.push(getRandomArrayElement(messages));
  }
  return randomMessages;
}

function createComments(messages, names, usedIds = [], minId = 100, maxId = 1000) {
  const comments = [];
  //генерируем уникальный id
  let id;
  for (let j = 0; j < getRandomNumber(0, 30); j++) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      id = getRandomNumber(minId, maxId);
      if (usedIds.indexOf(id) === -1) { // проверяем, не использовался ли id ранее
        usedIds.push(id);
        break;
      }
    }
    //создаем комментарий
    const comment = {
      id: id,
      avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
      message: getRandomMessage(messages),
      name: getRandomArrayElement(names)
    };
    comments.push(comment); //добавляем в общий массив комментариев
  }
  return comments;
}

function createDescriptions(photoDescription, messages, names) { //создаем 25 описаний к фото
  const descriptions = [];
  for (let i = 1; i <= 25; i++) {
    const oneDescription = {
      id: i,
      url: `photos/${i}.jpg`,
      description: getRandomArrayElement(photoDescription),
      likes: getRandomNumber(15, 200),
      comments: createComments(messages, names)
    };
    descriptions.push(oneDescription);
  }
  return descriptions;
}

function showMessage(type) {
  const element = type === 'success' ? successElement : errorElement;
  const button = type === 'success' ? successButton : errorButton;

  body.appendChild(element);
  button.addEventListener('click', () => removeMessage(type));
  document.addEventListener('keydown', (event) => onEscKeydown(event, type));
  document.addEventListener('click', (event) => onOutsideClick(event, type));
}

function removeMessage(type) {
  const element = type === 'success' ? successElement : errorElement;

  if (element.parentNode) {
    body.removeChild(element);
    document.removeEventListener('keydown', (event) => onEscKeydown(event, type));
    document.removeEventListener('click', (event) => onOutsideClick(event, type));
  }
}

function onEscKeydown(event, type) {
  if (event.key === 'Escape') {
    event.preventDefault();
    removeMessage(type);
  }
}

function onOutsideClick(event, type) {
  const innerClass = type === 'success' ? '.success__inner' : '.error__inner';
  const element = type === 'success' ? successElement : errorElement;

  if (element && !event.target.closest(innerClass)) {
    removeMessage(type);
  }
}

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
export {createDescriptions, showMessage, debounce};
