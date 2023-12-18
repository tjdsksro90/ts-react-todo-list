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
            {todoList?.map((item) => (
              <li key={item.id}>
                <h2>{item.title}</h2>
                <p>{item.content}</p>
                <button onClick={() => deleteTodo(item.id)}>삭제</button>
                <button onClick={() => toggleTodo(item)}>완료</button>
              </li>
            ))}
          </ul>
          <hr />
          <ul>
            {doneList?.map((item) => (
              <li key={item.id}>
                <h2>{item.title}</h2>
                <p>{item.content}</p>
                <button onClick={() => deleteTodo(item.id)}>삭제</button>
                <button onClick={() => toggleTodo(item)}>취소</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default TodoList;
