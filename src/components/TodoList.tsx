import React from "react";
import useTodos from "../hooks/useTodos";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({ todos, setTodos }: Props) => {
  const { deleteTodo, toggleTodo } = useTodos(setTodos);

  const doneTodos = todos.filter((todo) => todo.isDone);
  const notDoneTodos = todos.filter((todo) => !todo.isDone);
  return (
    <>
      <ul>
        {notDoneTodos.map(({ id, title, content }) => (
          <li key={id}>
            <h2>{title}</h2>
            <p>{content}</p>
            <button onClick={() => deleteTodo(id)}>삭제</button>
            <button onClick={() => toggleTodo(id)}>완료</button>
          </li>
        ))}
      </ul>
      <hr />
      <ul>
        {doneTodos.map(({ id, title, content }) => (
          <li key={id}>
            <h2>{title}</h2>
            <p>{content}</p>
            <button onClick={() => deleteTodo(id)}>삭제</button>
            <button onClick={() => toggleTodo(id)}>완료</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
