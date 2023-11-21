export function likeEventListeners() {
    const likeElements = document.querySelectorAll('.likes');
    for (const likeElement of likeElements) {
      likeElement.addEventListener('click', () => {
        const index = likeElement.dataset.like;
        console.log(index);

        if (people[index].isLiked === false) {
          people[index].likes++;
          people[index].isLiked = true;
        } else {
          people[index].likes--;
          people[index].isLiked = false;
        }
        console.log(people[index].likes);
        this.renderComments();
      });
    }
  }


  export function handlinerButton() {
    const buttonWrite = document.querySelector('.add-form-button');
    buttonWrite.addEventListener('click', () => {
      console.log('click');
      this.postAPI();
      this.renderComments();
    });
  }


  export function commentEventListeners() {
    const addFormTexts = document.querySelectorAll('.comment-text');
    for (const addFormText of addFormTexts) {
      addFormText.addEventListener('click', (event) => {
        event.stopPropagation();
        console.log(addFormText.dataset.index);
        console.log(event);
        document.getElementById('add-form-text').value =
          '>' + people[addFormText.dataset.index].descr + ',';

        // this.postAPI();
        // this.renderComments();
      });
    }
  }