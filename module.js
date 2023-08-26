const helper = {
    the: function the(){
        alert("the");
        },




// Получаем с сервера API Get
getAPI: function getAPI(){
    buttonElement.disabled = true;
    buttonElement.textContent = 'Комментарии загружаются...';
    const fetchPromiseGet = fetch(
      'https://wedev-api.sky.pro/api/v1/Vladimir-Nikiforov/comments',
      {
        method: "GET"
      }
    );
    fetchPromiseGet     
      .then((response) => {
        if (!response.ok) {
          if (response.status === 500) {
            /* текст ошибки */
            throw new Error('Ошибка 500');
          }
        }
        /*возвращаем данные при успешном выполнеии запроса*/
        return response.json();
      })


    .then((responseData) => {
        console.log(responseData);
        people = responseData.comments; //comments это ключ массива в документации
        renderComments()
      })
    .then((data) => {
      buttonElement.disabled = false;
      buttonElement.textContent = 'Написать';

})
.catch((error) => {
  buttonElement.disabled = false;
  buttonElement.textContent = 'Написать';
  if (error.message === 'Ошибка 500') {
          alert('Ошибка при получении комментариев, пожалуйста, попробуйте позже');
        }
        console.error(error.message);
});
/* тут возможна только 500 ошибка*/


  },




// Выкидываем все на сервер API Post
postAPI: function postAPI(){
buttonElement.disabled = true;
buttonElement.textContent = 'Элемент добавляется...';
const fetchPromise = fetch('https://wedev-api.sky.pro/api/v1/Vladimir-Nikiforov/comments', {
        method: 'POST',
        body: JSON.stringify({
          text: commentText.value,
          name: name.value,
          forceError: true, //добавили при 500 ошибке
        }),
      })
        .then((response) => {
          if (!response.ok) {
            /* Имеет смысл задавать короткое название ошибок, так как дальше мы будем их разбирать */
            if (response.status === 500) {
              throw new Error('Ошибка 500');
            } else if (response.status === 400) {
              throw new Error('Ошибка 400');
            }
          }

          return response.json();
        })
        .then((responseData) => {
          console.log(responseData);
          getAPI();
        })
        .then(() => {
          buttonElement.disabled = false;
          buttonElement.textContent = 'Написать';
          commentText.value = '';
        })
        .catch((error) => {
          buttonElement.disabled = false;
          buttonElement.textContent = 'Написать';

          /* расшифровка ошибки */

          if (error.message === 'Ошибка 500') {
            alert('Ошибка сервера, попробуйте позже');
            /*return, ибо проверять другие ошибки уже будет не нужно */
            return;
          }

          if (error.message === 'Ошибка 400') {
            /*причина этой ошибки */
            alert('Имя и комментарий должны быть не короче 3 символов');
            return;
          }

          alert('Кажется, у вас сломался интернет, попробуйте позже');

          console.log(error);
        })
    }
}
export {helper}

