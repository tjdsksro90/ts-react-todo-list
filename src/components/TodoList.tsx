import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, toggleTodo } from "../redux/modules/todos";
import { RootState } from "../redux/config/configStore";

const TodoList = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state: RootState) => state);

  const doneTodos = todos.filter((todo) => todo.isDone);
  const notDoneTodos = todos.filter((todo) => !todo.isDone);
  return (
    <>
      <ul>
        {notDoneTodos.map(({ id, title, content }) => (
          <li key={id}>
            <h2>{title}</h2>
            <p>{content}</p>
            <button onClick={() => dispatch(deleteTodo(id))}>삭제</button>
            <button onClick={() => dispatch(toggleTodo(id))}>완료</button>
          </li>
        ))}
      </ul>
      <hr />
      <ul>
        {doneTodos.map(({ id, title, content }) => (
          <li key={id}>
            <h2>{title}</h2>
            <p>{content}</p>
            <button onClick={() => dispatch(deleteTodo(id))}>삭제</button>
            <button onClick={() => dispatch(toggleTodo(id))}>취소</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
