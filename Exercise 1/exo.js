
const fs = require('fs')
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

fs.readFile('salut.txt','utf8',function(err,data){
    if (err) throw err
    console.log(data)
    rl.question('A toi de jouer !', (answer) => {
        
        fs.appendFile('salut1.txt',answer,function(err){
            if (err) throw err
            data += answer
        })
        console.log(`Merci d'avoir jouer !`);
        rl.close();
      });
      
});