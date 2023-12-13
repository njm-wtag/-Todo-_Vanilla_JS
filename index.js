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
import { COMPLETE, INCOMPLETE } from "./const.js";

let searchText;
let searchedItems;
let filteredItems;
let searchResult;
let selectedValue;

export let searchTodos = [];
export let filteredTodos = [];

let currentPage = 1;
const taskPerPage = 3;
let totalPageCount;
const startIndex = 0;
let chunckedTodos = [];

const initialTabState = () => {
  todos?.length
    ? tabs.forEach((tab) => {
        // tab.addEventListener("click", handleTabClick);
        tab.removeAttribute("disabled");
        tab.classList.remove("selected");
        if (tab.id === "all") {
          tab.classList.add("selected");
        }
      })
    : tabs.forEach((tab) => {
        tab.setAttribute("disabled", true);
        tab.classList.remove("selected");
      });
};

const paginateTodos = () => {
  chunckedTodos = todos.slice(startIndex, taskPerPage * currentPage);
  totalPageCount = Math.ceil(todos.length / taskPerPage);
};

const handleLoadMoreTask = () => {
  if (todos && currentPage < totalPageCount) currentPage++;

  paginateTodos();
  renderTodoList();
};

const renderLoadMoreButton = () => {
  if (chunckedTodos.length >= taskPerPage && currentPage !== totalPageCount) {
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

// export const handleTabClick = (event) => {
//   const selectedValue = event.target.id;
//   switch (selectedValue) {
//     case COMPLETE:
//       renderTasksByStatus(true);
//       break;
//     case INCOMPLETE:
//       renderTasksByStatus(false);
//       break;
//     default:
//       renderTasksByStatus(false);
//   }

//   const tabs = document.querySelectorAll(".filter-tab");

//   tabs.forEach((tab) => tab.classList.remove("selected"));

//   event.target.classList.add("selected");
// };

export const handleTabClick = (event) => {
  // console.log({ searchedItems });
  console.log(event.target.classList);
  console.log("iiii");
  selectedValue = event.target.id;
  // console.log({ selectedValue });

  switch (selectedValue) {
    case COMPLETE:
      filteredItems = renderTasksByStatus(true);
      break;
    case INCOMPLETE:
      filteredItems = renderTasksByStatus(false);
      break;
    default:
      filteredItems = renderTasksByStatus("");
  }

  const tabs = document.querySelectorAll(".filter-tab");

  tabs.forEach((tab) => tab.classList.remove("selected"));

  event.target.classList.add("selected");
  renderTodoList();
};
tabs.forEach((tab) => tab.addEventListener("click", handleTabClick));
// window.addEventListener(
//   "load",
//   () => ()
// );
const renderTasksByStatus = (isDone) => {
  // console.log("is done", isDone);
  let a = searchResult ? searchResult : todos;

  if (isDone === "") return todos;

  filteredTodos = a.filter((todo) => todo.isDone === isDone);
  // console.log({ filteredTodos });
  return filteredTodos;
};

export const keepCard1Elements = () => {
  taskList.innerHTML = "";
  taskList.appendChild(taskInputCard);
};

const debounce = (handleSearch, delay) => {
  let timer;
  return function () {
    clearTimeout(timer);
    return new Promise((resolve) => {
      timer = setTimeout(() => {
        const result = handleSearch.apply(this, arguments);
        resolve(result);
      }, delay);
    });
  };
};

const handleSearch = (searchText) => {
  searchTodos = todos.filter((task) =>
    task.value.toLowerCase().includes(searchText)
  );
  return searchTodos;
};

export const renderTodoList = () => {
  // filteredItems = renderTasksByStatus("");
  // initialTabState();
  console.log(filteredItems, todos);
  keepCard1Elements();
  // console.log({ searchResult });
  // let a = searchResult ? searchResult : todos;
  // console.log("a from render", a);

  !todos?.length
    ? (initialTaskContainer.classList.remove("hide"),
      initialTaskContainer.classList.add("show"),
      (taskInputCard.style.display = "none"))
    : (initialTaskContainer.classList.remove("show"),
      initialTaskContainer.classList.add("hide"));

  searchInput.value = "";

  paginateTodos();
  renderLoadMoreButton();

  chunckedTodos.map((todo) => {
    const newTask = createTaskElement(todo);
    taskList.append(newTask);
  });
};

const handleToggle = () => {
  taskInputCard.style.display =
    taskInputCard.style.display === "none" || taskInputCard.style.display === ""
      ? "block"
      : "none";
  initialTaskContainer.classList.toggle("show");
  initialTaskContainer.classList.toggle("hide");
};

deleteTaskInputCard.addEventListener("click", resetTaskInput);

toggleButton.addEventListener("click", handleToggle);

initialTaskContainer.addEventListener("click", handleToggle);

addTaskButton.addEventListener("click", () => handleCreateTodo(todos));

taskInputText.addEventListener("input", validateInput);

searchButton.addEventListener("click", () => {
  navbar.classList.toggle("show-search-box");
});

const debouncedSearchData = debounce(() => handleSearch(searchText), 400);

searchInput.addEventListener("keyup", async () => {
  searchText = searchInput.value.toLowerCase().trim();
  if (searchText.length) {
    searchResult = await debouncedSearchData(searchText);
    console.log(searchResult);
  }
});

loadMoreButton.addEventListener("click", handleLoadMoreTask);
renderTodoList(todos);
