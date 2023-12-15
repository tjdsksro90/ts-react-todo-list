import { useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      title: "할일 타이틀 1",
      content: "할일 내용 1",
      isDone: false,
    },
    {
      id: 2,
      title: "할일 타이틀 2",
      content: "할일 내용 2",
      isDone: false,
    },
  ]);
  return (
    <>
      <TodoInput setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </>
  );
}

export default App;
