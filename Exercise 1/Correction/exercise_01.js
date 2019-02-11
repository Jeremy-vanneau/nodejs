const fs = require('fs');
const readline = require('readline');

// Autre manière d'écrire readFile
/*fs.readFile('demo.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
*/

// Création de l'interface pour utiliser readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// On lit notre premier fichier (attention il doit déjà exister)
fs.readFile('demo.txt', 'utf8', function(err, data) {
  if (err) throw err;
  console.log('Contenu du 1er fichier : "' + data + '"');
  
  // On utilise readline pour demander une entrée à l'utilisateur
  rl.question("Qu'avez-vous à dire pour votre défense ? ", (rep) => {
  
    // On ajoute cette entrée à la fin de notre second fichier
    fs.appendFile('demo2.txt', rep, 'utf8', function(err) {
      if (err) throw err;
      console.log('On écrit dans le 2nd fichier : "' + data + rep + '"');
    });

    // On peut aussi utiliser writeFile en concaténant data et rep
    /*fs.writeFile('demo2.txt', data + rep, 'utf8', function(err) {
      if (err) throw err;
      console.log('On écrit dans le 2nd fichier : "' + data + rep + '"');
    });*/

    // A la fin, on n'oublie pas de fermer notre interface
	  rl.close();
  });
  
  
});