import {showMessage} from './utils.js';

const form = document.querySelector('.img-upload__form');
const body = document.querySelector('body');
const uploadFile = form.querySelector('#upload-file');
const uploadOverlay = form.querySelector('.img-upload__overlay');
const uploadCloseButton = form.querySelector('.img-upload__cancel');
const hashtags = form.querySelector('.text__hashtags');
const description = form.querySelector('.text__description');
const submitButton = document.querySelector('#upload-submit');
const HASHTAG_REGEX = /^#[a-zA-Zа-яА-ЯёЁ0-9]/; //регулярное выражение для проверки хэш-тегов

function closeForm() {
  form.reset();
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
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

uploadFile.addEventListener('change', openForm);
uploadCloseButton.addEventListener('click', closeForm);

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper', // Родитель, к которому добавляются классы
  errorTextParent: 'img-upload__field-wrapper', // Куда вставлять текст ошибки
  errorTextTag: 'div', // Тег для текста ошибки
  errorTextClass: 'pristine-error' // Класс для текста ошибки
});

function validateHashtags(value) {
  if (value.trim() === '') {
    return true; //проверка на пустоту: хэш-теги не обязательны
  }
  const hashtagsToValidate = value.toLowerCase().trim().split(/\s+/); //разделение хэш-тегов по пробелам
  if (hashtagsToValidate.length > 5) {
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
    if (hashtag.length > 20) {
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

  if (hashtagsToValidate.length > 5) {
    return 'Нельзя указать больше 5 хэш-тегов';
  }

  for (const hashtag of hashtagsToValidate) {
    if (hashtag === '#') {
      return 'Хэш-тег не может состоять только из одной решётки';
    }
    if (!HASHTAG_REGEX.test(hashtag)) {
      return 'Хэш-тег должен начинаться с # и содержать только буквы и цифры, без спецсимволов и пробелов';
    }
    if (hashtag.includes('#', 1)) {
      return 'Хэш-теги должны быть разделены пробелами';
    }
    if (hashtag.length > 20) {
      return 'Максимальная длина одного хэш-тега — 20 символов, включая решётку';
    }
  }

  const uniqueHashtags = new Set(hashtagsToValidate);
  if (uniqueHashtags.size !== hashtagsToValidate.length) {
    return 'Хэш-теги не должны повторяться';
  }

  return ''; //если ошибок нет
}

function validateDescription(value) {
  return value.length <= 140;
}

function getDescriptionErrorMessage() {
  return 'Длина комментария не может превышать 140 символов';
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

function sendData(onSendSuccess, onSendError, formData) {
  fetch('https://29.javascript.htmlacademy.pro/kekstagram', {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        onSendSuccess();
        closeForm(); // Закрываем форму при успехе
      } else {
        onSendError(); // Обработка серверных ошибок
      }
    })
    .catch(() => {
      onSendError(); // Обработка сетевых ошибок
    });
}

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
  form.reset();
  pristine.reset();
}

function onError() {
  showMessage('error');
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (pristine.validate()) {
    const formData = new FormData(form);
    blockSubmitButton();
    sendData(
      onSuccess, // Успешная отправка
      onError, // Ошибка отправки
      formData
    );
    unblockSubmitButton();
  } else {
    showMessage('error');
  }
});
