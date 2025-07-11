import React, { useState, useContext, useEffect } from "react";
import type { Todo } from "../types/todo";

export type FilterType = "all" | "completed" | "notCompleted";

type TodoContextType = {
  todos: Todo[];
  error: string | null;
  filter: FilterType;
  filteredTodos: Todo[];
  addTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, updatedTitle: string) => void;
  toggleTodo: (id: number) => void;
  setFilter: (filter: FilterType) => void;
};

const TodoContext = React.createContext<TodoContextType | undefined>(undefined);

function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "notCompleted") return !todo.completed;
    return true; 
  });

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        const data: Todo[] = await response.json();
        setTodos(data.slice(0, 8)); 
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };

    fetchTodos();
  }, []);

  const addTodo = (todo: Todo) => {
    try {
      setTodos((prev) => [ todo,...prev]);
      setError(null);
    } catch (err) {
      setError("Failed to add todo");
    }
  };

  const deleteTodo = (id: number) => {
    try {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      setError(null);
    } catch (err) {
      setError("Failed to delete todo");
    }
  };

  const toggleTodo = (id: number) => {
    try {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
      setError(null);
    } catch (err) {
      setError("Failed to toggle todo");
    }
  };

  const editTodo = (id: number, updatedTitle: string) => {
    try {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, title: updatedTitle } : todo
        )
      );
      setError(null);
    } catch (err) {
      setError("Failed to edit todo");
    }
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        error,
        filter,
        filteredTodos,
        editTodo,
        addTodo,
        deleteTodo,
        toggleTodo,
        setFilter,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};

export default TodoProvider;
