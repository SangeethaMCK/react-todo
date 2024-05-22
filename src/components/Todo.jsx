
import React, { useState, useEffect } from "react";
import InputTodo from './Inputtodo';
const localhostAddress="http://localhost:3000/todos";

export default function Todo() {
    const [todo, setTodo] = useState({id:Date.now(), name: "", date: new Date().toISOString().split('T')[0], details: "", priority: "low", completed: false });
    const [todos, setTodos] = useState([]);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        async function fetchTodos() {
            try {
                const response = await fetch(localhostAddress, {
                    mode: "cors",
                });
                if (response.ok) {
                    const data = await response.json();
                    setTodos(data);
                } else {
                    console.error('Failed to fetch todos');
                }
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        }

        fetchTodos();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        if (todo.name.trim()) {
            if (editId === null) {
                setTodos([...todos, todo]);
                    try {
                        await fetch(localhostAddress, {
                          method: "POST",
                          mode: "cors",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(todo),
                        });
                      }
                      catch (error) {
                        console.error(error);
                      }
                }
             else {
                const updatedTodos = todos.map((item) =>
                    item.id == editId ? todo : item
                );
                setTodos(updatedTodos);
                setEditId(null);

                await fetch(`${localhostAddress}/${todo.id}`, {
                    method: "PUT",
                    mode: "cors",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(todo)
                });
            }}
            setTodo({
                id:Date.now(),
                name: "",
                date: new Date().toISOString().split('T')[0],
                details: "",
                priority: "low",
                completed: false
            });
        }
    

    const  handleDelete = async(id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
          try {
            await fetch(`${localhostAddress}/${id}`, {
              method: "DELETE",
              mode: "cors",
            });
          } catch (error) {
            console.error(error);
          }
    };

    const handleToggle = async(id) => {
        const updatedTodos = todos.map((item) =>
            item.id === id ? { ...item, completed: !item.completed } : item
        );
        setTodos(updatedTodos);

        const updatedTodo = updatedTodos.find(item => item.id === id);
      
        try {
            await fetch(`${localhostAddress}/${id}`, {
              method: "PATCH",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({completed:updatedTodo.completed}),
            });
          } catch (error) {
            console.error(error);
          }
    };

    const handleEdit = (id) => {
        const editTodo = todos.find(todo => todo.id === id);
        setEditId(id);
        setTodo(editTodo);
    };

    return (
        <>
            <h1>TODO-APP</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={todo.name}
                    placeholder="Enter task"
                    onChange={(e) => setTodo({ ...todo, name: e.target.value })}
                />
                <br />
                <input
                    type="date"
                    value={todo.date}
                    onChange={(e) => setTodo({ ...todo, date: e.target.value })}
                />
                <br />
                <textarea placeholder="Describe" value={todo.details}  onChange={(e) => setTodo({ ...todo, details: e.target.value })}>
                    Description
                </textarea>
                <br />
                <select className={`mySelect ${todo.priority}`} value={todo.priority} onChange={(e) => setTodo({ ...todo, priority: e.target.value })}>
                    <option value="low">Low</option>
                    <option value="mid">Mid</option>
                    <option value="high">High</option>
                </select>
                <button className='button-add' type="submit">ADD</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Done</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Details</th>
                        <th>Priority</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {todos.map((item) => (
                        <tr key={item.id} className={`${item.completed ?'taskCompleted':''}`}>
                            <InputTodo
                                item={item}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onToggle={handleToggle}
                            />
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
