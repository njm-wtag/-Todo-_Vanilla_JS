import {
  addTaskButton,
  searchButton,
  searchInput,
  taskInputText,
  taskList,
  navbar,
  toggleButton,
  taskInputCard,
  deleteTaskInputCard,
} from "./scripts/elements.js";
import { handleCreateTodo, resetTaskInput } from "./scripts/addTask.js";
import { todos } from "./scripts/deteleTask.js";
import {
  createTaskElement,
  resetFilterTabsToAll,
} from "./scripts/taskActions.js";
import { validateInput } from "./scripts/utilities.js";

export const removeElementsBeforeRender = () => {
  const elementsToKeep = [];
  for (let i = 0; i < taskList.children.length; i++) {
    if (taskList.children[i].id === "card1") {
      elementsToKeep.push(taskList.children[i]);
    }
  }
  taskList.innerHTML = "";
  elementsToKeep.map((element) => {
    taskList.appendChild(element);
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
  removeElementsBeforeRender();
  resetFilterTabsToAll();

  const searchText = searchInput.value.toLowerCase().trim();
  const filteredTasks = todos.filter((task) =>
    task.value.toLowerCase().includes(searchText)
  );

  filteredTasks.map((task) => {
    const newTask = createTaskElement(task);
    taskList.appendChild(newTask);
  });
};

export const renderTodoList = () => {
  removeElementsBeforeRender();

  searchInput.value = "";
  resetFilterTabsToAll();

  todos.map((todo) => {
    const newTask = createTaskElement(todo);
    taskList.insertBefore(newTask, taskList.children[1]);
  });
};

const handleToggle = () => {
  taskInputCard.style.display =
    taskInputCard.style.display === "none" || taskInputCard.style.display === ""
      ? "block"
      : "none";
};

deleteTaskInputCard.addEventListener("click", resetTaskInput);
toggleButton.addEventListener("click", handleToggle);
addTaskButton.addEventListener("click", handleCreateTodo);
taskInputText.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    handleCreateTodo();
  }
});

taskInputText.addEventListener("input", validateInput);

searchButton.addEventListener("click", () => {
  navbar.classList.toggle("show-search-box");
});

searchInput.addEventListener("keyup", () => {
  const debouncedSearchData = debounce(handleSearch, 400);
  debouncedSearchData();
});

// filter.addEventListener("change", renderFilteredTodoList);

renderTodoList();
