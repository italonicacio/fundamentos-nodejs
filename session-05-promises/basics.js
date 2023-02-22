const { promises } = require('dns')
const {
    promises: {
        readFile,
        writeFile,
    }, write
} = require('fs')
const { join, resolve } = require('path')

// Promise: Rejected | Fulfilled

// .then((data) => {...})

// .catch((error) => {...})

const packageJsonPath = join(__dirname, '..', 'package.json')
const destPath = join(__dirname, '', 'package.copy.json')
const notExistsPath = join(__dirname, 'notexists')


// readFile(notExistsPath)
//   .catch((error) => {
//     console.error('Deu erro, to printando pra avisar, mas vou deixar subir', error.message)
//     // return '{"message": "oooops"}'
//     return Promise.reject(error)
//   })
//   .then((data) => {
//     console.log('Terminei de Ler')
//     writeFile(destPath, data)
//   })
//   .then(() => {
//     console.log('Terminei de escrever')
//   })
//   .catch((error) => {
//     console.error('Deu erro', error.message)
//   })




// Promise.resolve(
//   // Valor puro
//   // Outra Promise

// )

// let cachedContent = null

// console.log('*'.repeat(50))


// const readPackageJson = () => {
//   console.log('Vou ler o arquivo')
//   return readFile(packageJsonPath, {encoding: 'utf8' }).then(data => {
//     console.log('Eu li o arquivo')
//     cachedContent = data
//     return data
//   })
// }

// const getPackageJsonContent = () => 
//   Promise.resolve(
//     cachedContent ?? readPackageJson()
//   )


// getPackageJsonContent()
//   .then(data => console.log(data))
//   .then(() => getPackageJsonContent())
//   .then(data => console.log(data))


// const basedInCallbacks = (param, callback) => {
//   setTimeout(() => {
//     // callback(undefined, param)
//     callback(Error('de proposito'), param)
//   }, 1000);
// }

// const basedInPromises = param => 
//   new Promise((resolve, reject) => {
//     basedInCallbacks(param, (error, data) => {
//       if (error) {
//         reject(error)
//       } else {
//         resolve(data)
//       }
//     })
//   })

// basedInPromises('será mesmo?')
//   .then((data) => console.log(`${data}\né mesmo hein...`))
//   .catch((error) => console.error(`${error.message}\nmas mesmo assim ainda é promises`))


// readFile(packageJsonPath)
//   .then(
//     // só cai aqui se o readFile der certo
//     // podemos retornar valores puros
//     (data) => '\n\n\n' + data
//   )
//   .then(
//     //podemos retornar outra promise
//     (data) => writeFile(destPath, data)
//   )
//   .then(
//     () => console.log('Cópia deu certo')
//   )
//   .catch(
//     // lidando com erro
//     (error) => {
//       if (error.code === 'ENOENT') {
//         return Promise.reject(Error('>>>> Arquivo não existe'))
//       }
//       return Promise.reject(error)
//     }
//   )
//   .catch(error => {
//     // tratamento de erro -> engolindo o erro
//     console.error(error.message)
//   })
//   .finally(() => {
//     console.log('Eu rodo independente do resultado')
//   })



// Promise.all([
//   Promise.resolve(1),
//   // Promise.resolve(2),
//   Promise.reject(Error('A segunda falhou')),
//   Promise.resolve(3),

// ])
//   .then(([r1, r2, r3]) => r1 + r2 + r3)
//   .then(console.log)
//   .catch(console.error)

// multiplas promises

// Promise.allSettled([
//   Promise.resolve(1),
//   // Promise.resolve(2),
//   Promise.reject(Error('A segunda falhou')),
//   Promise.resolve(3),
// ])
//   // [{ status: 'fulFilled', value: T } | { status: 'rejected , reason: Error }]
//   .then(results => 
//     results.filter(r => r.status === 'fulfilled').map(r => r.value)  
//   )
//   .then(console.log)

// const delay = (time) => 
//   new Promise((resolve, reject) =>
//     setTimeout(resolve, time)
//   )

// Promise.race([
//   // delay(500).then(() => '500ms'),
//   delay(1000).then(() => '1s'),
//   delay(2000).then(() => '2s')

// ])
//  .then(console.log)


Promise.any([
  Promise.reject(Error('Primeiro Erro')),
  // Promise.resolve('Deu certo a segunda'),
  Promise.reject(Error('Segundo Erro')),
  Promise.reject(Error('Terceiro Erro')),
  
])
  .then(console.log)
  .catch(err => console.error('Não devo ser chamado', err.message))