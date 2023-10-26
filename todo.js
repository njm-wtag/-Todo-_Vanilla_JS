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
  let errorMessage = document.getElementById(`error_${taskId}`);

  if (!isUserInputValid(updatedValue)) {
    if (!errorMessage) {
      errorMessage = document.createElement("p");
      errorMessage.id = `error_${taskId}`;
      document.getElementById(`todo_${taskId}`).appendChild(errorMessage);
    }
    errorMessage.innerText = "Updated task can not be empty";

    return;
  }

  const taskToUpdate = todos.find((todo) => todo.id === taskId);

  if (taskToUpdate) {
    taskToUpdate.value = updatedValue;
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
  const taskElement = document.getElementById(`todo_${taskId}`);
  const inputField = createUpdateInput(todoToEdit);
  const updateButton = createButton("Update");

  updateButton.addEventListener("click", () =>
    handleUpdate(taskId, inputField.value)
  );

  const cancelButton = createButton("Cancel");
  cancelButton.addEventListener("click", renderTodoList);

  taskElement.innerHTML = "";
  taskElement.appendChild(inputField);
  taskElement.appendChild(updateButton);
  taskElement.appendChild(cancelButton);
};

const handleDone = (taskId) => {
  document
    .getElementById(`todo_${taskId}`)
    .style.setProperty("text-decoration", "line-through");

  const editButton = document
    .getElementById(`todo_${taskId}`)
    .querySelector(`#edit_${taskId}`);
  console.log(editButton);
  editButton.style.display = "none";
};

const createDoneButton = (taskId) => {
  const doneButton = createButton("Done");

  doneButton.addEventListener("click", () => {
    handleDone(taskId);
  });

  return doneButton;
};

const createEditButton = (taskId) => {
  const editButton = createButton("Edit");
  editButton.setAttribute("id", `edit_${taskId}`);
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
  li.innerHTML = `
      ${task.value}
  `;
  li.id = `todo_${task.id}`;
  const deleteButton = createDeleteButton(task.id);
  li.appendChild(deleteButton);
  const editButton = createEditButton(task.id);
  li.appendChild(editButton);
  const doneButton = createDoneButton(task.id);
  li.appendChild(doneButton);

  return li;
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
  const task = { id: taskId, value: textContent, done: false };
  todos.push(task);
  errorMessage.innerHTML = "";
  renderTodoList();
  resetTaskInput();
};
addTaskBtn.addEventListener("click", handleCreateTodo);
taskInputText.addEventListener("input", validateInput);
