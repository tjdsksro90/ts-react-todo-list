import { useTodos } from "../hooks";
import { useTodoQuery } from "../query";

const TodoList = () => {
  const {
    todos,
    isLoading,
    isError,
    todoList,
    doneList,
    deleteTodo,
    toggleTodo,
  } = useTodos();

  return (
    <>
      {isLoading && <div>로딩중...</div>}
      {!isLoading && (
        <>
          <ul>
            {todoList?.map(({ id, title, content }) => (
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
            {doneList?.map(({ id, title, content }) => (
              <li key={id}>
                <h2>{title}</h2>
                <p>{content}</p>
                <button onClick={() => deleteTodo(id)}>삭제</button>
                <button onClick={() => toggleTodo(id)}>취소</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default TodoList;
