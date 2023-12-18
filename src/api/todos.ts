import axios from "axios";

export const getTodos = async () => {
  console.log("getTodos 호출");
  const response = await axios.get("http://localhost:4000/todos");
  return response.data;
};

export const addTodo = async (newTodo: Todo): Promise<Todo> => {
  console.log("addTodo 호출");

  const response = await axios.post("http://localhost:4000/todos", newTodo);
  return response.data;
};

export const deleteTodo = async (id: number) => {
  console.log("deleteTodo 호출");

  const response = await axios.delete(`http://localhost:4000/todos/${id}`);
  return response.data;
};

export const toggleTodo = async (todo: Todo) => {
  console.log("toggleTodo 호출");

  const response = await axios.patch(`http://localhost:4000/todos/${todo.id}`, {
    ...todo,
    isDone: !todo.isDone,
  });
  return response.data;
};
