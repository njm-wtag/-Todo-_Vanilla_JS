import {
  addTaskButton,
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

searchButton.addEventListener("click", handleSearch);
searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});

renderTodoList();
