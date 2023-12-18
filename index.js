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
let filteredItems = [];
let searchResult;
let selectedValue;
let itemsToRender = [];

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
        // tab.classList.remove("selected");
        // if (tab.id === "all") {
        //   tab.classList.add("selected");
        // }
        console.log("111111111111111111");
      })
    : tabs.forEach((tab) => {
        tab.setAttribute("disabled", true);
        tab.classList.remove("selected");
      });
};

// const paginateTodos = () => {
//   chunckedTodos = todos.slice(startIndex, taskPerPage * currentPage);
//   totalPageCount = Math.ceil(todos.length / taskPerPage);
// };

// const handleLoadMoreTask = () => {
//   if (todos && currentPage < totalPageCount) currentPage++;

//   paginateTodos();
//   renderTodoList();
// };

// const renderLoadMoreButton = () => {
//   if (chunckedTodos.length >= taskPerPage && currentPage !== totalPageCount) {
//     return (
//       loadMoreButton.classList.remove("hide"),
//       loadMoreButton.classList.add("show")
//     );
//   }

//   return (
//     loadMoreButton.classList.remove("show"),
//     loadMoreButton.classList.add("hide")
//   );
// };

// export const handleTabClick = (event) => {
//   // console.log({ searchedItems });
//   selectedValue = event.target.id;
//   // console.log({ selectedValue });

//   switch (selectedValue) {
//     case COMPLETE:
//       filteredTodos = renderTasksByStatus(true);
//       break;
//     case INCOMPLETE:
//       filteredTodos = renderTasksByStatus(false);
//       break;
//     default:
//       filteredTodos = renderTasksByStatus("");
//   }
//   renderTodoList(filteredTodos);
//   const tabs = document.querySelectorAll(".filter-tab");

//   tabs.forEach((tab) => tab.classList.remove("selected"));

//   event.target.classList.add("selected");
// };
// tabs.forEach((tab) => tab.addEventListener("click", handleTabClick));

// export const handleTabClick = (event) => {
//   // console.log({ searchedItems });
//   selectedValue = event.target.id;
//   // console.log({ selectedValue });

//   switch (selectedValue) {
//     case COMPLETE:
//       filteredTodos = renderTasksByStatus(true);
//       break;
//     case INCOMPLETE:
//       filteredTodos = renderTasksByStatus(false);
//       break;
//     default:
//       filteredTodos = renderTasksByStatus("");
//   }
//   renderTodoList(filteredTodos);
//   const tabs = document.querySelectorAll(".filter-tab");

//   tabs.forEach((tab) => tab.classList.remove("selected"));

//   event.target.classList.add("selected");
// };

export const keepCard1Elements = () => {
  taskList.innerHTML = "";
  taskList.appendChild(taskInputCard);
};
initialTabState();
export const renderTodoList = (todos) => {
  !todos?.length
    ? (initialTaskContainer.classList.remove("hide"),
      initialTaskContainer.classList.add("show"),
      (taskInputCard.style.display = "none"))
    : (initialTaskContainer.classList.remove("show"),
      initialTaskContainer.classList.add("hide"));
  console.log(
    { searchResult },
    { filteredTodos },
    { todos },
    { selectedValue },
    { currentTasks }
  );
  keepCard1Elements();

  // taskList.innerHTML = "";
  todos?.map((todo) => {
    const newTask = createTaskElement(todo);
    taskList.append(newTask);
  });
};

const filterTasksByStatus = (status, todos) => {
  let filteredTasks = [];
  if (status === "") {
    filteredTasks = todos;
  } else if (status === "complete") {
    filteredTasks = todos?.filter((todo) => todo.isDone === status);
  } else if (status === "incomplete") {
    filteredTasks = todos?.filter((todo) => todo.isDone === status);
  }

  return filteredTasks;
};

const currentTasks = tabs.forEach((tab) =>
  tab.addEventListener("click", filterTasksByStatus(tab.id), todos)
);

renderTodoList(currentTasks);

// const renderTodos = (todos) => {};
// const handleTaskSearch = (tasks, input) => {
//   const searchedTasks = tasks.filter(())

//   renderTasksByStatus(sear)
// };

// const searchResults = handleTaskSearch(currentTasks, input);

