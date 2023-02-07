const form = document.querySelector("#form");
const userName = document.querySelector("#name");
const nameError = document.querySelector("#name-error");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subject-error");
const email = document.querySelector("#email");
const emailError = document.querySelector("#email-error");
const userMessage = document.querySelector("#user-message");
const userMessageError = document.querySelector("#user-message--error");
const message = document.querySelector("#message");

function validateForm(event) {
  event.preventDefault();
  if (checkLength(userName.value, 5)) {
    nameError.style.display = "none";
  } else {
    nameError.style.display = "block";
  }

  if (checkLength(subject.value, 15)) {
    subjectError.style.display = "none";
  } else {
    subjectError.style.display = "block";
  }

  if (checkEmail(email.value)) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  if (checkLength(userMessage.value, 25)) {
    userMessageError.style.display = "none";
  } else {
    userMessageError.style.display = "block";
  }

  formCorrectlyValidated();
};

function checkLength(value, len) {
  if (value.trim().length > len) {
    return true;
  }
  else {
    return false;
  }
}

function checkEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

form.addEventListener("submit", validateForm);

function formCorrectlyValidated() {
  if (checkLength(userName.value, 5) && (checkLength(subject.value, 15)) && (checkEmail(email.value)) && (checkLength(userMessage.value, 25))) {
    message.innerHTML = `<p class="success">Your message has been sent.</p>`;
    console.log(message);
    form.reset();
  }
}
