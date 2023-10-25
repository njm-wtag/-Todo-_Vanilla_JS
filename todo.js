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
  } else {
    errorMessage.innerHTML = "Please add a task";
    return false;
  }
};
const handleDelete = (taskId) => {
  todos = todos.filter((todo) => todo.id !== taskId);
  renderTodoList();
};
function createDeleteButton(taskId) {
  const deteleButton = document.createElement("button");
  deteleButton.textContent = "Delete";
  deteleButton.addEventListener("click", () => handleDelete(taskId));
  return deteleButton;
}

function createTaskElement(task) {
  const li = document.createElement("li");
  li.innerHTML = `
      <span id=${task.id}>${task.value}`;
  const deleteButton = createDeleteButton(task.id);
  li.appendChild(deleteButton);
  return li;
}
const renderTodoList = () => {
  taskList.innerHTML = "";

  todos.forEach((todo) => {
    const newTask = createTaskElement(todo);
    taskList.appendChild(newTask);
  });
};

const handleCreateTodo = () => {
  const textContent = taskInputText.value;

  if (validateInput()) {
    const taskId = generateUniqueId();
    const task = { id: taskId, value: textContent, done: false };
    todos.push(task);
    errorMessage.innerHTML = "";
    renderTodoList();
    resetTaskInput();
  }
};

console.log(todos);
addTaskBtn.addEventListener("click", handleCreateTodo);
taskInputText.addEventListener("input", validateInput);
