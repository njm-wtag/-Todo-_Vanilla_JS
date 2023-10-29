const addTaskBtn = document.getElementById("addTask");
const taskInputText = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const errorMessage = document.getElementById("errorMessage");

let todos = [];

function generateUniqueId() {
  return Date.now();
}
const resetTaskInput = () => {
  taskInputText.value = "";
};
const isUserInputValid = (textContent) => {
  return textContent.trim() !== "";
};

const validateInput = () => {
  if (isUserInputValid(taskInputText.value)) {
    errorMessage.innerHTML = "";

    return true;
  }

  errorMessage.innerHTML = "Please add a task";

  return false;
};

const handleDelete = (taskId) => {
  todos = todos.filter((todo) => todo.id !== taskId);
  renderTodoList();
};

const handleUpdate = (taskId, updatedValue) => {
  const taskToUpdate = todos.find((todo) => todo.id === taskId);

  if (isUserInputValid(updatedValue)) {
    taskToUpdate.value = updatedValue;
    taskToUpdate.edit = false;
  } else {
    taskToUpdate.error = "Updated task can not be empty";
    taskToUpdate.value = "";
  }

  renderTodoList();
};

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

const handleEdit = (taskId) => {
  const todoToEdit = todos.find((todo) => todo.id === taskId);
  todoToEdit.edit = true;
  renderTodoList();
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

const createTaskElement = (task) => {
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

const appendErrorToTask = (li, error) => {
  const updateError = document.createElement("p");
  updateError.style.color = "red";
  updateError.textContent = error;
  li.appendChild(updateError);
};

const renderTodoList = () => {
  taskList.innerHTML = "";

  todos.forEach((todo) => {
    const newTask = createTaskElement(todo);
    taskList.appendChild(newTask);
  });
};

const handleCreateTodo = () => {
  const textContent = taskInputText.value;

  if (validateInput() === false) {
    return;
  }

  const taskId = generateUniqueId();
  const task = {
    id: taskId,
    value: textContent,
    done: false,
    edit: false,
    error: "",
  };
  todos.push(task);
  errorMessage.innerHTML = "";
  renderTodoList();
  resetTaskInput();
};

addTaskBtn.addEventListener("click", handleCreateTodo);
taskInputText.addEventListener("input", validateInput);
