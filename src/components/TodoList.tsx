import { useTodo } from "../contexts/TodoContext";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const { filteredTodos, error, filter } = useTodo();

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (filteredTodos.length === 0 && filter !== "all") {
    const filterText = filter === "completed" ? "completed" : "not completed";
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500 text-lg">No {filterText} todos found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">
          Your Todos ({filteredTodos.length})
        </h2>
      </div>
      <div className="divide-y divide-gray-200">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
