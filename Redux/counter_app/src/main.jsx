import React from 'react'
import ReactDOM from 'react-dom/client'
import {createStore} from 'redux'

const counterReducer = (state=0, action) => {
  switch (action.type) {
    case 'Increment':
      
      return state + 1
    case 'Decrement':
    
      return state - 1
    case 'Zero':
    
      return 0
    default:
      return state
  }
}

const store = createStore(counterReducer)

const App = () => {
  

  return(
    <>
      <p>{store.getState()}</p>
      <button onClick={e => store.dispatch({type:'Increment'})}>Increment</button>
      <button onClick={e => store.dispatch({type:'Decrement'})}>Decrement</button>
      <button onClick={e => store.dispatch({type:'Zero'})}>Zero</button>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

renderApp()
store.subscribe(renderApp)
