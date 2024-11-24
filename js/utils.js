//Вспомогательные функции

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomArrayElement = (array) => array[getRandomNumber(0, array.length - 1)];

function getRandomMessage(messages) {
  const numberOfMessage = getRandomNumber(1,2); //1 или 2 сообщения
  const randomMessages = [];
  for (let i = 0; i < numberOfMessage; i++) {
    randomMessages.push(getRandomArrayElement(messages));
  }
  return randomMessages;
}

function createComments(messages, names, usedIds = [], minId = 100, maxId = 1000) {
  const comments = [];
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
      avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
      message: getRandomMessage(messages),
      name: getRandomArrayElement(names)
    };
    comments.push(comment); //добавляем в общий массив комментариев
  }
  return comments;
}

function createDescriptions(photoDescription, messages, names) { //создаем 25 описаний к фото
  const descriptions = [];
  for (let i = 1; i <= 25; i++) {
    const oneDescription = {
      id: i,
      url: `photos/${i}.jpg`,
      description: getRandomArrayElement(photoDescription),
      likes: getRandomNumber(15, 200),
      comments: createComments(messages, names)
    };
    descriptions.push(oneDescription);
  }
  return descriptions;
}
export {createDescriptions};
