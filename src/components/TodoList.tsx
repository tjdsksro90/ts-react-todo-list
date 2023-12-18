import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, getTodos, toggleTodo } from "../api/todos";

const TodoList = () => {
  const { isLoading, data: todos } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const doneTodos = todos?.filter((todo) => todo.isDone) || [];
  const notDoneTodos = todos?.filter((todo) => !todo.isDone) || [];

  const queryClient = useQueryClient();

  const deleteMutaion = useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      console.log("성공하였습니다!");
    },
    onMutate: async (id: number) => {
      console.log("onMutate 호출");
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData(["todos"]);

      queryClient.setQueryData(["todos"], (prev: Todo[]) =>
        prev.filter((item) => item.id === id)
      );

      return { previousTodos };
    },
    onError: ({
      err,
      newTodo,
      context,
    }: {
      err: string;
      newTodo: Todo;
      context: any;
    }) => {
      console.log("onError", err);
      console.log("context:", context);
      queryClient.setQueryData(["todos"], context.previousTodos);
    },
    onSettled: () => {
      console.log("onSettled");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const toggleMutaion = useMutation({
    mutationFn: (id: number) => toggleTodo(id),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["todos"] });
      console.log("성공하였습니다!");
    },
    onMutate: async (id: number) => {
      console.log("onMutate 호출");
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData(["todos"]);

      queryClient.setQueryData(["todos"], (prev: Todo[]) =>
        prev.map((item) => {
          if (item.id === id) {
            console.log(item, "item", id, "id");
            return { ...item, isDone: !item.isDone };
          } else {
            return item;
          }
        })
      );

      return { previousTodos };
    },
    onError: ({
      err,
      newTodo,
      context,
    }: {
      err: string;
      newTodo: Todo;
      context: any;
    }) => {
      console.log("onError", err);
      console.log("context:", context);
      queryClient.setQueryData(["todos"], context.previousTodos);
    },
    onSettled: () => {
      console.log("onSettled");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  return (
    <>
      {isLoading && <div>로딩중...</div>}
      {!isLoading && (
        <>
          <ul>
            {notDoneTodos.map(({ id, title, content }) => (
              <li key={id}>
                <h2>{title}</h2>
                <p>{content}</p>
                <button onClick={() => deleteMutaion.mutate(id)}>삭제</button>
                <button onClick={() => toggleMutaion.mutate(id)}>완료</button>
              </li>
            ))}
          </ul>
          <hr />
          <ul>
            {doneTodos.map(({ id, title, content }) => (
              <li key={id}>
                <h2>{title}</h2>
                <p>{content}</p>
                <button onClick={() => deleteMutaion.mutate(id)}>삭제</button>
                <button onClick={() => toggleMutaion.mutate(id)}>취소</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default TodoList;
