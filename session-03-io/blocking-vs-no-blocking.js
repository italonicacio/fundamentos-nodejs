const { 
  readFileSync, writeFileSync,
  readFile, writeFile, write
} = require('fs');
const { join, } = require('path');

const logDuration = (label, startTime) => {
  console.log(`${label} levou ${Date.now() - startTime}ms`);
}


const copyFilBlocking = (source, dest) => {
  const startTime = Date.now();
  console.log('Lendo blocking conteudo');
  
  const content = readFileSync(source);

  console.log('Escrevendo Blocking conteudo');
  writeFileSync(dest, content);
  logDuration('copyFileBlocking', startTime);
}

const copyFileNonBlocking = (source, dest) => {
  const startTime = Date.now();
  console.log('Começou a copia non-blocking');
  readFile(source, (_err, data) => {
    console.log('> Terminou de ler o non-blocking');
    writeFile(dest, data, (_err) => {
      console.log('>> Terminou de escrever non-blocking');
      logDuration('>> copyFileNonBlocking', startTime);
    });
  });
}


const sourcePath = join(__dirname, 'files', 'example.txt');
const destPath = join(__dirname, 'files', 'example.copy.blocking.txt');
copyFilBlocking(sourcePath, destPath);
console.log('Copia blocking com sucesso');
console.log('');


const destPathNonBlocking = join(__dirname, 'files', 'example.copy.non-blocking.txt');
copyFileNonBlocking(sourcePath, destPathNonBlocking);
console.log('Terminou mesmo?');
console.log('Continuando', 1+1, Math.PI*Math.E,)