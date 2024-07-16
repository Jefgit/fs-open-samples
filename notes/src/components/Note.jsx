export const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return(
    <li className='note' key={note.id}>
      <span>{note.content}</span>
      <button onClick={() => toggleImportance(note.id)}>{label}</button>
    </li>
  )
}