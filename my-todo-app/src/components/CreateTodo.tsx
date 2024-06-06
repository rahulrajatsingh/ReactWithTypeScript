import React, { useState } from 'react';

interface CreateTodoProps {
  onAddTodo: (title: string) => void;
}

const CreateTodo: React.FC<CreateTodoProps> = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');

  const handleAddTodo = () => {
    if (title.trim() !== '') {
      onAddTodo(title);
      setTitle('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={handleAddTodo}>Add</button>
    </div>
  );
};

export default CreateTodo;
