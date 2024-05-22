import React, { useState } from 'react';

function InputTodo({ item, onEdit, onDelete, onToggle }) {
    const[checked, setChecked]= useState(false);
    
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
            <td><button className='button-del' onClick={() => onDelete(item.id)}>DEL</button></td>
            </>
    );
}

export default InputTodo;
