import http from 'node:http';

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

const users = []

const server = http.createServer((req, res) => {
    const { url, method } = req;

    if (method === 'GET' && url === '/users') {
        return res
            .setHeader('Content-Type', 'application/json')
            .end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/users'){
        users.push({
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
        })

        return res.writeHead(201).end()
    }

    return res.writeHead(404).end()


    
})

server.listen(3333)