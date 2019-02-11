const os = require('os');

// OS type & OS version
console.log('Nom : ' + os.type() + ' v' + os.release());

// OS platform
console.log('Plateforme : ' + os.platform());

// Endianness
console.log('Endianisme : ' + os.endianness());

// Total system memory
console.log('Mémoire total du système : ' + os.totalmem() + ' bytes.');

// CPU arch
console.log('Architecture : ' + os.arch());

// CPUS
console.log('CPUS : ' + JSON.stringify(os.cpus()));

// Network interfaces
console.log('Interfaces réseaux : ' + JSON.stringify(os.networkInterfaces()));
