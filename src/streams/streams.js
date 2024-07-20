// o que são streams?
// são fluxos de dados que podem ser lidos ou escritos

// Importação de clientes via CSV (Excel)
// Ler um arquivo de 1GB e utilizar um POST para subir para o bancco
// Demoraria muito tempo e consumiria muita memória pois o node lê o arquivo todo de uma vez

// Utilizando Streams esse processo é feito de forma mais eficiente
// O arquivo é lido em pedaços e enviado para o banco de dados

// Readable Streams: são streams que podem ser lidas
// Writable Streams: são streams que podem ser escritas

// process.stdin.pipe(process.stdout);  lê o que é digitado no terminal e escreve no terminal e o pipe faz a conexão entre os dois

import { Readable } from 'node:stream';

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

new OneToHundredStream().pipe(process.stdout) // imprime de 1 a 100 no terminal