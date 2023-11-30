import { isUserInputValid } from "./utilities.js";
import { handleDelete } from "./deteleTask.js";
import { handleCancel, handleEdit, handleUpdate } from "./editUpdateTask.js";
import { handleDone } from "./doneTask.js";

const doneIcon = "../images/done.svg";
const editIcon = "../images/edit.svg";
const deleteIcon = "../images/delete.svg";

const today = new Date();
const getCurrentDateTime = () => {
  const date = `${today.getFullYear()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
  return date;
};

const getDaysDifference = (date1Str, date2Str) => {
  const date1 = new Date(date1Str);
  const date2 = new Date(date2Str);

  if (!isNaN(date1.getTime()) && !isNaN(date2.getTime())) {
    const differenceInMilliseconds = date2 - date1;

    const numberOfDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

    return Math.floor(numberOfDays);
  } else {
    console.log("Invalid date format");
    return NaN;
  }
};

const prevDateStr = getCurrentDateTime();
const currentDateStr = getCurrentDateTime();
const daysDifference = getDaysDifference(prevDateStr, currentDateStr);

if (!isNaN(daysDifference)) {
  console.log(
    `The difference between the two dates is approximately ${daysDifference} days.`
  );
} else {
  console.log("Unable to calculate days difference.");
}

// const getCurrentDateTime = () => {
//   const date = `${today.getDate().toString().padStart(2, "0")}.${(
//     today.getMonth() + 1
//   )
//     .toString()
//     .padStart(2, "0")}.${today.getFullYear()}`;
//   console.log({ date });
//   return date;
// };

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

const createDoneButton = (taskId) => {
  const imgElement = document.createElement("img");
  imgElement.src = doneIcon;
  document.body.appendChild(imgElement);

  imgElement.addEventListener("click", () => {
    handleDone(taskId);
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

  return imgElement;
};

export const createTaskElement = (task) => {
  const li = document.createElement("div");
  li.classList.add("listItem");
  const doneButton = createDoneButton(task.id, task.isDone);
  doneButton.classList.add("buttonStyle");

  const deleteButton = createDeleteButton(task.id);
  const editButton = createEditButton(task.id);
  const buttonContainerElement = document.createElement("div");
  const buttonGroup = document.createElement("div");
  const spanElement = document.createElement("h2");
  spanElement.textContent = task.value;
  const timeElement = document.createElement("p");
  const createdDate = getCurrentDateTime();
  timeElement.textContent = `Created at ${createdDate}`;

  const inputField = createUpdateInput(task);
  const updateButton = createButton("Save");

  li.appendChild(spanElement);
  li.appendChild(timeElement);
  buttonGroup.classList.add("buttonGroup");
  buttonContainerElement.appendChild(buttonGroup);
  if (task.isEditing) {
    spanElement.classList.add("hide");
    timeElement.classList.add("hide");

    inputField.classList.add("editInput");

    updateButton.addEventListener("click", () =>
      handleUpdate(task.id, inputField.value)
    );
    deleteButton.addEventListener("click", () => handleCancel(task.id));

    li.appendChild(inputField);
    buttonGroup.appendChild(updateButton);

    if (isUserInputValid(task.error)) {
      appendErrorToTask(li, task.error);
    }

    doneButton.addEventListener("click", () => handleCancel(task.id));
    // return li;
  } else {
    deleteButton.addEventListener("click", () => handleDelete(task.id));
  }

  timeElement.classList.add("createdTime");
  editButton.classList.add("buttonStyle");
  buttonContainerElement.classList.add("buttonContainer");

  buttonGroup.appendChild(doneButton);
  if (!task.isEditing) {
    buttonGroup.appendChild(editButton);
  }
  buttonGroup.appendChild(deleteButton);
  if (task.isDone) {
    spanElement.classList.add("doneTask");
    editButton.classList.remove("show");
    editButton.classList.add("hide");
    doneButton.classList.add("hide");

    const complitionTime = document.createElement("div");
    complitionTime.classList.add("complitationBadge");
    complitionTime.textContent = "completed";
    buttonContainerElement.appendChild(complitionTime);
  } else {
    editButton.classList.add("show");
  }

  li.appendChild(buttonContainerElement);

  return li;
};

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
