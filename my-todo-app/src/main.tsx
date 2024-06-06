import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {store} from './store.ts'
import { StoreProvider } from 'easy-peasy'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <StoreProvider store={store}>
    <App />
  </StoreProvider>
</React.StrictMode>,
)
