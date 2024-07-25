import http from 'node:http';
import { json } from './middlewares/json.js';
import { Database } from './database.js';
import { randomUUID } from 'node:crypto';
import { routes } from './routes.js';
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

// Três formas do front-end enviar informações
// 1. Query Params: parâmetros nomeados enviados no endereço da requisição após "?" (Filtros, paginação - Não obrigatórios)
// Exemplo: http://localhost:3333/users?name=Daniel&age=25
// 2. Route Params: parâmetros utilizados para identificar recursos
// Exemplo: http://localhost:3333/users/1
// 3. Request Body: Corpo da requisição, utilizado para criar ou alterar recursos (usado para envio de informações)


const server = http.createServer(async (req, res) => {
    const { url, method } = req;

    await json(req, res)
    const route = routes.find(route => {
        if (route.method === method && route.path instanceof RegExp) {
            return route.path.test(url)
        } else if (typeof route.path === 'string') {
            const regex = (route.method === method && route.path === url)
            return regex
        }
        return false
    })

    if(route){
        const routeParams = req.url.match(route.path)

        req.params = { ...routeParams.groups}

        return route.handler(req, res)
    }


    return res.writeHead(404).end()


    
})

server.listen(3333, () => {
    console.log('Server is running on port 3333')
})