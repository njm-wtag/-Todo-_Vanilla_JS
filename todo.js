console.dir(document)
const addTaskBtn =  document.getElementById("addTask")
const taskInputText =  document.getElementById("taskInput")
const taskList =  document.getElementById("taskList")

const handleSubmit = () => {
    if(taskInputText.value){
    const newTask = document.createElement("li");
    newTask.innerHTML = taskInputText.value
    taskList.appendChild(newTask);
    taskInputText.value = ""
    }
    else
    alert("Please add a task")

}
addTaskBtn.addEventListener("click", handleSubmit)