import http from 'node:http';
import { json } from './middlewares/json.js';
import { Database } from './database.js';
import { randomUUID } from 'node:crypto';
// Métodos HTTP
// GET: Buscar informações do back-end
// POST: Criar uma informação no back-end
// PUT/PATCH: Alterar uma informação no back-end
// DELETE: Deletar uma informação no back-end

// Cabeçalhos/Headers: Metadados da requisição
// Corpo da requisição/Request Body: Conteúdo da requisição


//HTTP Status Code:
// 1xx: Informação
//   100: Continue
//   101: Switching Protocols
// 2xx: Sucesso
//   200: OK
//   201: Created
// 3xx: Redirection
//   301: Moved Permanently
//   302: Moved
//   303: See Other
//   304: Not Modified
//   307: Temporary Redirect
// 4xx: Client Error
//   400: Bad Request
//   401: Unauthorized
//   403: Forbidden
//   404: Not Found
//   422: Unprocessable Entity
// 5xx: Server Error
//   500: Internal Server Error

const database = new Database()

const server = http.createServer(async (req, res) => {
    const { url, method } = req;

    await json(req, res)


    if (method === 'GET' && url === '/users') {
        const users = database.select('users')
        return res
            .end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/users'){
        const { name, email } = req.body
        const user = ({
            id: randomUUID(),
            name: name,
            email: email,
        })

        database.insert('users', user)

        return res.writeHead(201).end()
    }

    return res.writeHead(404).end()


    
})

server.listen(3333)