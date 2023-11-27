import { isUserInputValid } from "./utilities.js";
import { handleDelete } from "./deteleTask.js";
import { handleCancel, handleEdit, handleUpdate } from "./editUpdateTask.js";
import { handleDone } from "./doneTask.js";

const doneIcon = "../images/done.svg";
const editIcon = "../images/edit.svg";
const deleteIcon = "../images/delete.svg";

const getCurrentDateTime = () => {
  const today = new Date();
  const date = `${today.getDate().toString().padStart(2, "0")}.${(
    today.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}.${today.getFullYear()}`;

  return `Created At ${date}`;
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

// const createDoneCheckbox = (taskId, isDone) => {
//   const doneCheckbox = document.createElement("input");
//   doneCheckbox.type = "checkbox";
//   doneCheckbox.checked = isDone;

//   doneCheckbox.addEventListener("change", () => {
//     handleDone(taskId, doneCheckbox.checked);
//   });

//   return doneCheckbox;
// };

const createDoneCheckbox = (taskId, isDone) => {
  const spanElement = document.createElement("span");
  const imgElement = document.createElement("img");
  imgElement.src = doneIcon;

  document.body.appendChild(imgElement);
  spanElement.appendChild(imgElement);
  imgElement.innerText = isDone;

  spanElement.addEventListener("click", () => {
    handleDone(taskId, imgElement.innerText);
  });

  return imgElement;
};

const createEditButton = (taskId) => {
  const imgElement = document.createElement("img");
  imgElement.src = editIcon;
  document.body.appendChild(imgElement);
  imgElement.addEventListener("click", () => {
    handleEdit(taskId);
  });

  return imgElement;
};

const createDeleteButton = (taskId) => {
  const imgElement = document.createElement("img");
  imgElement.src = deleteIcon;
  document.body.appendChild(imgElement);
  imgElement.addEventListener("click", () => handleDelete(taskId));

  return imgElement;
};

export const createTaskElement = (task) => {
  // const li = document.createElement("div");
  const gridContainer = document.querySelector(".taskContainer");
  const li = document.createElement("div");
  gridContainer.appendChild(li);
  li.classList.add("listItem");
  const doneCheckbox = createDoneCheckbox(task.id, task.isDone);
  const deleteButton = createDeleteButton(task.id);
  const editButton = createEditButton(task.id);
  const buttonContainerElement = document.createElement("div");
  const spanElement = document.createElement("h2");
  spanElement.textContent = task.value;
  const timeElement = document.createElement("p");

  timeElement.textContent = getCurrentDateTime();
  li.appendChild(spanElement);
  li.appendChild(timeElement);

  timeElement.classList.add("createdTime");
  deleteButton.classList.add("buttonStyle");
  editButton.classList.add("buttonStyle");

  if (task.isEditing) {
    spanElement.classList.add("hide");
    timeElement.classList.add("hide");
    // createEditableTaskElements(li, task);
    const inputField = createUpdateInput(task);
    const updateButton = createButton("Save");
    // const cancelButton = createButton("Cancel");
    inputField.classList.add("editInput");
    updateButton.addEventListener("click", () =>
      handleUpdate(task.id, inputField.value)
    );
    // cancelButton.addEventListener("click", () => handleCancel(task.id));

    li.appendChild(inputField);
    buttonContainerElement.appendChild(updateButton);
    // li.appendChild(cancelButton);

    // updateButton.classList.add("doneButtonStyle");
    // cancelButton.classList.add("deleteButtonStyle");

    if (isUserInputValid(task.error)) {
      appendErrorToTask(li, task.error);
    }
    //
    // return li;
  }

  buttonContainerElement.classList.add("buttonContainer");

  buttonContainerElement.appendChild(doneCheckbox);
  if (!task.isEditing) {
    buttonContainerElement.appendChild(editButton);
  }

  buttonContainerElement.appendChild(deleteButton);
  li.appendChild(buttonContainerElement);
  if (doneCheckbox.checked) {
    spanElement.style.textDecoration = "line-through";
    editButton.classList.remove("show");
    editButton.classList.add("hide");
  } else {
    editButton.classList.add("show");
  }

  return li;
};

// const createEditableTaskElements = (li, task) => {

// };

export const appendErrorToTask = (li, error) => {
  const updateError = document.createElement("p");
  updateError.classList.add("errorText");
  updateError.textContent = error;
  li.appendChild(updateError);
};

export const createFilterDropdown = () => {
  const filterContainer = document.querySelector(".filter-container");
  const filter = document.createElement("select");
  filter.id = "filter";

  const options = ["All", "Complete", "Incomplete"];

  options.map((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option.toLowerCase();
    optionElement.textContent = option;
    filter.appendChild(optionElement);
  });

  filterContainer.appendChild(filter);
};

createFilterDropdown();
