import { isUserInputValid } from "./utilities.js";
import { handleDelete } from "./deteleTask.js";
import { handleCancel, handleEdit, handleUpdate } from "./editUpdateTask.js";
import { handleDone } from "./doneTask.js";

const createUpdateInput = (todoToEdit) => {
  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.value = todoToEdit.value;
  return inputField;
};

const createButton = (content) => {
  const button = document.createElement("button");
  button.textContent = content;

  return button;
};

const createDoneCheckbox = (taskId, isDone) => {
  const doneCheckbox = document.createElement("input");
  doneCheckbox.type = "checkbox";
  doneCheckbox.checked = isDone;

  doneCheckbox.addEventListener("change", () => {
    handleDone(taskId, doneCheckbox.checked);
  });

  return doneCheckbox;
};

const createEditButton = (taskId) => {
  const editButton = createButton("Edit");

  editButton.addEventListener("click", () => {
    handleEdit(taskId);
  });

  return editButton;
};

const createDeleteButton = (taskId) => {
  const deleteButton = createButton("Delete");

  deleteButton.addEventListener("click", () => handleDelete(taskId));

  return deleteButton;
};

export const createTaskElement = (task) => {
  const li = document.createElement("li");
  li.classList.add("listItem");
  const doneCheckbox = createDoneCheckbox(task.id, task.isDone);

  li.appendChild(doneCheckbox);
  const spanElement = document.createElement("span");
  spanElement.textContent = task.value;
  li.appendChild(spanElement);

  if (task.isEditing) {
    spanElement.classList.add("hide");
    createEditableTaskElements(li, task);
    return li;
  }

  const deleteButton = createDeleteButton(task.id);
  const editButton = createEditButton(task.id);

  deleteButton.classList.add("deleteButtonStyle");
  editButton.classList.add("editButtonStyle");

  if (doneCheckbox.checked) {
    spanElement.style.textDecoration = "line-through";
    editButton.classList.remove("show");
    editButton.classList.add("hide");
  } else {
    editButton.classList.add("show");
  }
  li.appendChild(editButton);
  li.appendChild(deleteButton);
  return li;
};

const createEditableTaskElements = (li, task) => {
  const inputField = createUpdateInput(task);
  const updateButton = createButton("Update");
  const cancelButton = createButton("Cancel");

  updateButton.addEventListener("click", () =>
    handleUpdate(task.id, inputField.value)
  );
  cancelButton.addEventListener("click", () => handleCancel(task.id));

  li.appendChild(inputField);
  li.appendChild(updateButton);
  li.appendChild(cancelButton);

  updateButton.classList.add("doneButtonStyle");
  cancelButton.classList.add("deleteButtonStyle");

  if (isUserInputValid(task.error)) {
    appendErrorToTask(li, task.error);
  }
};

export const appendErrorToTask = (li, error) => {
  const updateError = document.createElement("p");
  updateError.classList.add("errorText");
  updateError.textContent = error;
  li.appendChild(updateError);
};
