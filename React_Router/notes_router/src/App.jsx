import { useState } from 'react'
import {
  Routes, Route, Link, useParams, useNavigate, Navigate, useMatch
} from 'react-router-dom'
import {Alert, Container, Table, TableBody, TableCell, TableContainer, TableRow, Paper, TextField, Button, Toolbar, IconButton, AppBar } from '@mui/material'

const Home = () => (
  <div> <h2>TKTL notes app</h2> </div>
)

const Notes = ({notes}) => (
  <div> 
    <h2>Notes</h2>
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
        {notes.map((note) => 
          <TableRow key={note.id}>
            <TableCell>
              <Link  to={`/notes/${note.id}`} >{note.content}</Link>
            </TableCell>
            <TableCell>
              {note.user}
            </TableCell>
          </TableRow>
        )}
        </TableBody>
      </Table> 
    </TableContainer>
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
        <TextField label="username" />
      </div>
      <div>
        <TextField label='password' type='password' />
      </div>
      <div>
      <Button variant='contained' color='primary' type="submit">login</Button>
      </div>
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
  const [notification, setNotification] = useState(null)

  const login = (user) => {
    setUser(user)

    setNotification(`welcome ${user}`)

    setTimeout(() => {
      setNotification(null)
    },5000)
  }

  const padding = {
    padding: 5
  }

  const match = useMatch('/notes/:id')

  const note = match 
    ? notes.find(note => note.id === Number(match.params.id)) 
    : null 
  
  
  return (
    <Container>
      <div className='container'>
        {(notification && <Alert severity='success'>
          {notification}
        </Alert>
          )}
        <AppBar position='static'>
          <Toolbar>
            <IconButton edge="start" color='inherit' aria-label='menu'></IconButton>
            <Button color='inherit' component={Link} to='/'>
              home
            </Button>
            <Button color='inherit' component={Link} to='/notes'>
              notes
            </Button>
            <Button color='inherit' component={Link} to='/users'>
              users
            </Button>
            {user
                  ? <em style={padding}>{user} logged in</em>
                  : <Button color='inherit' component={Link} to="/login">
                      login
                  </Button>
                }
          </Toolbar>
        </AppBar>       
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
    </Container>
    
  )
}

export default App