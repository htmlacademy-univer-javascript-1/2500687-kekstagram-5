//Вспомогательные функции
const body = document.querySelector('body');
const successTemplate = document.querySelector('#success').content.cloneNode(true);
const successElement = successTemplate.querySelector('.success');
const successButton = successElement.querySelector('.success__button');
const errorTemplate = document.querySelector('#error').content.cloneNode(true);
const errorElement = errorTemplate.querySelector('.error');
const errorButton = errorElement.querySelector('.error__button');

//показать сообщение об отправке формы (успех, если отправилось, ошибка, если нет)
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

//показ сообщения об ошибки загрузки с сервера
function showErrorMessage(message) {
  const errorContainer = document.createElement('div');
  errorContainer.style.position = 'fixed';
  errorContainer.style.top = '50%';
  errorContainer.style.left = '50%';
  errorContainer.style.transform = 'translate(-50%, -50%)';
  errorContainer.style.padding = '20px';
  errorContainer.style.backgroundColor = 'rgba(255, 0, 0, 0.9)';
  errorContainer.style.color = '#fff';
  errorContainer.style.fontSize = '18px';
  errorContainer.style.textAlign = 'center';
  errorContainer.style.borderRadius = '10px';
  errorContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
  errorContainer.textContent = message;

  document.body.appendChild(errorContainer);
}

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {showMessage, showErrorMessage, debounce};
