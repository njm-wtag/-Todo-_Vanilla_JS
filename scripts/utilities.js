import { taskInputText, errorMessage } from "./elements.js";

export const debounce = (searchFilter, delay = 1000) => {
  let timer;
  return function (...args) {
    if (!timer) {
      return searchFilter.apply(this, args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
    }, delay);
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
