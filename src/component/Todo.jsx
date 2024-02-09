import React, { useState } from "react";
import { ImBin } from "react-icons/im";
import "./Todo.css";

const Todo = ({ todo, onToggleComplete, onRemoveTodo }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggleComplete = () => {
    setIsChecked(!isChecked);
    onToggleComplete(todo.id);
  };

  const handleRemoveTodo = () => {
    const shouldDelete = window.confirm("ต้องการลบหรือไม่ ?");

    if (shouldDelete) {
      onRemoveTodo(todo.id);
    }
  };

  return (
    <div className="todo-box">
      <div className={`todo ${isChecked ? "completed" : ""}`}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleToggleComplete}
        />
        <span className="todo-text">{todo.text}</span>
        <span className="todo-updatedAt">{todo.updatedAt}</span>
        <button className="remove-button" onClick={handleRemoveTodo}>
          <ImBin style={{ color: "red" }} />
        </button>
      </div>
    </div>
  );
};

export default Todo;