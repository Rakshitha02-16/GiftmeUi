import React, { useState } from 'react';
 function TodoList() {
  const [task, setTask] = useState('');
 const [todos, setTodos] = useState<string[]>([]);
  const addTodo = () => {
    if (task.trim()) {
      setTodos([...todos, task]);
      setTask('');
    }
  };
  return (
    <div>
      <input value={task} onChange={(e) => setTask(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
 }
 export default TodoList