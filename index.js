import {
  addTaskButton,
  listTitle,
  navbar,
  searchButton,
  searchInput,
  taskInputText,
  taskContainer,
  createToggleButton,
  inputContainer,
} from "./scripts/elements.js";
import { todos } from "./scripts/deteleTask.js";
import { createTaskElement } from "./scripts/taskActions.js";
import { validateInput } from "./scripts/utilities.js";
import { COMPLETE, INCOMPLETE } from "./const.js";
import { handleCreateTodo } from "./scripts/addTask.js";

const renderFilteredTodoList = () => {
  const filter = document.getElementById("filter");
  const selectedType = filter.value;
  taskContainer.innerHTML = "";

  switch (selectedType) {
    case COMPLETE:
      renderTasksByStatus(true);

      break;
    case INCOMPLETE:
      renderTasksByStatus(false);

      break;
    default:
      renderTodoList();
  }
};

const renderTasksByStatus = (isDone) => {
  const filteredTodos = todos.filter((todo) => todo.isDone === isDone);

  filteredTodos.forEach((todo) => {
    const newTask = todo;
    taskContainer.appendChild(newTask);
  });
};

const debounce = (handleSearch, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      handleSearch(...args);
    }, delay);
  };
};

const handleSearch = () => {
  const searchText = searchInput.value.toLowerCase().trim();
  const filteredTasks = todos.filter((task) =>
    task.value.toLowerCase().includes(searchText)
  );

  taskContainer.innerHTML = "";
  console.log({ taskInputText });
  filteredTasks.forEach((task) => {
    const newTask = createTaskElement(task);
    taskContainer.appendChild(newTask);
  });
};

export const renderTodoList = () => {
  // taskContainer.innerHTML = "";
  searchInput.value = "";
  filter.value = "all";
  todos.forEach((todo) => {
    const newTask = createTaskElement(todo);
    taskContainer.appendChild(newTask);
  });
};

// const handleToggleCard = () => {
//   //   if (inputContainer.classList.contains("hide")) {
//   //     inputContainer.classList.remove("hide");
//   //     inputContainer.classList.add("show");
//   //   } else inputContainer.classList.add("hide");
//   //   inputContainer.classList.remove("show");
//   inputContainer.style.display =
//     inputContainer.style.display === "none" ||
//     inputContainer.style.display === ""
//       ? "block"
//       : "none";
// };
// createToggleButton.addEventListener("click", handleToggleCard);
addTaskButton.addEventListener("click", handleCreateTodo);
// addTaskButton.addEventListener("click", handleToggleTodo);
// document.addEventListener("DOMContentLoaded", handleToggleTodo);

taskInputText.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    handleCreateTodo();
  }
});

// taskInputText.addEventListener("input", validateInput);

searchButton.addEventListener("click", () => {
  navbar.classList.toggle("show-search-box");
});

searchInput.addEventListener("keyup", () => {
  const debouncedSearchData = debounce(handleSearch, 400);
  debouncedSearchData();
});

filter.addEventListener("change", renderFilteredTodoList);

renderTodoList();
