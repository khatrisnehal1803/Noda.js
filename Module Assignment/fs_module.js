// Create a new file and write some text inside it.
// Read the content of a file and display it in the console.
// Append new content to an existing file.
// Delete a specific file.
// Create a module that writes data to a file, and another module that reads data from the same file.

//? FS Module
const fs = require("fs");

fs.writeFileSync("index.html", "Hello, from Node.js");

const readFile = fs.readFileSync("index.html", "utf8");
console.log(readFile);

fs.appendFileSync(
  "index.html",
  "\n Node.js is an open-source, cross-platform JavaScript runtime environment"
);

try {
  fs.unlinkSync("index.html");
  console.log("file deleted successfully");
} catch (err) {
  console.log("error in deleting file", err);
}
