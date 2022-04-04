import throttle from 'lodash.throttle';
localStorage.clear();
const form = document.querySelector('.feedback-form');
// отслеживаем INPUT и обновляем хранилище не чаще чем раз в 500 мс
form.addEventListener('input', throttle(inputData, 500));

const formData = {};
// при вводе данных записываем их в объект FormData
function inputData(evt) {
  formData[evt.target.name] = evt.target.value;
  const dataJson = JSON.stringify(formData);
  localStorage.setItem('feedback-form-state', dataJson);
  console.log(formData);
}
// очищение полей формы и хранилища, вывод в консоль
form.addEventListener('submit', submitForm);
function submitForm(evt) {
  evt.preventDefault();
  console.log(localStorage);
  //evt.currentTarget.submit();
  evt.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
  localStorage.clear();
}

function dataLocalStorage() {
  const data = JSON.parse(localStorage.getItem('feedback-form-state'));
  //проверка формы
  const email = document.querySelector('.feedback-form input');
  const message = document.querySelector('.feedback-form textarea');

  if (!email.value || !message.value) {
    console.log('The form is empty!');
  } else {
    email.value = data.email;
    message.value = data.message;
  }
}
dataLocalStorage();
