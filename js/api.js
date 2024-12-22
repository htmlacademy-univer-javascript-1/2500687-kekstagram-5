function sendData(onSendSuccess, onSendError, formData) {
  return fetch('https://29.javascript.htmlacademy.pro/kekstagram', {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        onSendSuccess();
      } else {
        onSendError(); // Обработка серверных ошибок
        throw new Error('Ошибка отправки данных на сервер');
      }
    })
    .catch(() => {
      onSendError(); // Обработка сетевых ошибок
      throw new Error('Сетевая ошибка при отправке данных');
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
