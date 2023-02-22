const logCalled = () => {
  console.log('> Fui chamada')
}

setTimeout(() => {
  logCalled()
}, 1000)

setTimeout(logCalled, 1000)

const timeoutId = setTimeout(() => {
  logCalled()
  setTimeout(logCalled, 1000);
}, 3000)

clearTimeout(timeoutId)

const intervalID = setInterval(() => {
  console.log('> Chamada do intervalo')
}, 1000)

setTimeout(() => {
  clearInterval(intervalID)
}, 5000)