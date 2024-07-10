import React from 'react'
import ReactDOM from 'react-dom/client'
import {createStore, combineReducers} from 'redux'
import { Provider } from 'react-redux'
import { createNote } from './reducers/noteReducer.js'
import { filterChange } from './reducers/filterReducer.js'

import App from './App.jsx'
import noteReducer from './reducers/noteReducer.js'
import filterReducer from './reducers/filterReducer.js'

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
})

const store = createStore(reducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
    <App />
  </Provider>,
)
