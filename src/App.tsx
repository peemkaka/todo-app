import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoStatus from "./components/TodoStatus";
function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Todo App</h1>
        </div>
        {/* Todo Form */}
        <TodoForm />
        {/* Todo Status */}
        <TodoStatus />
        {/* Todo List */}
        <TodoList />
      </div>
    </div>
  );
}

export default App;
