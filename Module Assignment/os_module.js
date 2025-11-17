// Print operating system information such as platform, CPU architecture,
// and total memory using the os module.

//? Os Module
const os = require("os");

console.log(os.platform());
console.log(os.arch());
console.log(os.totalmem());
