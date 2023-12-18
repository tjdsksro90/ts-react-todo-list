import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { addTodo, deleteTodo, getTodos, toggleTodo } from "../api/todos";
import { queryKeys } from "./queryKeys";

export const useTodoQuery = () => {
  const queryClient = useQueryClient();

  // query
  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [queryKeys.todos],
    queryFn: getTodos,
  });

  // addTodo
  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.todos] });
    },
  });

  // deleteTodo
  const deleteMutaion = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.todos] });
    },
  });

  // toggleTodo
  const toggleMutaion = useMutation({
    mutationFn: toggleTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.todos] });
    },
  });

  return {
    todos,
    isLoading,
    isError,
    addMutation,
    deleteMutaion,
    toggleMutaion,
  };
};
