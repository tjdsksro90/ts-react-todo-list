import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useState } from "react";
import { addTodo } from "../api/todos";

const TodoInput = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (newTodo: Todo) => addTodo(newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      console.log("성공하였습니다!");
    },
    onMutate: async (newTodo: Todo) => {
      console.log("onMutate 호출");
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData(["todos"]);

      queryClient.setQueryData(["todos"], (prev: Todo[]) => [...prev, newTodo]);

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

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "title") setTitle(e.target.value);
    else if (e.target.name === "content") setContent(e.target.value);
    else {
      console.error("존재하지 않는 상태값입니다.");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo: Todo = {
      id: Date.now(),
      title,
      content,
      isDone: false,
    };

    addMutation.mutate(newTodo);
    setTitle("");
    setContent("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={title}
            placeholder="제목을 입력해주세요"
            required
          />
          <input
            type="text"
            name="content"
            onChange={handleChange}
            value={content}
            placeholder="내용을 입력해주세요"
            required
          />
          <button type="submit">추가</button>
        </div>
      </form>
    </>
  );
};

export default TodoInput;
