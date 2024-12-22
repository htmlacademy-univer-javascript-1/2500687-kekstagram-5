import {openBigPicture} from './big-picture.js';

async function renderPhotos(descriptions) {
  const template = document.querySelector('#picture'); //шаблон элемента фотографии
  const picturesContainer = document.querySelector('.pictures'); //контейнер для фотографий
  const fragment = document.createDocumentFragment();

  descriptions.forEach((description) => {
    const element = template.content.cloneNode(true);

    //Заполняем данные
    const img = element.querySelector('.picture__img');
    img.src = description.url;
    img.alt = description.description;
    const likes = element.querySelector('.picture__likes');
    likes.textContent = description.likes;
    const comments = element.querySelector('.picture__comments');
    comments.textContent = description.comments.length;

    const clickableElement = element.querySelector('.picture');
    clickableElement.addEventListener('click', () => {
      openBigPicture(description);
    });

    fragment.appendChild(element);
  });

  picturesContainer.appendChild(fragment);
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

export {renderPhotos, showErrorMessage};
