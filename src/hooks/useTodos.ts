import { useEffect, useState } from "react";
import { useTodoQuery } from "../query";

export const useTodos = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [doneList, setDoneList] = useState<Todo[]>([]);

  const {
    todos,
    isError,
    isLoading,
    addMutation,
    deleteMutaion,
    toggleMutaion,
  } = useTodoQuery();

  useEffect(() => {
    setTodoList(todos?.filter((todo: Todo) => !todo.isDone));
    setDoneList(todos?.filter((todo: Todo) => todo.isDone));
  }, [todos]);

  const addTodo = async (newTodo: Todo) => {
    await addMutation.mutateAsync(newTodo);
  };

  const deleteTodo = async (id: number) => {
    await deleteMutaion.mutateAsync(id);
  };

  const toggleTodo = async (id: number) => {
    await toggleMutaion.mutateAsync(id);
  };

  return {
    todos,
    isError,
    isLoading,
    todoList,
    doneList,
    addTodo,
    deleteTodo,
    toggleTodo,
  };
};
