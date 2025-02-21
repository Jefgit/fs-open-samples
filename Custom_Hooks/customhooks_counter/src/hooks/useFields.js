import { useState } from 'react'

const useFields = (type) => {
  const [value, setValue] = useState('')

  const onChange = (e) => {
    setValue(e.target.value)
  }

  return {
    value,
    type,
    onChange,
  }
}

export default useFields
