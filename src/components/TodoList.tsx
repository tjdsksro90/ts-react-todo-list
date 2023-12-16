import { useEffect } from "react";
import axios from "axios";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({ todos, setTodos }: Props) => {
  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/todos`);
      setTodos(response.data);
    } catch (err) {
      console.log(err, "Error");
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:4000/todos/${id}`);
      console.log(response);
      const sortTodo = todos.filter((item) => item.id !== id);
      setTodos(sortTodo);
    } catch (err) {
      console.log(err, "Error");
    }
  };

  const toggleTodo = async (id: number) => {
    try {
      const response = await axios.put(`http://localhost:4000/todos/${id}`);
      const sortTodo = todos.map((item) => {
        if (item.id === response.data.id)
          return { ...item, isDone: !item.isDone };
        return item;
      });
      setTodos(sortTodo);
    } catch (err) {
      console.log(err, "Error");
    }
  };

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
            <button onClick={() => toggleTodo(id)}>취소</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
