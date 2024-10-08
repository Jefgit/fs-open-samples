import React from 'react'
import PropTypes from 'prop-types'

export const LoginForm = ({
  handleLogin,
  username,
  password,
  setPassword,
  setUsername
}) => {
  return (
    <form onSubmit={ handleLogin }>
      <div>
        username
        <input
          data-testid='username'
          type='text'
          value={ username }
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          data-testid='password'
          type='password'
          value={ password }
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
}
