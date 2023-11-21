export function renderComments(people) {

    const mailAppHTML = document.getElementById('appHTML');

    // if (!token) {
    //   const appHTML = `
    //   <div class="add-form">
    //   <input
    //     type="text"
    //     class="add-form-name"
    //     placeholder="Введите ваш логин"
    //     id="add-form-login"
    //     ;
    //   />
    //   <br>
    //   <input
    //     type="text"
    //     class="add-form-name"
    //     placeholder="Введите ваш пароль"
    //     id="add-form-pass"
    //     ;
    //   />
    //     <button class="add-form-button" id="add-button-auth">Войти</button>
    //   </div>
    // </div>
    
    // </div>`
    
    // }
    
    
        const likesUlHTML = people
        .map((comment, index) => {
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
                <span class="likes-counter" id="likes-counter">${
                  comment.likes
                }</span>
                <button class="like-button ${
                  comment.isLiked ? '-active-like' : ''
                }" id="likeButton"></button>
              </div>
            </li>
            `;
          // <button class="like-button ${ comment.isLike ? '-active-like' : '' }" id="likeButton"></button>
          //${ comment.isLike ? '-active-like' : '' } это тот же if
        })
        .join('');
    
    
    
        const appHTML = `
        <div class="container" >
        <ul class="comments" id="comments" >
   
        ${likesUlHTML}
    
    
       </ul>
    

        `;
        mailAppHTML.innerHTML = appHTML;
    
        const name = document.getElementById("add-form-name");
        const commentText = document.getElementById("add-form-text");
        const comments = document.getElementById("comments");
        const likeButton = document.getElementById("likeButton");
        const likesContainer = document.getElementById("likes-container");
        const addFormTexts = document.getElementById("add-form-text");
        const buttonElement = document.getElementById("add-button");
        // buttonElement.disabled = true;
        // buttonElement.textContent = 'Комментарий загружается...';
    
        // this.handlinerButton();
        // this.like();
        // this.commentEventListeners();
      }