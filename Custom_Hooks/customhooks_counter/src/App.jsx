import useCounter from './hooks/useCounter'
import useFields from './hooks/useFields'
import {BrowserRouter as Router, Link, Routes, Route} from 'react-router-dom'
import { useState } from 'react'

const Counter = () => {
  const counter = useCounter()
  const left = useCounter()
  return (
    <div>
      <div>
        <div>{counter.value}</div>
        <button onClick={counter.increase}>plus</button>
        <button onClick={counter.decrease}>minus</button>
        <button onClick={counter.zero}>zero</button>
      </div>
      <div>{left.value}</div>
      <button onClick={left.increase}>plus</button>
        <button onClick={left.decrease}>minus</button>
    </div>
  )
}

const Form = () => {
  const name = useFields('text')
  const born = useFields('date')
  const height = useFields('number')

  return(
    <div>
      <form>
        name: 
        <input {...name}/> 
        <br/> 
        birthdate:
        <input {...born}/>
        <br /> 
        height:
        <input {...height}/>
      </form>
      <div>
        {name.value} {born.value} {height.value} 
      </div>
    </div>
  )
}

const App = () => {
  const style = {
    padding: '10px'
  }
  return (
    <div>
      <Router>
        <div>
          <Link style = {style} to='/counter'>Counter App</Link>
          <Link style = {style} to='/form'>Form App</Link>
        </div>

        <Routes>
          <Route path='/' element={<Counter />} /> 
          <Route path='/counter' element={<Counter />} />
          <Route path='/form' element={<Form />} />
        </Routes>
      </Router>
    </div>
   
  )
}

export default App