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
function createTaskElement(task) {
  const li = document.createElement("li");
  li.innerHTML = `
      <span class="task-text ${task.done ? "completed" : ""}">${
    task.value
  }</span>
      <button class="delete-button">Delete</button>
  `;
  return li;
}
const renderTodoList = () => {
  taskList.innerHTML = "";

  todos.forEach((todo) => {
    const newTask = createTaskElement(todo);
    taskList.appendChild(newTask);
  });
  console.log(todos);
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
