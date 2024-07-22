import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumber extends Transform {
    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString()) * -1

        console.log(transformed)

        callback(null, Buffer.from(String(transformed)))
    }
}

// Todas portas de entrada e saida no node são Streams
// req => Readable Stream
// res => Writable Stream

const server = http.createServer(async (req, res) => {
    const buffers = []
    for await (const chunk of req){
        buffers.push(chunk)
    }

    const fullStream = Buffer.concat(buffers).toString()

    console.log(fullStream)
    return res.end(fullStreamContent)
    // return req
    // .pipe(new InverseNumber())
    // .pipe(res)
})

server.listen(3334)


