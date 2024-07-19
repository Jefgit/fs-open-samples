import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import App from './App.jsx'
import noteReducer, {setNotes} from './reducers/noteReducer.js'
import filterReducer from './reducers/filterReducer.js'
import noteService from './services/notes.js'

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer,
  }
})

noteService
  .getAll()
  .then(notes => 
   store.dispatch(setNotes(notes)))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
    <App />
  </Provider>,
)
