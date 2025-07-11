import { useTodo, type FilterType } from "../contexts/TodoContext";

function TodoStatus() {
  const { filter, setFilter, todos, filteredTodos, clearAllTodos } = useTodo();

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const notCompletedCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Todo Status
        </h2>
        
        {/* Statistics */}
        <div className="mb-4 text-sm text-gray-600">
          <span className="mr-4">Total: {todos.length}</span>
          <span className="mr-4">Completed: {completedCount}</span>
          <span>Not Done: {notCompletedCount}</span>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => handleFilterChange("all")}
            className={`px-4 py-2 rounded-md transition-colors ${
              filter === "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            All ({todos.length})
          </button>

          <button
            onClick={() => handleFilterChange("notCompleted")}
            className={`px-4 py-2 rounded-md transition-colors ${
              filter === "notCompleted"
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Not Done ({notCompletedCount})
          </button>

          <button
            onClick={() => handleFilterChange("completed")}
            className={`px-4 py-2 rounded-md transition-colors ${
              filter === "completed"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Done ({completedCount})
          </button>
        </div>

        {/* Clear All Button and Current Filter Info */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing: {filteredTodos.length} items
          </div>
          
          {todos.length > 0 && (
            <button
              onClick={clearAllTodos}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              title="Clear all todos from localStorage"
            >
              Clear All
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoStatus;
