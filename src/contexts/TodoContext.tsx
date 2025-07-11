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
  clearAllTodos: () => void;
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

  const saveTodosToLocalStorage = (todosData: Todo[]) => {
    try {
      localStorage.setItem('todos', JSON.stringify(todosData));
    } catch (err) {
      console.error('Failed to save todos to localStorage:', err);
    }
  };

  const loadTodosFromLocalStorage = (): Todo[] => {
    try {
      const savedTodos = localStorage.getItem('todos');
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (err) {
      console.error('Failed to load todos from localStorage:', err);
      return [];
    }
  };

  useEffect(() => {
    const initializeTodos = async () => {
      try {
        const savedTodos = loadTodosFromLocalStorage();
        
        if (savedTodos.length > 0) {
          setTodos(savedTodos);
          setError(null);
        } else {
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/todos"
          );
          if (!response.ok) {
            throw new Error("Failed to fetch todos");
          }
          const data: Todo[] = await response.json();
          const initialTodos = data.slice(0, 8);
          setTodos(initialTodos);
          saveTodosToLocalStorage(initialTodos);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };

    initializeTodos();
  }, []);

  const addTodo = (todo: Todo) => {
    try {
      const newTodos = [todo, ...todos];
      setTodos(newTodos);
      saveTodosToLocalStorage(newTodos);
      setError(null);
    } catch (err) {
      setError("Failed to add todo");
    }
  };

  const deleteTodo = (id: number) => {
    try {
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
      saveTodosToLocalStorage(newTodos);
      setError(null);
    } catch (err) {
      setError("Failed to delete todo");
    }
  };

  const toggleTodo = (id: number) => {
    try {
      const newTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(newTodos);
      saveTodosToLocalStorage(newTodos);
      setError(null);
    } catch (err) {
      setError("Failed to toggle todo");
    }
  };

  const editTodo = (id: number, updatedTitle: string) => {
    try {
      const newTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, title: updatedTitle } : todo
      );
      setTodos(newTodos);
      saveTodosToLocalStorage(newTodos);
      setError(null);
    } catch (err) {
      setError("Failed to edit todo");
    }
  }

  const clearAllTodos = () => {
    try {
      setTodos([]);
      localStorage.removeItem('todos');
      setError(null);
    } catch (err) {
      setError("Failed to clear todos");
    }
  };

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
        clearAllTodos,
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
