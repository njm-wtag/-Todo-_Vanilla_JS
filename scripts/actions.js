import { renderTodoList } from "../index.js";
import { ALL, COMPLETE, START_INDEX, TASK_PER_PAGE } from "./const.js";
import { todos } from "./deteleTask.js";
import {
  initialTaskContainer,
  loadMoreButton,
  tabs,
  taskInputCard,
} from "./elements.js";
import { debounce } from "./utilities.js";

export let filterStatus;
export let currentPage = 1;
let totalPageCount;

export const disableFilterBar = () => {
  if (todos.length === 0) {
    tabs.forEach((tab) => {
      tab.setAttribute("disabled", "");
      tab.classList.remove("selected");
    });

    return;
  }

  tabs.forEach((tab) => tab.removeAttribute("disabled"));
};

export const renderLoadMoreButton = (todos) => {
  if (todos.length >= TASK_PER_PAGE && currentPage !== totalPageCount) {
    loadMoreButton.classList.remove("hide"),
      loadMoreButton.classList.add("show");

    return;
  }

  loadMoreButton.classList.remove("show"), loadMoreButton.classList.add("hide");

  return;
};

export const paginationFilter = (todos) => {
  totalPageCount = Math.ceil(todos.length / TASK_PER_PAGE);
  renderLoadMoreButton(todos);
  return todos.slice(START_INDEX, TASK_PER_PAGE * currentPage);
};

export const handleToggle = () => {
  taskInputCard.style.display =
    taskInputCard.style.display === "none" || taskInputCard.style.display === ""
      ? "block"
      : "none";

  if (todos.length !== 0) {
    initialTaskContainer.classList.toggle("show"),
      initialTaskContainer.classList.toggle("hide");
  }

  initialTaskContainer.classList.add("hide");
  initialTaskContainer.classList.remove("show");
};

export const handleLoadMoreTask = () => {
  if (todos && currentPage < totalPageCount) {
    currentPage++;
  }

  renderTodoList(todos);
};

export const todoStateFilter = (status = ALL, todos) => {
  if (status === ALL) {
    return todos;
  } else if (status === COMPLETE) {
    return todos.filter((todo) => todo.isDone === true);
  }

  return todos.filter((todo) => todo.isDone === false);
};

export const debouncedSearchData = debounce((searchText, todos) => {
  return searchFilter(searchText, todos);
}, 400);

export const searchFilter = (searchText, todos) => {
  if (searchText !== "") {
    return todos.filter((task) =>
      task.value.toLowerCase().includes(searchText)
    );
  }

  return todos;
};

export const filterTasksByStatus = (status) => {
  filterStatus = status;

  const tabs = document.querySelectorAll(".filter-tab");

  tabs.forEach((tab) => tab.classList.remove("selected"));

  document.getElementById(status).classList.add("selected");

  currentPage = 1;

  renderTodoList(todos);
};
