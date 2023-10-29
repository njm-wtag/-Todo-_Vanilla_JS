import { isUserInputValid } from "./utilities.js";
import { handleDelete } from "./deteleTask.js";
import { handleEdit, handleUpdate } from "./editUpdateTask.js";
import { renderTodoList } from "../index.js";

const createUpdateInput = (todoToEdit) => {
  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.value = todoToEdit.value;
  return inputField;
};

const createButton = (content) => {
  const newBtn = document.createElement("button");
  newBtn.textContent = content;
  newBtn.style.margin = "10px";

  return newBtn;
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

  if (task.edit) {
    createEditableTaskElements(li, task);
    return li;
  }

  createNonEditableTaskElements(li, task);
  return li;
};

const createEditableTaskElements = (li, task) => {
  const inputField = createUpdateInput(task);
  const updateButton = createButton("Update");
  const cancelButton = createButton("Cancel");

  updateButton.addEventListener("click", () =>
    handleUpdate(task.id, inputField.value)
  );
  cancelButton.addEventListener("click", renderTodoList);

  li.appendChild(inputField);
  li.appendChild(updateButton);
  li.appendChild(cancelButton);

  if (isUserInputValid(task.error)) {
    appendErrorToTask(li, task.error);
  }
};

const createNonEditableTaskElements = (li, task) => {
  li.innerHTML = task.value;

  const deleteButton = createDeleteButton(task.id);
  const editButton = createEditButton(task.id);

  deleteButton.addEventListener("click", () => handleDelete(task.id));
  editButton.addEventListener("click", () => handleEdit(task.id));

  li.appendChild(deleteButton);
  li.appendChild(editButton);
};

export const appendErrorToTask = (li, error) => {
  const updateError = document.createElement("p");
  updateError.style.color = "red";
  updateError.textContent = error;
  li.appendChild(updateError);
};
