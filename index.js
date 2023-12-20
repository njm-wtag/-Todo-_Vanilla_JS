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

let searchText = "";
export let currentTasks = [];
let searchedTasks = [...todos];
let auxilaryTodos;
let filterStatus;

export let searchTodos = [];
export let filteredTodos = [];

let currentPage = 1;
const taskPerPage = 3;
let totalPageCount;
const startIndex = 0;

export const isFilterTabDisable = () => {
  todos?.length
    ? tabs.forEach((tab) => {
        tab.removeAttribute("disabled");
      })
    : tabs.forEach((tab) => {
        tab.setAttribute("disabled", true);
        tab.classList.remove("selected");
      });
};

const filteredByPaginate = (todos) => {
  totalPageCount = Math.ceil(todos.length / taskPerPage);
  renderLoadMoreButton(todos);
  return todos.slice(startIndex, taskPerPage * currentPage);
};

const handleLoadMoreTask = () => {
  if (todos && currentPage < totalPageCount) currentPage++;
  renderTodoList(todos);
};

export const renderLoadMoreButton = (todos) => {
  if (todos.length >= taskPerPage && currentPage !== totalPageCount) {
    return (
      loadMoreButton.classList.remove("hide"),
      loadMoreButton.classList.add("show")
    );
  }

  return (
    loadMoreButton.classList.remove("show"),
    loadMoreButton.classList.add("hide")
  );
};

const filteredByFilter = (status = "all", todos) => {
  if (status === "all") {
    return todos;
  } else if (status === "complete") {
    return todos?.filter((todo) => todo.isDone === true);
  } else if (status === "incomplete") {
    return todos?.filter((todo) => todo.isDone === false);
  }
};

const filteredBySearch = (searchText, todos) => {
  return todos?.filter((task) => task.value.toLowerCase().includes(searchText));
};

todos.length === 0 && isFilterTabDisable();

export const renderTodoList = (todos) => {
  auxilaryTodos = [...filteredBySearch(searchText, todos || [])];
  auxilaryTodos = [...filteredByFilter(filterStatus, auxilaryTodos)];
  auxilaryTodos = [...filteredByPaginate(auxilaryTodos)];
  taskList.innerHTML = "";
  taskList.appendChild(taskInputCard);

  auxilaryTodos?.map((todo) => {
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

const debounce = (handleSearch, delay) => {
  let timer;
  return function () {
    clearTimeout(timer);
    return new Promise((resolve) => {
      timer = setTimeout(() => {
        const result = handleSearch.apply(this, arguments);

        console.log(this, arguments);
        resolve(result);
      }, delay);
    });
  };
};

const handleSearch = (searchText) => {
  console.log({ searchText });
  searchedTasks = currentTasks?.filter((task) =>
    task.value.toLowerCase().includes(searchText)
  );
  console.log({ filterStatus }, { searchedTasks });
  filterTasksByStatus(filterStatus, searchedTasks);

  return searchedTasks;
};

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

const debouncedSearchData = debounce(() => {
  console.log({ searchText });
  return handleSearch(searchText);
}, 400);

searchInput.addEventListener("keyup", async (e) => {
  searchText = searchInput.value.toLowerCase().trim();
  // console.log({ searchText });
  // if (searchText.length) {
  //   console.log({ currentTasks });
  //   searchResult = await debouncedSearchData(searchText);

  //   console.log(searchResult);
  //   return searchResult;
  // } else if (e.key === "Backspace") {
  //   console.log("searching", e.key, e.metaKey, searchText.length == false);
  //   searchResult = await debouncedSearchData();

  //   // renderTodoList(searchResult);
  // }
  // searchResult = todos;
  renderTodoList(todos);
});

loadMoreButton.addEventListener("click", handleLoadMoreTask);
renderTodoList(todos);
