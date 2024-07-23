import { Database } from './database.js';
import { randomUUID } from 'node:crypto';
const database = new Database()


export const routes = [
    {
        method: 'GET',
        path: '/users',
        handler: async (req, res) => {
            const users = database.select('users')
            return res
                .end(JSON.stringify(users))
        }


    },
    {
        method: 'POST',
        path: '/users',
        handler: async (req, res) => {
            const { name, email } = req.body
            const user = ({
                id: randomUUID(),
                name: name,
                email: email,
            })

            database.insert('users', user)

            return res.writeHead(201).end()
        }
    },

    {
        method: 'DELETE',
        path: '/users/:id',
        handler: (req, res) => {

        }

    }




]