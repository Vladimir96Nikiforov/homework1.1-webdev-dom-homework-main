import { renderComments } from "./render.js";

const host = 'https://wedev-api.sky.pro/api/v2/Vladimir-Nikiforov/comments';
const token = 'Bearer asb4c4boc86gasb4c4boc86g37k3bk3cg3c03ck3k37w3cc3bo3b8';



export function getAPI() {
    const fetchPromiseGet = fetch(
        host,
        {
            method: 'GET',
            headers: {
                Authorization: token,
            }
        }
    );
    fetchPromiseGet
        .then((response) => {
            if (response.status === 401) {
                const pass = prompt("Введите верный пароль");
                renderComments();
                throw new Error("нет авторизации")
            }
            if (response.status === 500) {
                /* текст ошибки */
                throw new Error('Ошибка 500');
            }
            /*возвращаем данные при успешном выполнеии запроса*/
            return response.json();
        })
        .then((responseData) => {
            console.log(responseData);
        //    people = responseData.comments; //comments это ключ массива в документации
            renderComments(responseData.comments);
        })
        .catch((error) => {
            console.log(error);
            if (error.message === 'Ошибка 500') {
                alert(
                    'Ошибка при получении комментариев, пожалуйста, попробуйте позже'
                );
            }
            // console.error(error.message);
        });
    /* тут возможна только 500 ошибка*/
}



export function postAPI() {
    const buttonElement = document.getElementById("add-button");
    const commentText = document.getElementById("add-form-text");

    buttonElement.disabled = true;
    buttonElement.textContent = 'Элемент добавляется...';
    fetch(
        host,
        {
            method: 'POST',
            headers: {
                Authorization: token,
            },
            body: JSON.stringify({
                text: commentText.value,
                name: name.value,
                forceError: true, //добавили при 500 ошибке
            }),
        }
    )
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
        });
}