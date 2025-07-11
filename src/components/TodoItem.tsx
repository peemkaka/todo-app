import React from "react";
import { useTodo } from "../contexts/TodoContext";
import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
  const { deleteTodo, toggleTodo, editTodo } = useTodo();
  const [isEditing, setIsEditing] = React.useState(false);

  const handleToggle = () => {  
    setIsEditing(true);
  };

  return (
    <div className="p-4 flex items-center justify-between hover:bg-gray-50">
      {isEditing ? (
        <div>
          <input
            type="text"
            defaultValue={todo.title}
            onBlur={(e) => {
              if (e.target.value.trim() !== "") {
                editTodo(todo.id, e.target.value.trim());
              }
            }}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
        </div>
      ) : (
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <span
            className={`text-lg ${
              todo.completed ? "line-through text-gray-500" : "text-gray-800"
            }`}
          >
            {todo.title}
          </span>
        </div>
      )}
      <div className="flex space-x-2 justify-between">
        {!isEditing ? (
          <button
            onClick={handleToggle}
            className="px-3 py-1 text-red-600 hover:bg-red-100 rounded transition-colors"
            title="Edit todo"
          >
            ✏️
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="ml-2 text-blue-600 hover:underline"
          >
            Save
          </button>
        )}
        <button
          onClick={() => deleteTodo(todo.id)}
          className="px-3 py-1 text-red-600 hover:bg-red-100 rounded transition-colors"
          title="Delete todo"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
