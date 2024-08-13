import React, {useContext} from 'react'
import CounterContext, { useCounterValue } from '../CounterContext'

const Display = () => {
    const counter = useCounterValue()
  return (
    <p>{counter}</p>
  )
}

export default Display