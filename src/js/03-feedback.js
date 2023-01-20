import throttle from 'lodash.throttle';

const KEY_STORAGE = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  message: document.querySelector('.feedback-form textarea'),
  btn: document.querySelector('.feedback-form button'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

formInfo();

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log({ email: refs.email.value, message: refs.message.value });
  evt.currentTarget.reset();
  localStorage.removeItem(KEY_STORAGE);
}

function onFormInput() {
  const formData = JSON.stringify({
    email: refs.email.value,
    message: refs.message.value,
  });

  localStorage.setItem(KEY_STORAGE, formData);
}

function formInfo() {
  const savedInfo = JSON.parse(localStorage.getItem(KEY_STORAGE));
  if (savedInfo) {
    refs.email.value = savedInfo.email;
    refs.message.value = savedInfo.message;
  }
}
