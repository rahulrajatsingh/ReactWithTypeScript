// src/components/TodoList.tsx
import React from 'react';
import { Todo} from '../store';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = (props) => {
  return (
    <ul>
      {props.todos.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          onDelete={props.onDelete} 
          onToggle={props.onToggle}
        />
      ))}
    </ul>
  );
};

export default TodoList;
