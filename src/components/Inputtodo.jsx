import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

import "../App.css";

function InputTodo({ item, onEdit, onDelete, onToggle }) {
  const handleCheckboxChange = () => {
    onToggle(item.id);
  };

  return (
    <>
      <td>
        {" "}
        <input
          type="checkbox"
          checked={item.completed}
          onChange={handleCheckboxChange}
        />
      </td>
      <td>{item.name}</td>
      <td>{item.date}</td>
      <td>{item.details}</td>
      <td>{item.priority}</td>
      <td className="center">
        <button className="button-edit" onClick={() => onEdit(item.id)}>
          <FontAwesomeIcon icon={faPenToSquare} className="edit-icon" />
        </button>
      </td>
      <td className="center">
        <button className="button-del" onClick={() => onDelete(item.id)}>
          <FontAwesomeIcon icon={faTrash} className="del-icon" />
        </button>
      </td>
    </>
  );
}

export default InputTodo;
