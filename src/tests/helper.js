import mongoose from 'mongoose'
import supertest from 'supertest'
import { app, server } from '../src/app'
import { Note } from '../src/models/Note'
import { User } from '../src/models/User'
import bcrypt from 'bcrypt'

export const api = supertest(app)

export const closeConnections = async () => {
  await mongoose.connection.close()
  server.close()
}

export const authTestUser = async () => {
  const { username, password } = initialUsers[0]
  const loginResponse = await api.post('/login/').send({ username, password })
  const { token } = loginResponse.body
  return token
}

export const addUsersToMongo = async () => {
  await User.deleteMany({})
  for (const user of initialUsers) {
    const { name, username, password } = user
    const passwordHash = await bcrypt.hash(password, 10)
    const userObject = new User({ name, username, passwordHash })
    await userObject.save()
  }
}
export const addNotesToMongo = async () => {
  await Note.deleteMany({})
  for (const note of initialNotes) {
    const noteObject = new Note(note)
    await noteObject.save()
  }
}

export const initialUsers = [{
  name: 'name 1',
  username: 'user_test_1',
  password: '123456'
},
{
  name: 'name 2',
  username: 'user_test_2',
  password: '123456'
}]

export const newUser = {
  name: 'new name ',
  username: 'user_test_3',
  password: '123456'
}

export const initialNotes = [{
  content: 'test content 1',
  important: true
},
{
  content: 'test content 2',
  important: false
}]

export const newNote = {
  content: 'new note content',
  important: true
}
