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
        this.renderComments()
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
    },


  //likes

  like: function likeEventListeners() {
    const likeElements = document.querySelectorAll(".likes");
    for (const likeElement of likeElements) {
      likeElement.addEventListener("click", () => {
        const index = likeElement.dataset.like;
        console.log(index);


        if(people[index].isLiked === false){
          people[index].likes++
          people[index].isLiked = true;
          }
          else {
          people[index].likes--
          people[index].isLiked = false;
          }
          console.log(people[index].likes);
          this.renderComments();
      });
    }
  },



  renderComments: function renderComments () {

    const likesUlHTML = people.map((comment, index) =>{
    
      return `
       <li class="comment">
      <div>${comment.author.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text" id="answer" data-index=${index}>
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
      <div class="likes" data-like="${index}">
              <span class="likes-counter" id="likes-counter">${comment.likes}</span>
              <button class="like-button ${ comment.isLiked ? '-active-like' : '' }" id="likeButton"></button>
            </div>
          </li>
          `;
          // <button class="like-button ${ comment.isLike ? '-active-like' : '' }" id="likeButton"></button>
                //${ comment.isLike ? '-active-like' : '' } это тот же if
        })
        .join("");
        comments.innerHTML = likesUlHTML;
        this.likeEventListeners();
        this.commentEventListeners()
      },

      commentEventListeners:  function commentEventListeners(){
        const addFormTexts = document.querySelectorAll(".comment-text");
        for (const addFormText of addFormTexts){
        addFormText.addEventListener("click", (event) =>{
          event.stopPropagation()
          console.log(addFormText.dataset.index);
          console.log(event);
          document.getElementById('add-form-text').value = ">" + people[addFormText.dataset.index].descr + ",";
  
        })
      }
    },




    


    time: 
    function time() {
    buttonElement.addEventListener("click", () => {
      if (name.value === "") {
        name.style.backgroundColor = "#ff7d7d";
        return;
      }
      if (commentText.value === "") {
        commentText.style.backgroundColor = "#ff7d7d";
        return;
      }
      

      let date = new Date();
  
    let output =
      String(date.getDate()) +"z"
      "." +
      String(date.getMonth() + 1) +
      "." +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes();
    

      people.push({
        name: name.value.replaceAll("<","&lt;").replaceAll(">","&gt;"),
        descr: commentText.value.replaceAll("<","&lt;").replaceAll(">","&gt;"),
        likesAmount: 0,
        isLike: false,
        date: output
      })
    })

  }
}

export {helper}

