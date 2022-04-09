import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(inputData, 500));
form.addEventListener('submit', submitForm);

dataLocalStorage();

const formData = {};
function inputData(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  console.log(formData);
}

function submitForm(evt) {
  evt.preventDefault();
  console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
  evt.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
}

function dataLocalStorage() {
  const data = JSON.parse(localStorage.getItem('feedback-form-state'));
  //console.log(data);
  const email = document.querySelector('.feedback-form input');
  const message = document.querySelector('.feedback-form textarea');

  if (data) {
    email.value = data.email || '';
    message.value = data.message || '';
  }
}
