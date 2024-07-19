import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'
import noteService from '../services/notes'
const Note = ({note, handleClick}) => {
  return (
    <li onClick={handleClick}>
        {note.content} <strong>{note.important ? 'important' : ''}</strong>
    </li>
  )
}

const Notes = () => {
    const dispatch = useDispatch()
    const notes = useSelector(({filter, notes}) => {
      if(filter === 'ALL'){
        return notes
      }

      return filter === 'IMPORTANT'
        ? notes.filter(note => note.important)
        : notes.filter(note => !note.important)
    })
    console.log(notes)

    const handleClick = async (note) => {
      const updatedNote = {...note, important: !note.important}
      await noteService
        .toggleImportance(note.id, updatedNote)
        .then(returnedNote => {
          console.log(returnedNote)
          dispatch(toggleImportanceOf({id:note.id, note: returnedNote}))
        })
    }

    return (
        <ul>
            {notes.map(note =>
            <Note
                key = {note.id}
                note = {note}
                handleClick = {() => handleClick(note)}
            />
            )}
        </ul>
    )
  }

export default Notes