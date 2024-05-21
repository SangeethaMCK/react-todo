import { useState } from "react";
import InputTodo from './Inputtodo';

export default function Todo() {
    const [todo, setTodo] = useState({ name: "", date: new Date().toISOString().split('T')[0], done: false });
    const [todos, setTodos] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        if (todo.name.trim()) {
            setTodos([...todos, todo]);
            setTodo({ name: "", date: new Date().toISOString().split('T')[0], done: false });
        }
    }

    const handleDelete = (index) => {
        const updatedTodos = todos.filter((todo, currentIndex) => currentIndex !== index);
        setTodos(updatedTodos);
    };

    const handleToggle = (index) => {
        const updatedTodos = todos.map((todo, currentIndex) =>
            currentIndex === index ? { ...todo, done: !todo.done } : todo
        );
        setTodos(updatedTodos);
    };

    return (
        <>
            <h1>TODO-APP</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={todo.name} placeholder="Enter task"
                    onChange={(e) => setTodo({ ...todo, name: e.target.value })}
                />
                <br />
                <input
                    type="date"
                    value={todo.date}
                    onChange={(e) => setTodo({ ...todo, date: e.target.value })}
                />
                <br />
                <button className='button-add'type="submit">ADD</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Done</th>
                        <th>Name</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((item, index) => (
                        <tr key={index}>
                            <InputTodo
                                item={item}
                                index={index}
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
