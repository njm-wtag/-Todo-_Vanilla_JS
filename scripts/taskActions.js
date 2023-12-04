import { removeElementsBeforeRender, renderTodoList } from "../index.js";
import { handleDelete, todos } from "./deteleTask.js";
import { handleDone } from "./doneTask.js";
import { handleCancel, handleEdit, handleUpdate } from "./editUpdateTask.js";
import { isUserInputValid } from "./utilities.js";

const doneIconUrl = "../images/done.svg";
const editIconUrl = "../images/edit.svg";
const deleteIconUrl = "../images/delete.svg";

const calculateDateDifference = (timestamp) => {
  const currentDate = new Date();
  const creationDate = new Date(timestamp);
  const timeDifference = currentDate - creationDate;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
};

const timestampToDateFormat = (timestamp) => {
  let date = new Date(timestamp);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  return {
    formattedDate: day + "." + month + "." + year,
    forTimeDiff: month + "." + day + "." + year,
  };
};

const createUpdateInput = (todoToEdit) => {
  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.value = todoToEdit.value;

  return inputField;
};

const createButton = (content) => {
  const button = document.createElement("button");
  button.innerHTML = content;

  return button;
};

const createTaskActionButton = (iconUrl, clickHandler) => {
  const icon = document.createElement("img");
  icon.src = iconUrl;
  document.body.appendChild(icon);
  icon.addEventListener("click", clickHandler);

  return icon;
};

export const createTaskElement = (task) => {
  const taskItem = document.createElement("div");
  taskItem.classList.add("task-container__task-item");
  const doneButton = createTaskActionButton(doneIconUrl, () =>
    handleDone(task.id)
  );
  doneButton.classList.add("task-item__button");

  const deleteButton = createTaskActionButton(deleteIconUrl, () =>
    handleDelete(task.id)
  );
  deleteButton.classList.add("task-item__button");

  const editButton = createTaskActionButton(editIconUrl, () =>
    handleEdit(task.id)
  );
  const buttonContainerElement = document.createElement("div");
  const buttonGroup = document.createElement("div");
  const spanElement = document.createElement("p");
  spanElement.textContent = task.value;
  const timeElement = document.createElement("span");
  const createdDate = timestampToDateFormat(task.createdAt).formattedDate;
  const taskComplitionDay = calculateDateDifference(
    timestampToDateFormat(task.createdAt).forTimeDiff
  );
  timeElement.textContent = `Created at ${createdDate}`;

  const inputField = createUpdateInput(task);
  const updateButton = createButton("Save");

  taskItem.appendChild(spanElement);
  taskItem.appendChild(timeElement);
  buttonGroup.classList.add("buttonGroup");
  buttonContainerElement.appendChild(buttonGroup);

  if (task.isEditing) {
    spanElement.classList.add("hide");
    timeElement.classList.add("hide");

    inputField.classList.add("task-item__edit-input");

    updateButton.addEventListener("click", () =>
      handleUpdate(task.id, inputField.value)
    );
    deleteButton.addEventListener("click", () => handleCancel(task.id));

    taskItem.appendChild(inputField);
    buttonGroup.appendChild(updateButton);
    editButton.classList.add("hide");

    if (isUserInputValid(task.error)) {
      appendErrorToTask(taskItem, task.error);
    }

    doneButton.addEventListener("click", () => handleCancel(task.id));
  } else {
    deleteButton.addEventListener("click", () => handleDelete(task.id));
  }

  timeElement.classList.add("task-item__created-time");
  editButton.classList.add("task-item__button");
  updateButton.classList.add("task-item__button");
  buttonContainerElement.classList.add("task-item__button-container");

  buttonGroup.appendChild(doneButton);

  if (!task.isEditing) {
    buttonGroup.appendChild(editButton);
  }

  buttonGroup.appendChild(deleteButton);

  if (task.isDone) {
    spanElement.classList.add("task-item__done");
    editButton.classList.add("hide");
    doneButton.classList.add("hide");

    const completionBadge = document.createElement("div");
    completionBadge.classList.add("task-item__completion-badge");

    timeElement.textContent =
      taskComplitionDay > 0
        ? `Completed in ${taskComplitionDay} days`
        : `Completed in 1 day`;
    completionBadge.textContent =
      taskComplitionDay > 0
        ? `Completed in ${taskComplitionDay} days`
        : `Completed in 1 day`;
    buttonContainerElement.appendChild(completionBadge);
  }

  taskItem.appendChild(buttonContainerElement);

  return taskItem;
};

export const appendErrorToTask = (li, error) => {
  const updateError = document.createElement("p");
  updateError.classList.add("errorText");
  updateError.textContent = error;
  li.appendChild(updateError);
};

export const resetFilterTabsToAll = () => {
  const tabs = document.querySelectorAll(".filter-tab");

  tabs.forEach((tab) => {
    tab.classList.remove("selected");
    if (tab.getAttribute("data-value") === "all") {
      tab.classList.add("selected");
    }
  });
};

export const createFilterTabs = () => {
  const filterContainer = document.querySelector(".task-container__filter");

  const options = ["All", "Complete", "Incomplete"];

  options.map((option) => {
    const tab = document.createElement("div");
    tab.classList.add("filter-tab");
    tab.textContent = option;
    tab.setAttribute("data-value", option.toLowerCase());

    tab.addEventListener("click", handleTabClick);

    if (option === "All") {
      tab.classList.add("selected");
    }

    filterContainer.appendChild(tab);
  });
};

export const handleTabClick = (event) => {
  const selectedValue = event.target.getAttribute("data-value");

  switch (selectedValue) {
    case "complete":
      renderTasksByStatus(true);
      break;
    case "incomplete":
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
  removeElementsBeforeRender();

  const filteredTodos = todos.filter((todo) => todo.isDone === isDone);

  filteredTodos.map((todo) => {
    const newTask = createTaskElement(todo);
    taskList.appendChild(newTask);
  });
};

createFilterTabs();
