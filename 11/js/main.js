import {createDescriptions} from './utils.js';
import {messages, names, photoDescription} from './data.js';
import { renderPhotos} from './create-photos.js';
import './form.js';
import './edit-picture.js';

const photoDescriptions = createDescriptions(photoDescription, messages, names);
renderPhotos(photoDescriptions);
