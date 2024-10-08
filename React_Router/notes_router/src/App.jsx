import { useState } from 'react'
import {
  Routes, Route, Link, useParams, useNavigate, Navigate, useMatch
} from 'react-router-dom'

const Home = () => (
  <div> <h2>TKTL notes app</h2> </div>
)

const Notes = ({notes}) => (
  <div> 
    <h2>Notes</h2> 
    <ul>
      {notes.map((note) => 
          <li key={note.id}>
            <Link  to={`/notes/${note.id}`} >{note.content}</Link>
          </li>
        )}
    </ul>
    
  </div>
)

const Note = ({note}) => {
  return(
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
}

const Users = () => (
  <div>
    <h2>TKTL notes app</h2>
    <ul>
      <li>Matti Luukkainen</li>
      <li>Juha Tauriainen</li>
      <li>Arto Hellas</li>
    </ul>
</div>
)

const Login = (props) => {
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    props.onLogin('mluukkai')
    navigate('/')
  }
  return(
    <div>
    <h2>login</h2>
    <form onSubmit={onSubmit}>
      <div>
        username: <input />
      </div>
      <div>
        password: <input type='password' />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([
    
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen'
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false,
      user: 'Matti Luukkainen'
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas'
    }
  ])

  const [user, setUser] = useState(null)

  const login = (user) => {
    setUser(user)
  }

  const padding = {
    padding: 5
  }

  const match = useMatch('/notes/:id')

  const note = match 
    ? notes.find(note => note.id === Number(match.params.id)) 
    : null 
  
  return (
    <div>
      <div>
        <Link style={padding} to='/'>home</Link>
        <Link style={padding} to='/notes'>notes</Link>
        <Link style={padding} to='/users'>users</Link>
        { user 
          ? <em>{user} logged in</em>
          : <Link style={padding} to='/login'>login</Link>
        }
      </div>
      <Routes>
        <Route path='/notes' element={<Notes notes= {notes} />}/>
        <Route path='/notes/:id' element={<Note note= {note} />}/>
        <Route path='/users' element={user ? <Users/> : <Navigate replace to='/login' />}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login onLogin={login}/>} />
      </Routes>
      <footer>
        <i>Note app, Department of Computer Science 2024</i>
      </footer>
    </div>
  )
}

export default App