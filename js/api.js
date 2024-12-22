function sendData(onSendSuccess, onSendError, formData) {
  fetch('https://29.javascript.htmlacademy.pro/kekstagram', {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        onSendSuccess();
      } else {
        onSendError(); // Обработка серверных ошибок
      }
    })
    .catch(() => {
      onSendError(); // Обработка сетевых ошибок
    });
}
function getData() {
  return fetch('https://29.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Не удалось загрузить данные!');
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
}

export {sendData, getData};
