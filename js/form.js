import {showMessage} from './utils.js';
import {resetScale, resetEffects} from './edit-picture.js';
import {sendData} from './api.js';

const form = document.querySelector('.img-upload__form');
const body = document.querySelector('body');
const uploadFile = form.querySelector('.img-upload__input');
const uploadOverlay = form.querySelector('.img-upload__overlay');
const uploadCloseButton = form.querySelector('.img-upload__cancel');
const hashtags = form.querySelector('.text__hashtags');
const description = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');
const imagePreview = form.querySelector('.img-upload__preview img');
const effectsPreviews = form.querySelectorAll('.effects__preview');
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i; //регулярное выражение для проверки хэш-тегов
const MAX_HASHTAGS_COUNT = 5; //максимальное число хэштегов
const MAX_HASHTAG_LENGTH = 20; //максимальная длина хэштега
const MAX_DESCRIPTION_LENGTH = 140; //максимальная длина комментария

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper', //родитель, к которому добавляются классы
  errorTextParent: 'img-upload__field-wrapper', //куда вставлять текст ошибки
  errorTextTag: 'div', //тег для текста ошибки
  errorTextClass: 'pristine-error' //класс для текста ошибки
});

function closeForm() {
  form.reset();
  pristine.reset();
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  hashtags.value = '';
  description.value = '';
  imagePreview.src = '';
  effectsPreviews.forEach((preview) => (preview.style.backgroundImage = ''));
  resetScale();
  resetEffects();
  document.removeEventListener('keydown', onEscKeydown);
}

function onEscKeydown(evt) {
  if (evt.key === 'Escape' && !(document.activeElement === hashtags) && !(document.activeElement === description)) {
    evt.preventDefault();
    closeForm();
  }
}

function openForm() {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
}

function onUploadFile() {
  const file = uploadFile.files[0];
  const validFormats = ['image/jpeg', 'image/png', 'image/jpg'];

  if (file && validFormats.includes(file.type)) {
    const reader = new FileReader();

    reader.onload = () => {
      imagePreview.src = reader.result; //устанавливаем загруженное изображение
      effectsPreviews.forEach((preview) => {
        preview.style.backgroundImage = `url(${reader.result})`; //обновляем эффекты
      });
      openForm();
    };

    reader.readAsDataURL(file);
  } else {
    showMessage('error');
    uploadFile.value = ''; //сбрасываем поле ввода файла
  }
}

uploadFile.addEventListener('change', onUploadFile);
uploadCloseButton.addEventListener('click', closeForm);

function validateHashtags(value) {
  if (value.trim() === '') {
    return true; //проверка на пустоту: хэш-теги не обязательны
  }
  const hashtagsToValidate = value.toLowerCase().trim().split(/\s+/); //разделение хэш-тегов по пробелам
  if (hashtagsToValidate.length > MAX_HASHTAGS_COUNT) {
    return false; //нельзя указать больше 5 хэш-тегов
  }
  for (const hashtag of hashtagsToValidate) {
    if (hashtag === '#') {
      return false; //хэш-тег неможет состоять только из решетки
    }
    if (!HASHTAG_REGEX.test(hashtag)) {
      return false; //хэш-тег должен начинаться с # и состоять только из букв и цифр
    }
    if (hashtag.includes('#', 1)){
      return false; //хэш-теги должны быть разделены пробелами
    }
    if (hashtag.length > MAX_HASHTAG_LENGTH) {
      return false; //хэш-тег не должен быть длиной больше 20 символов
    }
  }

  const uniqueHashtags = new Set(hashtagsToValidate);
  if (uniqueHashtags.size !== hashtagsToValidate.length) {
    return false; //один и тот же хэш-тег не может быть использован дважды
  }

  return true; //если все проверки пройдены
}

function getHashtagsErrorMessage(value) {
  const hashtagsToValidate = value.trim().split(/\s+/);

  if (hashtagsToValidate.length > MAX_HASHTAGS_COUNT) {
    return `Нельзя указать больше ${MAX_HASHTAGS_COUNT} хэш-тегов`;
  }

  const uniqueHashtags = new Set(hashtagsToValidate.map((tag) => tag.toLowerCase()));
  if (uniqueHashtags.size !== hashtagsToValidate.length) {
    return 'Хэш-теги не должны повторяться';
  }

  for (const hashtag of hashtagsToValidate) {
    if (hashtag === '#') {
      return 'Хэш-тег не может состоять только из одной решётки';
    }
    if (hashtag.includes('#', 1)) {
      return 'Хэш-теги должны быть разделены пробелами';
    }
    if (hashtag.length > MAX_HASHTAG_LENGTH) {
      return `Максимальная длина одного хэш-тега — ${MAX_HASHTAG_LENGTH} символов, включая решётку`;
    }
    if (!HASHTAG_REGEX.test(hashtag)) {
      return 'Хэш-тег должен начинаться с # и содержать только буквы и цифры, без спецсимволов и пробелов';
    }
  }

  return ''; //если ошибок нет
}

function validateDescription(value) {
  return value.length <= MAX_DESCRIPTION_LENGTH;
}

function getDescriptionErrorMessage() {
  return `Длина комментария не может превышать ${MAX_DESCRIPTION_LENGTH} символов`;
}

pristine.addValidator(
  hashtags,
  validateHashtags,
  getHashtagsErrorMessage
);

pristine.addValidator(
  description,
  validateDescription,
  getDescriptionErrorMessage
);

function blockSubmitButton() {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикация...';
}

function unblockSubmitButton() {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
}

function onSuccess() {
  closeForm();
  showMessage('success');
}

function onError() {
  showMessage('error');
}

async function onFormSubmit(event) {
  event.preventDefault();

  if (pristine.validate()) {
    const formData = new FormData(form);
    blockSubmitButton();

    try {
      await sendData(onSuccess, onError, formData); //ждём завершения отправки
    } catch (error) {
      onError();
    } finally {
      unblockSubmitButton();
    }
  }
}

form.addEventListener('submit', onFormSubmit);
