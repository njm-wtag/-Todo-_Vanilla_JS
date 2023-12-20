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
  initialTaskContainer,
  tabs,
  loadMoreButton,
} from "./scripts/elements.js";
import { handleCreateTodo, resetTaskInput } from "./scripts/addTask.js";
import { todos } from "./scripts/deteleTask.js";
import { createTaskElement } from "./scripts/taskActions.js";
import { validateInput } from "./scripts/utilities.js";
import { TASK_PER_PAGE, START_INDEX, ALL, COMPLETE } from "./const.js";

let searchText = "";
let filterStatus;
let searchResult;
let currentPage = 1;
let totalPageCount;

export const isFilterBarDisabled = () => {
  if (todos.length === 0) {
    tabs.forEach((tab) => tab.removeAttribute("disabled"));
    return;
  }

  tabs.forEach((tab) => {
    tab.setAttribute("disabled", "");
    tab.classList.remove("selected");
  });
};

const paginationFilter = (todos) => {
  totalPageCount = Math.ceil(todos.length / TASK_PER_PAGE);
  renderLoadMoreButton(todos);
  return todos.slice(START_INDEX, TASK_PER_PAGE * currentPage);
};

const handleLoadMoreTask = () => {
  if (todos && currentPage < totalPageCount) {
    currentPage++;
  }

  renderTodoList(todos);
};

export const renderLoadMoreButton = (todos) => {
  if (todos.length >= taskPerPage && currentPage !== totalPageCount) {
    loadMoreButton.classList.remove("hide"),
      loadMoreButton.classList.add("show");

    return;
  }

  loadMoreButton.classList.remove("show"), loadMoreButton.classList.add("hide");

  return;
};

const todoStateFilter = (status = ALL, todos) => {
  if (status === ALL) {
    return todos;
  } else if (status === COMPLETE) {
    return todos.filter((todo) => todo.isDone === true);
  }

  return todos.filter((todo) => todo.isDone === false);
};

const searchFilter = (searchText, todos) => {
  return todos.filter((task) => task.value.toLowerCase().includes(searchText));
};

const debounce = (searchFilter, delay) => {
  let timer;
  return function () {
    clearTimeout(timer);
    return new Promise((resolve) => {
      timer = setTimeout(() => {
        const result = searchFilter.apply(this, arguments);
        resolve(result);
      }, delay);
    });
  };
};

if (todos.length === 0) {
  disableFilterBar();
}

export const renderTodoList = (todos) => {
  let auxilaryTodos = [];
  auxilaryTodos = [...searchFilter(searchText, todos || [])];
  auxilaryTodos = [...todoStateFilter(filterStatus, auxilaryTodos)];
  auxilaryTodos = [...paginationFilter(auxilaryTodos)];
  taskList.innerHTML = "";
  taskList.appendChild(taskInputCard);

  auxilaryTodos.map((todo) => {
    const newTask = createTaskElement(todo);
    taskList.append(newTask);
  });
};

export const filterTasksByStatus = (status) => {
  filterStatus = status;

  const tabs = document.querySelectorAll(".filter-tab");

  tabs.forEach((tab) => tab.classList.remove("selected"));

  document.getElementById(status).classList.add("selected");

  currentPage = 1;

  renderTodoList(todos);
};

tabs.forEach((tab) => {
  tab.addEventListener("click", () => filterTasksByStatus(tab.id, todos));
});

const handleToggle = () => {
  taskInputCard.style.display =
    taskInputCard.style.display === "none" || taskInputCard.style.display === ""
      ? "block"
      : "none";
  !todos.length
    ? (initialTaskContainer.classList.toggle("show"),
      initialTaskContainer.classList.toggle("hide"))
    : initialTaskContainer.classList.add("hide");
  initialTaskContainer.classList.remove("show");
};

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

const debouncedSearchData = debounce((searchText, todos) => {
  return searchFilter(searchText, todos);
}, 400);

searchInput.addEventListener("keyup", async (e) => {
  searchText = searchInput.value.toLowerCase().trim();

  searchResult = await debouncedSearchData(searchText, todos);

  renderTodoList(searchResult);
});

loadMoreButton.addEventListener("click", handleLoadMoreTask);
renderTodoList(todos);
