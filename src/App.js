import React, { useState, useEffect, useRef } from "react";
import Todo from "./component/Todo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faTh } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [isGridView, setIsGridView] = useState(false);
  const idCounter = useRef(1);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const InputChange = (e) => {
    setInputText(e.target.value);
  };

  const AddTodo = () => {
    if (inputText.trim() !== "") {
      const newTodo = {
        id: idCounter.current++,
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

  const ToggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const RemoveTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleToggleView = () => {
    setIsGridView(!isGridView);
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
            onChange={InputChange}
          />
          <button className="addButton" onClick={AddTodo}>
            Add
          </button>
          <button className="toggleButton" onClick={handleToggleView}>
            {isGridView ? (
              <FontAwesomeIcon icon={faList} />
            ) : (
              <FontAwesomeIcon icon={faTh} />
            )}
          </button>
        </div>
        <div className={`todos-container ${isGridView ? "grid-view" : ""}`}>
          <div className={isGridView ? "todos-grid" : "todos"}>
            {todos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                onToggleComplete={ToggleComplete}
                onRemoveTodo={RemoveTodo}
                isGridView={isGridView}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
