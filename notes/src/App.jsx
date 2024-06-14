import { useEffect, useState } from "react";
import { Note } from "./components/Note";

import noteService from './services/note'
import loginService from './services/login'
import { Notification } from "./components/Notification";
import { Footer } from "./components/Footer";
import { NoteForm } from "./components/NoteForm";
import { LoginForm } from "./components/LoginForm";
import { Togglable } from "./components/Togglable";

const App = () => {
  const [notes, setNotes] = useState(null);
  const [newNote, setNewNote] = useState("a new note");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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

  useEffect(()=> {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')

    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  },[])

  const toggleImportanceOf = (id) => {
    const note = notes.find(note => note.id === id)
    const changeNote = {...note, important: !note.important }

    noteService
      .update(id, changeNote)
      .then(returnedNote => {
        console.log(returnedNote)
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

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const handleLogin = async(event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password,})

      window.localStorage.setItem(
        'loggedNoteappUser',JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      {user === null 
        ?  <Togglable buttonLabel = {'log in'}>
            <LoginForm 
              handleLogin={handleLogin} 
              username={username} 
              password={password} 
              setPassword={setPassword} 
              setUsername={setUsername}
            />
            </Togglable>
        : <div>
            <p>{user.name} logged-in</p><button type="button" onClick={handleLogout}>logout</button>
            <Togglable buttonLabel={'new note'} >
              <NoteForm 
                addNote={addNote} 
                newNote={newNote} 
                handleNoteChange={handleNoteChange} 
              />
            </Togglable>
        </div>
      }
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
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
      <Footer />
    </div>
  );
};

export default App;
