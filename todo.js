const addTaskBtn = document.getElementById("addTask");
const taskInputText = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let todos = [];

const resetTaskInput = () => {
  taskInputText.value = "";
};
const createTask = () => {
  taskList.innerHTML = "";
  todos.forEach((todo) => {
    const newTask = document.createElement("li");
    newTask.innerHTML = `${todo}`;
    taskList.appendChild(newTask);
  });
};
const handleSubmit = () => {
  const textContent = taskInputText.value;
  if (textContent) {
    todos.push(textContent);
    createTask();
    resetTaskInput();
  }
};
addTaskBtn.addEventListener("click", handleSubmit);
