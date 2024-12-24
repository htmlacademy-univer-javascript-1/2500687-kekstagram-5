import {renderPhotos} from './create-photos.js';
import {debounce} from './utils.js';

const imgFiltersElement = document.querySelector('.img-filters');
const defaultFilterButton = imgFiltersElement.querySelector('#filter-default');
const randomFilterButton = imgFiltersElement.querySelector('#filter-random');
const discussedFilterButton = imgFiltersElement.querySelector('#filter-discussed');
const FILTER_DELAY = 500;
const RANDOM_PHOTO_COUNT = 10;

function clearPhotoContainer() {
  const picturesContainer = document.querySelector('.pictures');
  const photos = picturesContainer.querySelectorAll('.picture');
  photos.forEach((photo) => {
    photo.remove();
  });
}

function getRandomUniquePhotos(photos, count) {
  const shuffled = photos.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function getDiscussedPhotos(photos) {
  return photos.slice().sort((a, b) => b.comments.length - a.comments.length);
}

function setupFilters(photos) {
  imgFiltersElement.classList.remove('img-filters--inactive');

  const debouncedRender = debounce((filteredPhotos) => {
    clearPhotoContainer();
    renderPhotos(filteredPhotos);
  }, FILTER_DELAY);

  defaultFilterButton.addEventListener('click', () => {
    debouncedRender(photos);
    setActiveButton(defaultFilterButton);
  });

  randomFilterButton.addEventListener('click', () => {
    debouncedRender(getRandomUniquePhotos(photos, RANDOM_PHOTO_COUNT));
    setActiveButton(randomFilterButton);
  });

  discussedFilterButton.addEventListener('click', () => {
    debouncedRender(getDiscussedPhotos(photos));
    setActiveButton(discussedFilterButton);
  });
}

function setActiveButton(activeButton) {
  const buttons = imgFiltersElement.querySelectorAll('.img-filters__button');
  buttons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  activeButton.classList.add('img-filters__button--active');
}

export {setupFilters};
