// Get the absolute path of the current file using the path module.
// Display only the file name and its extension using the path module.
//? path Module
const path = require("path");

console.log(path.basename(__filename));
console.log(path.basename(__dirname));
console.log(path.extname(__filename));
