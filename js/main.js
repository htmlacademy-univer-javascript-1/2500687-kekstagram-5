const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomArrayElement = (array) => array[getRandomNumber(0, array.length - 1)];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = [ 'Иван', 'Илья', 'Сергей', 'Георгий', 'Максим', 'Виктория', 'Алёна', 'Ольга', 'Наталья', 'Яна' ];

const photoTags = [
  'Неспокойное море',
  'Смешной котёнок',
  'Цветочный сад',
  'Ночной мегаполис',
  'Кафе на берегу',
  'Цветочный сад'
];

const descriptions = [];
const comments = [];
const usedIds = [];
const minId = 100;
const maxId = 1000;

function getRandomMessage() {
  const numberOfMessage = getRandomNumber(1,2); //1 или 2 сообщения
  const randomMessages = [];
  for (let i = 0; i < numberOfMessage; i++) {
    randomMessages.push(getRandomArrayElement(messages));
  }
  return randomMessages;
}

function createComments() {
  //генерируем уникальный id
  let id;
  for (let j = 0; j < getRandomNumber(0, 30); j++) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      id = getRandomNumber(minId, maxId);
      if (usedIds.indexOf(id) === -1) { // проверяем, не использовался ли id ранее
        usedIds.push(id);
        break;
      }
    }
    //создаем комментарий
    const comment = {
      id: id,
      avatar: `img/avatar-${ getRandomNumber(1, 6)}.svg`,
      message: getRandomMessage(),
      name: getRandomArrayElement(names)
    };
    comments.push(comment); //добавляем в общий массив комментариев
  }
  return comments;
}

function createDescriptions() { //создаем 25 описаний к фото
  for (let i = 1; i <= 25; i++) {
    const oneDescription = {
      id: i,
      url: `photos/${ i }.jpg`,
      description: getRandomArrayElement(photoTags),
      likes: getRandomNumber(15, 200),
      comments: createComments()
    };
    descriptions.push(oneDescription);
  }
}
createDescriptions();
