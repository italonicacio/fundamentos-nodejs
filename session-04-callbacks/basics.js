const {
  readFile,
  writeFile,
  write,
} = require('fs');
const { join } = require('path')


const packageJsonPath = join(__dirname, '..', 'package.json'); 
const destPath = join(__dirname, 'package.copy.json');

// sem tratamento de erro
readFile(packageJsonPath , (error, data) => {
  console.log('Terminou de ler');
  writeFile(destPath, data, (errorWrite) => {
    console.log('>> Terminou de escrever')
  });
});

const notExistsPath = join(__dirname, 'nao-existe')

// com tratamento de erro rudimentar
readFile(notExistsPath, (errorRead, data) => {
  if (!errorRead) {
    console.log('> Terminei de ler')
    writeFile(destPath, data, (errorWrite) =>{
      if (!errorWrite) {
        console.log('>> Terminei de escrever')

      }
    })
  }  
})

// com tratamento de erro: logar + early return
readFile(notExistsPath , (errorRead, data) => {
  if (errorRead) {
    console.log('> Erro de leitura', errorRead)
    return 
  }
  console.log('> Terminou de Ler')

  writeFile(destPath, data, (errorWrite) => {
    if (errorWrite) {
      console.log('>> Erro de Escrita', errorWrite)
      return
    }

    console.log('>> Terminou de escrever')

  })
})

