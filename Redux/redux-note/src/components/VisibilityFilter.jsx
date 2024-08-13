import React from 'react'
import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const VisibilityFilter = () => {
    const dispatch = useDispatch()
    const filteredSelected = (value) => {
        console.log(value)
      }
  return (
    <div>
        <label htmlFor='all'>
          <input 
            id='all' 
            type='radio' 
            name='filter' 
            onChange={() => dispatch(filterChange('ALL'))}
            defaultChecked
          />
            all
          </label>
        <label htmlFor='important'>
          <input 
            id='important' 
            type='radio' 
            name='filter' 
            onChange={() => dispatch(filterChange('IMPORTANT'))}
          />
            important
          </label>
        <label htmlFor='nonimportant'>
          <input 
            id='nonimportant' 
            type='radio' 
            name='filter' 
            onChange={() => dispatch(filterChange('NONIMPORTANT'))}
          />
            nonimportant
          </label>
      </div>
  )
}

export default VisibilityFilter