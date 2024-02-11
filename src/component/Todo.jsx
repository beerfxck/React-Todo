import React, { useState } from "react";
import { ImBin } from "react-icons/im";
import "./Todo.css";

const Todo = ({ todo, onToggleComplete, onRemoveTodo, isGridView }) => {
  const [isChecked, setIsChecked] = useState(false);

  const ToggleComplete = () => {
    setIsChecked(!isChecked);
    onToggleComplete(todo.id);
  };

  const RemoveTodo = () => {
    const shouldDelete = window.confirm("ต้องการลบหรือไม่ ?");

    if (shouldDelete) {
      onRemoveTodo(todo.id);
    }
  };

  return (
    <div className={`todo-box ${isGridView ? 'grid-view' : ''}`}>
      {isGridView ? (
        <div className={`todo ${isChecked ? "completed" : ""} grid-view`}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={ToggleComplete}
          />
          <span className="todo-text">{todo.text}</span>
          <div className="info">
            <span className="todo-updatedAt">{todo.updatedAt}</span>
            <button className="remove-button" onClick={RemoveTodo}>
              <ImBin style={{ color: "red" }} />
            </button>
          </div>
        </div>
      ) : (
        <div className={`todo ${isChecked ? "completed" : ""}`}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={ToggleComplete}
          />
          <span className="todo-text">{todo.text}</span>
          <span className="todo-updatedAt">{todo.updatedAt}</span>
          <button className="remove-button" onClick={RemoveTodo}>
            <ImBin style={{ color: "red" }} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Todo;
