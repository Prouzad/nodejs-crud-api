import http from 'http'
import 'dotenv/config'
import {
  changeUser,
  createUsers,
  deleteUser,
  getAllUsers,
  getUser,
} from './controllers/usersController'

const server = http.createServer((req, res) => {
  const id = req.url && req.url.split('/')[3]

  res.setHeader('Content-Type', 'application/json')

  if (req.url === '/api/users' && req.method === 'GET') {
    getAllUsers(req, res)
  } else if (req.url === `/api/users/${id}` && req.method === 'GET') {
    getUser(req, res, id)
  } else if (req.url === '/api/users' && req.method === 'POST') {
    createUsers(req, res)
  } else if (req.url === `/api/users/${id}` && req.method === 'DELETE') {
    deleteUser(req, res, id)
  } else if (req.url === `/api/users/${id}` && req.method === 'PUT') {
    changeUser(req, res, id)
  } else {
    res.statusCode = 404
    res.end(
      JSON.stringify({
        message: 'Route Not Found: Please use the api/users endpoint',
      }),
    )
  }
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = server
