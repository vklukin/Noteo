export const ValidateEmail = (text, inputElement, submitButton) => {
  let validEmail = new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

  if (validEmail.test(text)) {
    if (inputElement.classList.contains("error-input")) {
      submitButton.disabled = false;
      inputElement.classList.remove("error-input");
    }
  } else {
    submitButton.disabled = true;
    inputElement.classList.add("error-input");
  }
};
