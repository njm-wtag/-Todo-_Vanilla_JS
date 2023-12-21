import { taskInputText, errorMessage } from "./elements.js";

export const debounce = (searchFilter, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const result = searchFilter(...args);
      // console.log(searchFilter.apply(this, arguments));
      console.log({ result });
      return result;
    }, delay);
  };
};

// export const debounce = (searchFilter, delay) => {
//   let timer;
//   return function () {
//     clearTimeout(timer);
//     return function () {
//       return new Promise((resolve) => {
//         timer = setTimeout(() => {
//           const result = searchFilter.apply(this, arguments);
//           searchFilter.apply(this, arguments);
//           resolve(result);
//         }, delay);
//       });
//     };
//   };
// };

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
