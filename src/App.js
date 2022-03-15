import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [arrTodos, setArrTodos] = useState([]); // array contenente la lista
  const [todo, setTodo] = useState(""); //
  const [todoEditing, setTodoEditing] = useState(null); //id dell'elemento che stiamo modificando
  const [editingText, setEditingText] = useState("");

  // LOCAL STORAGE
  useEffect(() => {
    const json = localStorage.getItem("arrTodos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setArrTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(arrTodos);
    localStorage.setItem("arrTodos", json);
  }, [arrTodos]);

  // Esempio dalla quale ho preso l'idea

  /*  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setArrTodos([...arrTodos].concat(newTodo));
    setTodo("");
  }  */

  // ADD (DA RIVEDERE)
  const newTodo1 = (e) => {
    e.preventDefault();

    const obj = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };

    setArrTodos([...arrTodos, obj]);
    setTodo("");
  };

  const deleteTodo = (id) => {
    const updateTodos = [...arrTodos].filter((todo) => todo.id !== id);

    setArrTodos(updateTodos);
  };

  // CHECK DA AMPLIARE
  const toggleComplete = (id) => {
    const updateTodos = [...arrTodos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    setArrTodos(updateTodos);
  };

  // EDIT
  const editTodo = (id) => {
    const updateTodos = [...arrTodos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setArrTodos(updateTodos);
    setTodoEditing(null);
    setEditingText("");
  };

  return (
    <div className="App">
      <div id="todo-list">
        <h1>ToDo App with React</h1>
        <form onSubmit={newTodo1}>
          <input
            type="text"
            onChange={(item) => setTodo(item.target.value)}
            value={todo}
          />
          <button type="submit">Add Todo</button>
        </form>
        {arrTodos.map((todo) => (
          <div key={todo.id} className="todo">
            <div className="todo-text">
              <input
                type="checkbox"
                id="completed"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />
              {todo.id === todoEditing ? (
                <input
                  type="text"
                  onChange={(e) => setEditingText(e.target.value)}
                />
              ) : (
                <div>{todo.text}</div>
              )}
            </div>
            <div className="todo-actions">
              {todo.id === todoEditing ? (
                <button onClick={() => editTodo(todo.id)}>Submit Edits</button>
              ) : (
                <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
              )}

              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
