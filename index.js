import {
  taskList,
  taskInputCard,
  searchText,
  initialTaskContainer,
} from "./scripts/elements.js";
import { todos } from "./scripts/deteleTask.js";
import { createTaskElement } from "./scripts/taskActions.js";

import {
  disableFilterBar,
  filterStatus,
  handleToggle,
  paginationFilter,
  searchFilter,
  todoStateFilter,
} from "./scripts/actions.js";

if (todos.length === 0) {
  disableFilterBar();
}

export const renderTodoList = (todos) => {
  let auxilaryTodos = [];
  auxilaryTodos = [...searchFilter(searchText, todos || [])];
  auxilaryTodos = [...todoStateFilter(filterStatus, auxilaryTodos)];
  auxilaryTodos = [...paginationFilter(auxilaryTodos)];
  taskList.innerHTML = "";
  taskList.appendChild(taskInputCard);

  auxilaryTodos.forEach((todo) => {
    const newTask = createTaskElement(todo);
    taskList.append(newTask);
  });
};

renderTodoList(todos);
