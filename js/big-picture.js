const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const commentsContainer = bigPicture.querySelector('.social__comments');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsCounter = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

let currentCommentIndex = 0;
const COMMENTS_PER_LOAD = 5;
let commentsData = [];

function createComment(commentData) {
  const comment = document.createElement('li');
  comment.innerHTML =
    '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
  comment.classList.add('social__comment');

  comment.querySelector('.social__picture').src = commentData.avatar;
  comment.querySelector('.social__picture').alt = commentData.name;
  comment.querySelector('.social__text').textContent = commentData.message;

  return comment;
}

function renderComments(comments, startIndex = 0) {
  const fragment = document.createDocumentFragment();
  const endIndex = Math.min(startIndex + COMMENTS_PER_LOAD, comments.length);
  for (let i = startIndex; i < endIndex; i++) {
    fragment.append(createComment(comments[i]));
  }
  commentsContainer.append(fragment);
  currentCommentIndex = endIndex;
  commentsCounter.textContent = `${currentCommentIndex} из ${comments.length}`;
  if (currentCommentIndex >= comments.length) {
    commentsLoader.classList.add('hidden');

  } else {
    commentsLoader.classList.remove('hidden');
  }
}

function addPictureDetails(data) {
  bigPicture.querySelector('.big-picture__img img').src = data.url;
  bigPicture.querySelector('.likes-count').textContent = data.likes;
  bigPicture.querySelector('.social__caption').textContent = data.description;

  commentsContainer.innerHTML = '';
  currentCommentIndex = 0;
  commentsData = data.comments;

  renderComments(commentsData, currentCommentIndex);

  commentsLoader.removeEventListener('click', onLoadMoreComments); // Удаляем старый обработчик
  commentsLoader.addEventListener('click', onLoadMoreComments);
}

function onLoadMoreComments() {
  renderComments(commentsData, currentCommentIndex);
}

function openBigPicture(data) {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  addPictureDetails(data);
  document.addEventListener('keydown', onEscDown);
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  commentsLoader.removeEventListener('click', onLoadMoreComments); // Открепляем обработчик
  document.removeEventListener('keydown', onEscDown);
}

function onEscDown(evt) {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    closeBigPicture();
  }
}

closeButton.addEventListener('click', closeBigPicture);

export { openBigPicture };
