import { createStore, Action, Thunk, action, thunk } from 'easy-peasy';
import axios from 'axios';
import { createTypedHooks } from 'easy-peasy';


export interface Todo {
    id: number;
    title: string;
    isCompleted: boolean;
  }

  // this is just the type definition
  interface TodoModel {
    todos: Todo[];
    
    fetchTodos: Thunk<TodoModel>;
    addTodo: Thunk<TodoModel, Todo>;
    toggleTodo: Thunk<TodoModel, number>;
    deleteTodo: Thunk<TodoModel, number>;
    
    setTodos: Action<TodoModel, Todo[]>;
    addTodoLocal: Action<TodoModel, Todo>;
    toggleTodoLocal: Action<TodoModel, number>;
    deleteTodoLocal: Action<TodoModel, number>;
  }


  // now lets create the store
  const todoModel: TodoModel = {
    todos: [],

    setTodos: action((state, todos) => {
        state.todos = todos;
    }),

    addTodoLocal: action((state, newTodo) => {
        state.todos.push(newTodo);
    }),
    toggleTodoLocal: action((state, id) => {
        const todo = state.todos.find(t => t.id === id);
        if (todo) {
          todo.isCompleted = !todo.isCompleted;
        }
    }),
    deleteTodoLocal: action((state, id) => {
        state.todos = state.todos.filter(t => t.id !== id);
    }),

    fetchTodos: thunk(async (actions) => {
        const response = await axios.get<Todo[]>('https://localhost:7156/api/todo');
        actions.setTodos(response.data);
      }),
      addTodo: thunk(async (actions, newTodo) => {
        const response = await axios.post('https://localhost:7156/api/todo', newTodo);
        actions.addTodoLocal(response.data);
      }),
      toggleTodo: thunk(async (actions, id, { getState }) => {
        const state = getState();
        const todo = state.todos.find(t => t.id === id);
        if (todo) {
          const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
          await axios.put(`https://localhost:7156/api/todo/${id}`, updatedTodo);
          actions.toggleTodoLocal(id);
        }
      }),
      deleteTodo: thunk(async (actions, id) => {
        await axios.delete(`https://localhost:7156/api/todo/${id}`);
        actions.deleteTodoLocal(id);
      }),
  };

 
  const store = createStore(todoModel);

  const { useStoreActions, useStoreState } = createTypedHooks<TodoModel>();
  
  export { store, useStoreActions, useStoreState };


