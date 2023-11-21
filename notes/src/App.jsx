import { useEffect, useState } from "react";
import { Note } from "./components/Note";

import noteService from './services/note'
import { Notification } from "./components/Notification";
import { Footer } from "./components/Footer";

const App = () => {
  const [notes, setNotes] = useState(null);
  const [newNote, setNewNote] = useState("a new note");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  useEffect(() => {
    console.log('effect')
    noteService
      .getAll()
      .then(
        initialNotes => {
          setNotes(initialNotes)
        }
      )
    .catch(err => (console.log(err)))
  },[])

  const toggleImportanceOf = (id) => {
    const note = notes.find(note => note.id === id)
    const changeNote = {...note, important: !note.important }

    noteService
      .update(id, changeNote)
      .then(returnedNote => {
        setNotes(notes.map(note => (note.id !== id ? note : returnedNote)))
      })
      .catch(err => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  // console.log('render', notes.length, 'notes')

  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1
    };

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes((prevNotes) => [...prevNotes, returnedNote]);
        setNewNote("");
      })
      .catch(err => console.log(err))

  };

  console.log(notes);

  // const notesList = notes
  //                   ? notes.map((note, i) => <li key={i}>{note.content}</li>)
  //                   :''

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "all" : "important"}
        </button>
      </div>
      <ul>
        {
        notesToShow
        ? notesToShow.map((note) => (
            <Note 
              key={note.id} 
              note={{ id: note.id, content: note.content, important: note.important }} 
              toggleImportance={() => toggleImportanceOf(note.id)} 
            />
        ))
        :''
      }
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
