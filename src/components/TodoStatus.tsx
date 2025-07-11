import { useTodo, type FilterType } from "../contexts/TodoContext";

function TodoStatus() {
  const { filter, setFilter, todos } = useTodo();

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

        <div className="flex gap-2">
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
      </div>
    </div>
  );
}

export default TodoStatus;
