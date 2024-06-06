import React, { useEffect } from 'react';
import './App.css'
import TodoList from './components/TodoList';
import { Todo } from './store';
import  CreateTodo from './components/CreateTodo';
import {  useStoreState, useStoreActions } from './store';


const App: React.FC = () => {
  const todos = useStoreState((state) => state.todos);
  const fetchTodos = useStoreActions((actions) => actions.fetchTodos);
  const addTodo = useStoreActions((actions) => actions.addTodo);
  const deleteTodo = useStoreActions((actions) => actions.deleteTodo);
  const toggleTodo = useStoreActions((actions) => actions.toggleTodo);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAddTodo = (t: string) => {
    const newTodo: Todo = {id: 0, title: t, isCompleted: false };
    addTodo(newTodo);
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodo(id);
  };

  const handleToggleTodo = (id: number) => {
    toggleTodo(id);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <CreateTodo onAddTodo={handleAddTodo} />
      <TodoList todos={todos} onDelete={handleDeleteTodo} onToggle={handleToggleTodo} />
    </div>
  );
}

export default App
