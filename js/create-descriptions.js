import {getRandomArrayElement, getRandomNumber} from './get-random';
import {createComments} from './create-comments';

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
