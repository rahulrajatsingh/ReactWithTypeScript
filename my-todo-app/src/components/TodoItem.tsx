import React from 'react';
import {Todo} from '../store'

interface TodoItemProps {
    todo: Todo;
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
  }

const TodoItem: React.FC<TodoItemProps> = (props) => {
  
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this todo?')) {
            props.onDelete(props.todo.id);
        }
      };
    
      const handleToggle = () => {
        props.onToggle(props.todo.id);
      };
    
    return (
    <li>
      <input
        type="checkbox"
        checked={props.todo.isCompleted}
        onChange={handleToggle}
      />
      {props.todo.title}
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default TodoItem;
