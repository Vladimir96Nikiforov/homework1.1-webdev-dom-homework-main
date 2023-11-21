export function renderForm(){
`
<div class="add-form">
<input
  type="text"
  class="add-form-name"
  placeholder="Введите ваше имя"
  id="add-form-name"
  ;
/>
<textarea
  type="textarea"
  class="add-form-text"
  id="add-form-text"
  placeholder="Введите ваш коментарий"
  rows="4"
  id="add-form-text"
></textarea>
<div class="add-form-row">
  <button class="add-form-button" id="add-button">Написать</button>
  <button class="add-form-button" id="delete-button">Удалить</button>
</div>
</div>
`
}