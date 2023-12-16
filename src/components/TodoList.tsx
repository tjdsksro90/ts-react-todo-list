import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/config/configStore";
import { deleteTodo, getTodos, toggleTodo } from "../redux/modules/todos";

const TodoList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { todos, loading } = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const doneTodos = todos.filter((todo) => todo.isDone);
  const notDoneTodos = todos.filter((todo) => !todo.isDone);
  return (
    <>
      {loading && <div>로딩중...</div>}
      {!loading && (
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
      )}
    </>
  );
};

export default TodoList;
