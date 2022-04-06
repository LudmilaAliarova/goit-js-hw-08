import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
// отслеживаем INPUT и обновляем хранилище не чаще чем раз в 500 мс
form.addEventListener('input', throttle(inputData, 500));
form.addEventListener('submit', submitForm);

dataLocalStorage();

const formData = {};
// при вводе данных записываем их в объект FormData
function inputData(evt) {
  formData[evt.target.name] = evt.target.value;
  const dataJson = JSON.stringify(formData);
  localStorage.setItem('feedback-form-state', dataJson);
  console.log(formData);
}
// очищение полей формы и хранилища, вывод в консоль

function submitForm(evt) {
  evt.preventDefault();
  console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
  evt.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
}

function dataLocalStorage() {
  const data = JSON.parse(localStorage.getItem('feedback-form-state'));
  //проверка формы
  const email = document.querySelector('.feedback-form input');
  const message = document.querySelector('.feedback-form textarea');
  // заполнение полей при перезагрузке страницы
  if (data.email) {
    email.value = data.email;
  }
  if (data.message) {
    message.value = data.message;
  }
}
