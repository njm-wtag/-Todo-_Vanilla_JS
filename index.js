import {
  addTaskButton,
  filter,
  listTitle,
  searchButton,
  searchInput,
  taskInputText,
  taskList,
} from "./scripts/elements.js";
import { handleCreateTodo } from "./scripts/addTask.js";
import { todos } from "./scripts/deteleTask.js";
import { createTaskElement } from "./scripts/taskActions.js";
import { validateInput } from "./scripts/utilities.js";
import { COMPLETE, INCOMPLETE } from "./const.js";

const renderFilteredTodoList = () => {
  const filter = document.getElementById("filter");
  const selectedType = filter.value;
  taskList.innerHTML = "";

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
    const newTask = createTaskElement(todo);
    taskList.appendChild(newTask);
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

  taskList.innerHTML = "";
  filteredTasks.forEach((task) => {
    const newTask = createTaskElement(task);
    taskList.appendChild(newTask);
  });
};

export const renderTodoList = () => {
  taskList.innerHTML = "";

  todos.forEach((todo) => {
    const newTask = createTaskElement(todo);
    taskList.appendChild(newTask);
  });
  if (todos.length > 0) {
    listTitle.classList.remove("hide");
    listTitle.classList.add("show");

    return;
  }

  listTitle.classList.remove("show");
  listTitle.classList.add("hide");
};

addTaskButton.addEventListener("click", handleCreateTodo);
taskInputText.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    handleCreateTodo();
  }
});

taskInputText.addEventListener("input", validateInput);

// searchButton.addEventListener("click", handleSearch);

// searchInput.addEventListener("keyup", (event) => {
//   if (event.key === "Enter") {
//     handleSearch();
//   }
// });

searchInput.addEventListener("keyup", () => {
  const debouncedSearchData = debounce(handleSearch, 400);
  debouncedSearchData();
});

filter.addEventListener("change", renderFilteredTodoList);

renderTodoList();
