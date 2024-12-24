import '../vendor/nouislider/nouislider.js';

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.img-upload__effects');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

const SCALE_STEP = 25; //шаг изменения
const SCALE_MIN = 25; //минимальное значение
const SCALE_MAX = 100; //максимальное значение
const SCALE_DEFAULT = 100; //значение по умолчанию

//устанавливаем значение масштаба
let currentScale = SCALE_DEFAULT;

function setScale(value) {
  currentScale = value;
  scaleControlValue.value = `${currentScale}%`;
  imagePreview.style.transform = `scale(${currentScale / 100})`;
}

//уменьшение масштаба
scaleControlSmaller.addEventListener('click', () => {
  if (currentScale > SCALE_MIN) {
    setScale(currentScale - SCALE_STEP);
  }
});

//увеличение масштаба
scaleControlBigger.addEventListener('click', () => {
  if (currentScale < SCALE_MAX) {
    setScale(currentScale + SCALE_STEP);
  }
});

//сброс масштаба
function resetScale() {
  currentScale = 100;
  scaleControlValue.value = `${currentScale}%`;
  imagePreview.style.transform = 'scale(1)'; // Масштаб 100% соответствует scale(1)
}

//устанавливаем масштаб по умолчанию при открытии формы
setScale(SCALE_DEFAULT);

//параметры эффектов
const EFFECTS = {
  none: {filter: '', min: 0, max: 0, step: 0, unit: ''},
  chrome: {filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: ''},
  sepia: {filter: 'sepia', min: 0, max: 1, step: 0.1, unit: ''},
  marvin: {filter: 'invert', min: 0, max: 100, step: 1, unit: '%'},
  phobos: {filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px'},
  heat: {filter: 'brightness', min: 1, max: 3, step: 0.1, unit: ''},
};

//текущий эффект
let currentEffect = 'none';

//инициализация слайдера
noUiSlider.create(effectLevelSlider, {
  range: {min: 0, max: 100},
  start: 100,
  step: 1,
  connect: 'lower',
});

function updateEffect() {
  const {filter, unit} = EFFECTS[currentEffect];
  const value = parseFloat(effectLevelSlider.noUiSlider.get());
  if (filter) {
    imagePreview.style.filter = `${filter}(${value}${unit})`;
  } else {
    imagePreview.style.filter = '';
  }
  effectLevelValue.value = value;
}

//обновление параметров слайдера при смене эффекта
function updateSlider(effect) {
  const {min, max, step} = EFFECTS[effect];
  effectLevelSlider.noUiSlider.updateOptions({
    range: { min, max },
    start: max,
    step,
  });

  effectLevelContainer.style.display = effect === 'none' ? 'none' : 'block';
  if (effect !== 'none') {
    effectLevelSlider.noUiSlider.set(max);
  }

  updateEffect();
}

//сброс фильтров
function resetEffects() {
  currentEffect = 'none';
  imagePreview.className = '';
  imagePreview.style.filter = '';
  effectLevelValue.value = '';
  effectLevelContainer.style.display = 'none';
  if (effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.reset();
  }
}

//обработчик смены эффекта
effectsList.addEventListener('change', (event) => {
  if (event.target.classList.contains('effects__radio')) {
    currentEffect = event.target.value;
    updateSlider(currentEffect);
  }
});

//обновление интенсивности эффекта при перемещении ползунка
effectLevelSlider.noUiSlider.on('update', updateEffect);

effectLevelContainer.style.display = 'none';

export {resetScale, resetEffects};
