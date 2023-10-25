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
function createTaskElement(task) {
  const li = document.createElement("li");
  li.innerHTML = `
      ${task.value}
  `;
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
