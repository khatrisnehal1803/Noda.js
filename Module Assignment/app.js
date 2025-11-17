// Create a custom module that exports a function to print your name.
// Create a module that exports a function to add two numbers and import it in another file.
// Create a module with multiple functions: add, subtract, multiply, and divide — import all and use them.

const { name, sum, sub, multiply, divide } = require("./math.js");

name("snehal");
sum(4, 5);
sub(10, 2);
multiply(2, 2);
divide(6, 2);
