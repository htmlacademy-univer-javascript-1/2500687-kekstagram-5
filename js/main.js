import {getData} from './api.js';
import {renderPhotos} from './create-photos.js';
import {showErrorMessage} from './utils.js';
import {setupFilters} from './filter.js';
import './form.js';
import './edit-picture.js';


async function loadPhotos() {
  try {
    const photos = await getData();
    renderPhotos(photos);
    setupFilters(photos);
  } catch (error) {
    showErrorMessage('Не удалось загрузить фотографии. Попробуйте обновить страницу.');
  }
}

loadPhotos();
