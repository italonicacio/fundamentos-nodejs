const { promises } = require('dns')
const { EventEmitter } = require('events')
const { resolve } = require('path')

// const e = new EventEmitter()

// e.on('message', (event) => {
//   console.log('dentro do event listener', event)
// })
//   .on('message', (event) => {
//     console.log('outro listener')
//   })

// e.emit('message', { text: 'Oi' })
// e.emit('???', { text: 'Oi' })


const pingPongServer = () =>{
  const pingpong = new EventEmitter()

  pingpong.on('ping', () => {
    console.log('ping!')
    setTimeout(() => {
      pingpong.emit('pong')
    }, 1000)
  })
    .on('pong', () => {
      console.log('pong!')
      setTimeout(() => {
        pingpong.emit('ping')
      }, 1000)
    })

  pingpong.emit('ping')
}

const delay = (time) => 
  new Promise(resolve => setTimeout(resolve, time))


const pingPongServerP = async () => {

  const pingpong = new EventEmitter()

  pingpong
    .on('ping', async () => {
      console.log('ping!')
      await delay(500)
      pingpong.emit('pong')
    })
    .on('pong', async () => {
      console.log('pong!')
      await delay(500)
      pingpong.emit('ping')
    })

    pingpong.emit('ping')
    console.log('Terminou')

}

// pingPongServerP() 

const erros = async () => {
  const pingpong = new EventEmitter({
    captureRejections: true,
  })

  pingpong
    .on('ping', async () => {
      console.log('ping!')
      await delay(500)
      pingpong.emit('pong')
    })
    .on('pong', async () => {
      console.log('pong!')
      await delay(500)
      pingpong.emit('ping')
    })
    .on('error', (error) => {
      console.error('eu capturei o erro emitido via on', error.message)
    })
    .on('forceExplodeAsync', error => Promise.reject(error))

    pingpong[Symbol.for('nodejs.rejection')] = (error) => {
      console.error('eu capturei o erro emitido via propriedade', error.message)
    }

    pingpong.emit('ping')

    // await delay(2000)
    // pingpong.emit('error', Error('deu ruim depois de 2s'))

    await delay(1000)

    pingpong.emit('forceExplodeAsync', Error('deu ruim depois de 3s'))
}

erros()