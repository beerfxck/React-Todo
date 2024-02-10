import React, { useState, useEffect } from "react";
import Todo from "./component/Todo";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputText.trim() !== "") {
      const newTodo = {
        id: uuidv4(),
        text: inputText,
        completed: false,
        updatedAt: new Date().toLocaleString(),
      };

      setTodos([newTodo, ...todos]);
      setInputText("");
    } else {
      alert("กรุณากรอกข้อความของท่าน !!");
    }
  };

  const handleToggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleRemoveTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="box">
      <div className="app">
        <h1>To-do List</h1>
        <div className="add-todo">
          <input
            className="input"
            type="text"
            placeholder="Type something..."
            value={inputText}
            onChange={handleInputChange}
          />
          <button className="addButton" onClick={handleAddTodo}>
            Add
          </button>
        </div>
        <div className="todos">
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              onToggleComplete={handleToggleComplete}
              onRemoveTodo={handleRemoveTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
