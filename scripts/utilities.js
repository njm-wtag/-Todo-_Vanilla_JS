import { taskInputText, errorMessage } from "./elements.js";

export const debounce = (searchFilter, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    return new Promise((resolve) => {
      timer = setTimeout(() => {
        const result = searchFilter(...args);
        resolve(result);
      }, delay);
    });
  };
};

export const isUserInputValid = (textContent) => {
  return textContent.trim() !== "";
};

export const validateInput = () => {
  if (isUserInputValid(taskInputText.value)) {
    errorMessage.innerHTML = "";

    return true;
  }

  errorMessage.innerHTML = "Please add a task";
  errorMessage.classList.add("errorText");
  return false;
};
