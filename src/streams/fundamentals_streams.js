// o que são streams?
// são fluxos de dados que podem ser lidos ou escritos

// Importação de clientes via CSV (Excel)
// Ler um arquivo de 1GB e utilizar um POST para subir para o bancco
// Demoraria muito tempo e consumiria muita memória pois o node lê o arquivo todo de uma vez

// Utilizando Streams esse processo é feito de forma mais eficiente
// O arquivo é lido em pedaços e enviado para o banco de dados

// Readable Streams: são streams que podem ser lidas (Ler Dados)
// Writable Streams: são streams que podem ser escritas (Escrever Dados)
// Transform Streams: são streams que podem transformar os dados (Transformar Dados) é utilizada no intermediário entre a stream de leitura e a strean de escrita
// Duplex Streams: são streams que podem ser lidas e escritas (Ler e Escrever Dados)
// process.stdin.pipe(process.stdout);  lê o que é digitado no terminal e escreve no terminal e o pipe faz a conexão entre os dois

import { Readable, Writable, Transform, Duplex } from 'node:stream';

class OneToHundredStream extends Readable {
    index = 1
  _read(){
    const i = this.index++
    setTimeout(() => {
        if(i > 100){
            this.push(null)
          } else {
          const buf = Buffer.from(String(i))
            this.push(buf)
          }
    }, 1000)
  }
}

class InverseNumber extends Transform {
    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString()) * -1
        callback(null, Buffer.from(String(transformed)))
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback){
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

new OneToHundredStream()
.pipe(new InverseNumber())
.pipe(new MultiplyByTenStream()) // imprime de 1 a 100 no terminal