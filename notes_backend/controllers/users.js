const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('notes', {
    content: 1,
    important: 1,
  })

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const passValidation = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=]).*$/
  const isValid = password.match(passValidation)

  if (isValid) {
    const saultRounds = 10
    const passwordHash = await bcrypt.hash(password, saultRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()

    return response.status(201).json(savedUser)
  } else {
    return response.status(400).json({
      error:
        'Password must contain minimum of 8 characters, includes atleast one uppercase, lowercase letter and atleast one character',
    })
  }
})

module.exports = usersRouter
