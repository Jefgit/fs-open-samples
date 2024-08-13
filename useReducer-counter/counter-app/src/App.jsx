import { useContext } from 'react'
import CounterContext, { useCounterValue } from './CounterContext'
import Button from './components/Button'
import Display from './components/Display'


function App() {
  const counter = useCounterValue()
  return(
      <div>
        <Display />
        <div>
          <Button type='INC' label='+'/>
          <Button type='DEC' label='-'/>
          <Button type='ZERO' label='0'/>
        </div>
      </div>
  )
}

export default App
