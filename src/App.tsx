import { useEffect, useState } from "react";
import { dbApi } from "./api";

function App() {
  const [todos, setTodos] = useState<string[]>([]);
  const [loadingTodos, setLoadingTodos] = useState(false);
  const [refreshTodos, setRefreshTodos] = useState(true);
  const [todo, setTodo] = useState("");
  const [creatingNew, setCreatingNew] = useState(false);
  const [savingTodo, setSavingTodo] = useState(false);
  const [deletingToDo, setDeletingToDo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (refreshTodos) {
      setLoadingTodos(true);
      dbApi.getTodos().then((result) => {
        setTodos(Array.from(result.data));
        clearTimeout(result.timeoutId);
        setRefreshTodos(false);
        setLoadingTodos(false);
      });
    }
  }, [refreshTodos]);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (errorMessage) {
        setErrorMessage("");
        if (deletingToDo) {
          setDeletingToDo("");
        }
      }
    }, 3000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [errorMessage]);

  return (
    <div>
      {loadingTodos && <p>Loading...</p>}

      {errorMessage && (
        <div>
          <p style={{ color: "red" }}>{errorMessage}</p>
          <button
            onClick={() => {
              setErrorMessage("");
              if (deletingToDo) {
                setDeletingToDo("");
              }
            }}
          >
            Back to list
          </button>
        </div>
      )}

      {!creatingNew && todos.length > 0 && !loadingTodos && !errorMessage && (
        <>
          <button
            autoFocus
            onClick={() => {
              setCreatingNew(true);
            }}
          >
            Create New
          </button>
          <ul>
            {todos.map((todo) => (
              <li key={todo}>
                <p>
                  {todo}{" "}
                  {deletingToDo === todo ? (
                    "Deleting..."
                  ) : (
                    <button
                      onClick={() => {
                        setDeletingToDo(todo);
                        dbApi
                          .deleteTodo(todo)
                          .then((result) => {
                            clearTimeout(result.timeoutId);
                            setRefreshTodos(true);
                            setDeletingToDo("");
                          })
                          .catch((reason) => {
                            setErrorMessage(reason.message);
                          });
                      }}
                    >
                      delete
                    </button>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </>
      )}

      {(creatingNew || todos.length === 0) && !loadingTodos && (
        <>
          <p>Create a new todo:</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSavingTodo(true);
              dbApi.addTodo(todo).then((result) => {
                setTodo("");
                setCreatingNew(false);
                clearTimeout(result.timeoutId);
                setRefreshTodos(true);
                setSavingTodo(false);
              });
            }}
          >
            {savingTodo ? (
              <p>Saving...</p>
            ) : (
              <input
                autoFocus
                onChange={(e) => {
                  setTodo(e.target.value);
                }}
              ></input>
            )}
          </form>
        </>
      )}
    </div>
  );
}

export default App;
