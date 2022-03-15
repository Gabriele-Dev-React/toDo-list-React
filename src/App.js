import "./App.css";
import React, { useState } from "react";

function App() {
  const [arrTodos, setArrTodos] = useState([]); // array contenente la lista
  const [todo, setTodo] = useState(""); //

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

  return (
    <div className="App">
      <h1>ToDo App with React</h1>
      <form onSubmit={newTodo1}>
        <input
          type="text"
          onChange={(item) => setTodo(item.target.value)}
          value={todo}
        />
        <button type="submit">Add Todo</button>
        {arrTodos.map((todo) => (
          <p>{todo.text}</p>
        ))}
      </form>
    </div>
  );
}

export default App;
