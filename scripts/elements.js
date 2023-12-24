import { renderTodoList } from "../index.js";
import {
  debouncedSearchData,
  filterTasksByStatus,
  handleLoadMoreTask,
  handleToggle,
} from "./actions.js";
import { handleCreateTodo, resetTaskInput } from "./addTask.js";
import { ALL, COMPLETE } from "./const.js";
import { todos } from "./deteleTask.js";
import { validateInput } from "./utilities.js";

export const toggleButton = document.getElementById("createToggleButton");
export const taskInputCard = document.getElementById("card1");
export const deleteTaskInputCard = document.getElementById(
  "deleteTaskInputCard"
);
export const addTaskButton = document.getElementById("addTask");
export const taskInputText = document.getElementById("taskInput");
export const taskList = document.getElementById("taskList");
export const errorMessage = document.getElementById("errorMessage");
export const searchInput = document.getElementById("searchInput");
export const searchButton = document.getElementById("searchIcon");
export const navbar = document.querySelector(".todo-app__header");
export const initialTaskContainer = document.querySelector(
  ".task-container__initial-state"
);
export const loadMoreButton = document.getElementById("load-more");
export const tabs = document.querySelectorAll(".filter-tab");

export let searchText = "";

deleteTaskInputCard.addEventListener("click", resetTaskInput);

toggleButton.addEventListener("click", handleToggle);

initialTaskContainer.addEventListener("click", handleToggle);

addTaskButton.addEventListener("click", () => handleCreateTodo(todos));

taskInputText.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    handleCreateTodo(todos);
  }
});

taskInputText.addEventListener("input", validateInput);

searchButton.addEventListener("click", () => {
  navbar.classList.toggle("show-search-box");
});

searchInput.addEventListener("keyup", async () => {
  searchText = searchInput.value.toLowerCase().trim();
  let searchResult = await debouncedSearchData(searchText, todos);
  renderTodoList(searchResult);
});

loadMoreButton.addEventListener("click", handleLoadMoreTask);

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const tabId = tab.id;
    if (tabId === ALL) {
      filterTasksByStatus(tabId);
    } else if (tabId === COMPLETE) {
      filterTasksByStatus(tabId);
    } else filterTasksByStatus(tabId);
  });
});
