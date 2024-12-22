import { getData } from './api.js';
import './form.js';
import './edit-picture.js';
import {renderPhotos, showErrorMessage} from './create-photos.js';
import {setupFilters} from './filter.js';

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
