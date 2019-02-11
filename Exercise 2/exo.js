const os = require ('os')

console.log("Name:"+os.hostname());
console.log("Version:"+os.release());
console.log("Platform: " + os.platform());
console.log("Architecture: " + os.arch()); 
console.log("CPU:"+ os.cpus(),'\n\n');
console.log("ram:" +os.