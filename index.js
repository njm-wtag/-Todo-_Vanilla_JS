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

export let searchTodos = [];
export let filteredTodos = [];

let currentPage = 1;
const taskPerPage = 3;
let totalPageCount;
const startIndex = 0;
let chunckedTodos = [];
const searchText = searchInput.value.toLowerCase().trim();
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

export const handleTabClick = (event) => {
  const selectedValue = event.target.id;
  switch (selectedValue) {
    case COMPLETE:
      renderTasksByStatus(true);
      break;
    case INCOMPLETE:
      renderTasksByStatus(false);
      break;
    default:
      renderTodoList();
  }

  const tabs = document.querySelectorAll(".filter-tab");

  tabs.forEach((tab) => tab.classList.remove("selected"));

  event.target.classList.add("selected");
};

// export const handleTabClick = (event, searchedItems) => {
//   console.log({ searchedItems });
//   const selectedValue = event.target.id;
//   // console.log({ selectedValue });

//   switch (selectedValue) {
//     case COMPLETE:
//       filteredItems = renderTasksByStatus(searchedItems, true);
//       break;
//     case INCOMPLETE:
//       filteredItems = renderTasksByStatus(searchedItems, false);
//       break;
//     default:
//       filteredItems = searchedItems;
//   }

//   const tabs = document.querySelectorAll(".filter-tab");

//   tabs.forEach((tab) => tab.classList.remove("selected"));

//   // event.target.classList.add("selected");
// };

const renderTasksByStatus = (isDone) => {
  // filteredTodos = todos.filter((todo) => todo.isDone === isDone);
  // return filteredTodos;
  filteredTodos = searchTodos.length
    ? searchTodos.filter((todo) => todo.isDone === isDone)
    : chunckedTodos.filter((todo) => todo.isDone === isDone);

  filteredTodos.map((todo) => {
    const newTask = createTaskElement(todo);

    taskList.append(newTask);
  });
};

export const keepCard1Elements = () => {
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
  const searchText = searchInput.value.toLowerCase().trim();
  // searchTodos = todos.filter((task) =>
  //   task.value.toLowerCase().includes(searchText)
  // );
  // return searchTodos;

  searchTodos = filteredTodos?.length ? filteredTodos : todos;

  searchTodos.filter((task) => task.value.toLowerCase().includes(searchText));

  searchTodos.map((task) => {
    const newTask = createTaskElement(task);

    taskList.append(newTask);
  });
};
let searchedItems;
let filteredItems;
export const renderTodoList = () => {
  keepCard1Elements();

  // searchedItems = handleSearch();
  // // const defaultEvent = { target: { id: "all" } };
  // filteredItems = handleTabClick();
  // console.log({ filteredItems });
  !todos.length
    ? (initialTaskContainer.classList.remove("hide"),
      initialTaskContainer.classList.add("show"),
      (taskInputCard.style.display = "none"))
    : (initialTaskContainer.classList.remove("show"),
      initialTaskContainer.classList.add("hide"));

  searchInput.value = "";

  chunckedTodos.length
    ? tabs.forEach((tab) => {
        tab.addEventListener("click", handleTabClick);
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

searchInput.addEventListener("keyup", () => {
  const debouncedSearchData = debounce(handleSearch, 400);
  debouncedSearchData();
});

loadMoreButton.addEventListener("click", handleLoadMoreTask);
renderTodoList(todos);