const renderTasksByStatus = (isDone) => {
  // console.log({ searchResult });

  let a = searchResult ? searchResult : todos;

  if (isDone === "") return filteredTodos.length ? filteredTodos : todos;

  filteredTodos = a.filter((todo) => todo.isDone === isDone);
  console.log("from renderTasksByStatus", { filteredTodos });
  return filteredTodos;
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

const handleSearch = (task, searchText) => {
  const searchedTasks = task.filter((task) =>
    task.value.toLowerCase().includes(searchText)
  );

  console.log("-------", searchResult);

  renderTasksByStatus(searchedTasks);

  // return searchResult;
};

// if (!filteredTodos.length && selectedValue !== "complete") {
//   filteredTodos = renderTasksByStatus("");
// }
// export const renderTodoList = () => {
//   // console.log({ searchResult }, { filteredTodos });
//   initialTabState();
//   // console.log("rendeded");

//   // console.log({ filteredTodos });
//   keepCard1Elements();

//   !todos?.length
//     ? (initialTaskContainer.classList.remove("hide"),
//       initialTaskContainer.classList.add("show"),
//       (taskInputCard.style.display = "none"))
//     : (initialTaskContainer.classList.remove("show"),
//       initialTaskContainer.classList.add("hide"));

//   // searchInput.value = "";

//   paginateTodos();
//   renderLoadMoreButton();

//   // chunckedTodos.map((todo) => {
//   //   const newTask = createTaskElement(todo);
//   //   taskList.append(newTask);
//   // });

//   // itemsToRender =
//   //   searchTodos.length && selectedValue
//   //     ? filteredTodos
//   //     : searchTodos.length
//   //     ? searchTodos
//   //     : filteredTodos;
//   // itemsToRender =
//   //   searchTodos.length && selectedValue && selectedValue !== "all"
//   //     ? filteredTodos
//   //     : searchTodos.length
//   //     ? searchTodos
//   //     : todos;
//   // if (
//   //   !searchResult?.length &&
//   //   (selectedValue === "all" || selectedValue === undefined)
//   // ) {
//   //   console.log("1");
//   //   itemsToRender = todos;
//   // } else if (
//   //   searchResult?.length &&
//   //   (selectedValue === "all" || selectedValue === "")
//   // ) {
//   //   console.log("2");
//   //   itemsToRender = searchResult;
//   // } else if (
//   //   searchResult?.length &&
//   //   (selectedValue === "complete" || selectedValue === "incomplete")
//   // ) {
//   //   console.log("3");
//   //   // itemsToRender = searchResult;
//   //   itemsToRender = filteredTodos;
//   // } else if (
//   //   !searchResult?.length &&
//   //   (selectedValue === "complete" || selectedValue === "incomplete")
//   // ) {
//   //   console.log("4");
//   //   itemsToRender = filteredTodos;
//   // } else if (
//   //   searchResult?.length &&
//   //   (selectedValue !== "" || selectedValue !== undefined)
//   // ) {
//   //   console.log("5");
//   //   itemsToRender = filteredTodos;
//   // } else {
//   //   console.log("6");
//   //   itemsToRender = todos;
//   // }
//   console.log(
//     { searchResult },
//     { filteredTodos },
//     { todos },
//     { selectedValue }
//   );
//   filteredTodos?.map((todo) => {
//     const newTask = createTaskElement(todo);
//     taskList.append(newTask);
//   });
// };

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

taskInputText.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    handleCreateTodo(todos);
  }
});

taskInputText.addEventListener("input", validateInput);

searchButton.addEventListener("click", () => {
  navbar.classList.toggle("show-search-box");
});

const debouncedSearchData = debounce(
  () => handleSearch(currentTasks, searchText),
  400
);

searchInput.addEventListener("keyup", async (e) => {
  searchText = searchInput.value.toLowerCase().trim();
  // console.log({ searchText });
  if (searchText.length) {
    // console.log("searched");
    searchResult = await debouncedSearchData(searchText);

    // console.log(searchResult);
    return searchResult;
  } else if (e.key === "Backspace") {
    console.log("searching", e.key, e.metaKey, searchText.length == false);
    searchResult = await debouncedSearchData();

    // renderTodoList(searchResult);
  }
  // searchResult = todos;
});

// loadMoreButton.addEventListener("click", handleLoadMoreTask);
renderTodoList(todos);
