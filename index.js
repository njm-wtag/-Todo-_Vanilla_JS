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
} from "./scripts/elements.js";
import { handleCreateTodo, resetTaskInput } from "./scripts/addTask.js";
import { todos } from "./scripts/deteleTask.js";
import { createTaskElement } from "./scripts/taskActions.js";
import { validateInput } from "./scripts/utilities.js";
import { COMPLETE, INCOMPLETE } from "./const.js";

export let filteredTasks = [];
export let filteredTodos = [];

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

const renderTasksByStatus = (isDone) => {
  keepCard1Elements();
  filteredTodos = filteredTasks.length
    ? filteredTasks.filter((todo) => todo.isDone === isDone)
    : todos.filter((todo) => todo.isDone === isDone);

  filteredTodos.map((todo) => {
    const newTask = createTaskElement(todo);
    taskList.insertBefore(newTask, taskList.children[1]);
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
  keepCard1Elements();

  const searchText = searchInput.value.toLowerCase().trim();

  filteredTasks = filteredTodos?.length
    ? filteredTodos.filter((task) =>
        task.value.toLowerCase().includes(searchText)
      )
    : todos.filter((task) => task.value.toLowerCase().includes(searchText));

  filteredTasks.map((task) => {
    const newTask = createTaskElement(task);
    taskList.insertBefore(newTask, taskList.children[1]);
  });
};

export const renderTodoList = () => {
  !todos.length
    ? (initialTaskContainer.classList.remove("hide"),
      initialTaskContainer.classList.add("show"),
      (taskInputCard.style.display = "none"))
    : (initialTaskContainer.classList.remove("show"),
      initialTaskContainer.classList.add("hide"));

  keepCard1Elements();
  filteredTasks = [];
  searchInput.value = "";

  todos.length
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
  initialTaskContainer.classList.toggle("show");
  initialTaskContainer.classList.toggle("hide");
};

deleteTaskInputCard.addEventListener("click", resetTaskInput);

toggleButton.addEventListener("click", () => handleToggle(todos));

initialTaskContainer.addEventListener("click", () => handleToggle(todos));

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

renderTodoList();
