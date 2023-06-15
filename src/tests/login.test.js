import { addUsersToMongo, api, closeConnections, initialUsers } from './helper'

beforeEach(async () => {
  await addUsersToMongo()
})

describe('/login', () => {
  test('A user should be able to login, check {token, name, username}', async () => {
    const { username: initialUsername, password } = initialUsers[0]
    console.log(initialUsername)
    const loginResponse = await api.post('/login/').send({ username: initialUsername, password })
    const { name, username, token } = loginResponse.body
    expect(name).toBe(initialUsers[0].name)
    expect(username).toBe(initialUsername)
    expect(token).not.toBe(null)
  })
})

afterAll(async () => {
  await closeConnections()
})
