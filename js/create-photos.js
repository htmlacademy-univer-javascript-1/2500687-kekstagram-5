import {createDescriptions} from './utils.js';
import {messages, names, photoDescription} from './data.js';


function renderPhotos(descriptions) {
  const template = document.querySelector('#picture'); //шаблон элемента фотографии
  const picturesContainer = document.querySelector('.pictures'); //контейнер для фотографий
  const fragment = document.createDocumentFragment();

  descriptions.forEach((description) => {
    const element = template.content.cloneNode(true);

    //заполняем данные
    const img = element.querySelector('.picture__img');
    img.src = description.url;
    img.alt = description.description;
    const likes = element.querySelector('.picture__likes');
    likes.textContent = description.likes;
    const comments = element.querySelector('.picture__comments');
    comments.textContent = description.comments.length;

    fragment.appendChild(element);
  });

  picturesContainer.appendChild(fragment);
}

const photoDescriptions = createDescriptions(photoDescription, messages, names);
renderPhotos(photoDescriptions);
