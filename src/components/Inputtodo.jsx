import React, { useState } from 'react';

function InputTodo({ item, index, onEdit, onDelete, onToggle }) {
    const handleCheckboxChange = () => {
        onToggle(index);
    };

    return (
        <>
             <td>  <input 
                type='checkbox' 
                checked={item.done} 
                onChange={handleCheckboxChange}
            /></td>
            <td>{item.name}</td>
            <td>{item.date}</td>
            <td><button className='button-edit' onClick={() => onEdit(index)}>EDIT</button></td>
            <td><button className='button-del' onClick={() => onDelete(index)}>DEL</button></td>
            </>
    );
}

export default InputTodo;
