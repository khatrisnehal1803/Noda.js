// Create a basic HTTP server that returns “Server is Running Successfully”.
// Create a server that writes the current date and time in a file every time a GET request is received.
// Create a logger module that saves all console messages to a log.txt file.
// Create a custom module to count the number of words in a given text.
// Create a date utility module that exports today’s date and current time.
// Create a custom module to generate a random number between a given range.
// Create a module that checks if a file exists before performing read/write operations.
// Combine all above modules in one project and use them together in a single app.js file.

const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-Type": "text/plain" });
  res.end("Server is Running successfully");
});

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});

// Create a server that returns JSON data when accessed from the browser.

const server1 = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ employees: employees }));
});

server1.listen(3000, () => {
  console.log("server is running on 3000");
});

const employees = [
  {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    isManager: false,
    skills: ["JavaScript", "Python", "SQL"],
  },
  {
    firstName: "Anna",
    lastName: "Smith",
    age: 28,
    isManager: true,
    skills: ["Java", "C++"],
  },
  {
    firstName: "Peter",
    lastName: "Jones",
    age: 35,
    isManager: false,
    skills: ["HTML", "CSS", "JavaScript"],
  },
];
