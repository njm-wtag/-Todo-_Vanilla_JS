import { renderTodoList } from "../index.js";

export let todos = [
  // {
  //   value: "1",
  //   createdAt: Date.now(),
  // },
  // {
  //   value: "2",
  //   createdAt: Date.now(),
  // },
  // {
  //   value: "3",
  //   createdAt: Date.now(),
  // },
  // {
  //   value: "4",
  //   createdAt: Date.now(),
  // },
  // {
  //   value: "5",
  //   createdAt: Date.now(),
  // },
  // {
  //   value: "6",
  //   createdAt: Date.now(),
  // },
  // {
  //   value: "7",
  //   createdAt: Date.now(),
  // },
  // {
  //   value: "8",
  //   createdAt: Date.now(),
  // },
];

export const handleDelete = (taskId) => {
  todos = todos.filter((todo) => todo.id !== taskId);

  if (todos) renderTodoList();
};
