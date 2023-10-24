const addTaskBtn = document.getElementById("addTask");
const taskInputText = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const errorMessage = document.getElementById("errorMessage");

let todos = [];

const resetTaskInput = () => {
  taskInputText.value = "";
};
const validateInput = () => {
  if (taskInputText.value === "") {
    errorMessage.innerHTML = "Please add a task";
  } else {
    errorMessage.innerHTML = "";
  }
};
const renderTodoList = () => {
  taskList.innerHTML = "";

  todos.forEach((todo) => {
    const newTask = document.createElement("li");
    newTask.innerHTML = `${todo}`;
    taskList.appendChild(newTask);
  });
};

const handleCreateTodo = () => {
  const textContent = taskInputText.value;

  if (textContent !== "") {
    todos.push(textContent);
    errorMessage.innerHTML = "";
    renderTodoList();
    resetTaskInput();
  } else validateInput();
};
addTaskBtn.addEventListener("click", handleCreateTodo);
taskInputText.addEventListener("input", validateInput);
