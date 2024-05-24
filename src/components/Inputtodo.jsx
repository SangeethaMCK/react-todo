import React, { useState } from 'react';
import '../App.css'

function InputTodo({ item, onEdit, onDelete, onToggle }) {
    
    const handleCheckboxChange = () => {
        onToggle(item.id);
    };

    return (
        <>
             <td>  <input
                type='checkbox' 
                checked={item.completed} 
                onChange={handleCheckboxChange}
            /></td>
            <td>{item.name}</td>
            <td>{item.date}</td>
            <td>{item.details}</td>
            <td>{item.priority}</td>
            <td><button className='button-edit' onClick={() => onEdit(item.id)}>EDIT</button></td>
            <td><button className='button-del' onClick={() => onDelete(item.id)}>DELETE</button></td>
            </>
    );
}

export default InputTodo;
