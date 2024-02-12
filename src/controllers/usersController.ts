import http from 'http'
import { v4 as uuidv4, validate as uuidValidate } from 'uuid'
import { dataType, userType } from 'src/types'

const UUID = () => crypto.randomUUID()

const users: userType[] = [
  {
    id: uuidv4(),
    age: 23,
    username: 'Alex',
    hobbies: ['take a picture'],
  },
  {
    id: uuidv4(),
    age: 21,
    username: 'John',
    hobbies: ['take a picture'],
  },
  {
    id: uuidv4(),
    age: 43,
    username: 'Sara',
    hobbies: ['take a picture'],
  },
]

export async function getAllUsers(
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage
  },
) {
  req.on('error', err => {
    res.statusCode = 400
    res.end(JSON.stringify(err))
  })
  res.statusCode = 200
  res.end(JSON.stringify(users))
}

export async function getUser(
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage
  },
  id?: string,
) {
  const data = users.filter(item => item.id === id)
  res.statusCode = 200
  res.end(JSON.stringify(data))
}

export const createUsers = async (
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage
  },
) => {
  let body = ''
  req.on('data', data => {
    body += data
  })

  req.on('end', () => {
    const data2 = JSON.parse(body) as dataType
    const data: userType = {
      id: UUID(),
      ...data2,
    }
    console.log(!checkIsUser(data))
    if (!checkIsUser(data)) {
      res.statusCode = 400
      res.end(
        JSON.stringify({
          message: 'bad request',
        }),
      )
      return
    }
    users.push(data)
    console.log(users)
    res.statusCode = 201
    res.end(
      JSON.stringify({
        message: 'User created',
        users,
      }),
    )
  })
}

export const deleteUser = async (
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage
  },
  id?: string,
) => {
  const idx = users.findIndex(item => item.id === id)

  if (id && !uuidValidate(id)) {
    res.statusCode = 400
    res.end(
      JSON.stringify({
        message: 'INCORRECT USER ID',
      }),
    )
  } else if (idx === -1) {
    res.statusCode = 404
    res.end(
      JSON.stringify({
        message: 'USER NOT EXIST',
      }),
    )
  } else {
    users.splice(idx, 1)
    res.statusCode = 204
    res.end(
      JSON.stringify({
        message: 'success',
      }),
    )
  }
}

export const changeUser = async (
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage
  },
  id?: string,
) => {
  const idx = users.findIndex(item => item.id === id)

  const userIndex = users.findIndex(item => item.id === id)
  const check = uuidValidate(id || '')
  let body = ''
  req.on('data', chunk => {
    body += chunk.toString()
  })
  req.on('error', err => {
    res.statusCode = 400
    res.end(JSON.stringify(err))
  })
  req.on('end', () => {
    const user = JSON.parse(body)
    const check2 = checkIsUser(user)
    user.id = id

    if (!check2) {
      res.statusCode = 400

      res.end(JSON.stringify({ message: 'INCORRECT DATA' }))
      return
    }

    if (userIndex !== -1 && check === true) {
      users.splice(userIndex, 1, user)
      res.statusCode = 200
      res.end(JSON.stringify(user))
      return
    } else if (userIndex !== -1 && check === false) {
      res.statusCode = 404
      res.end(JSON.stringify({ message: 'INCORRECT FORMAT' }))
      return
    } else {
      res.statusCode = 400
      res.end(JSON.stringify({ message: 'USER NOT EXIST' }))
      return
    }
  })
}

export const checkIsUser = (user: dataType) => {
  return (
    typeof user.username === 'string' &&
    typeof user.age === 'number' &&
    Array.isArray(user.hobbies) &&
    user.hobbies.every(item => typeof item === 'string')
  )
}
