export default function useTodos(
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
) {
  const addTodo = (todo: Todo) => {
    setTodos((prev) => [...prev, todo]);
  };
  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) return { ...todo, isDone: !todo.isDone };
        return todo;
      })
    );
  };
  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return { addTodo, toggleTodo, deleteTodo };
}
