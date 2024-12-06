const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const commentsContainer = bigPicture.querySelector('.social__comments');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

function createComment(comment_data) {
  //создаем разметку для комментария
  const comment = document.createElement('li');
  comment.innerHTML =
    '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
  comment.classList.add('social__comment');

  //заполняем комментарий данными
  comment.querySelector('.social__picture').src = comment_data.avatar;
  comment.querySelector('.social__picture').alt = comment_data.name;
  comment.querySelector('.social__text').textContent = comment_data.message;

  return comment;
}

function renderComments(comments) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < comments.length; i++) {
    fragment.append(createComment(comments[i]));
  }
  commentsContainer.innerHTML = ''; //удаляем уже существующие комментарии в разметке
  commentsContainer.append(fragment); //добавляем новые сгенерированные
}

function addPictureDetails(data) {
  bigPicture.querySelector('.big-picture__img img').src = data.url;
  bigPicture.querySelector('.likes-count').textContent = data.likes;
  bigPicture.querySelector('.comments-count').textContent = data.comments.length;
  bigPicture.querySelector('.social__caption').textContent = data.description;
}

function openBigPicture(data) {
  bigPicture.classList.remove('hidden');
  const commentsCounter = bigPicture.querySelector('.social__comment-count');
  const commnetsLoader = bigPicture.querySelector('.comments-loader');
  commentsCounter.classList.add('hidden');
  commnetsLoader.classList.add('hidden');
  body.classList.add('modal-open');
  addPictureDetails(data);
  const comments = data.comments;
  if (comments.length > 0) {
    renderComments(comments);
  };
  document.addEventListener('keydown', onEscDown);
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscDown);
}

function onEscDown(evt) {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    closeBigPicture();
  }
}

closeButton.addEventListener('click', closeBigPicture);

export{openBigPicture};
