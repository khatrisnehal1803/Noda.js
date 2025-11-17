// Create a custom module that exports a function to print your name.
// Create a module that exports a function to add two numbers and import it in another file.
// Create a module with multiple functions: add, subtract, multiply, and divide — import all and use them.

const name = (name) => {
  console.log(name);
};

const sum = (a, b) => {
  console.log(a + b);
};

const sub = (a, b) => {
  console.log(a - b);
};

const multiply = (a, b) => {
  console.log(a * b);
};

const divide = (a, b) => {
  console.log(a / b);
};

module.exports = {
  name,
  sum,
  sub,
  multiply,
  divide,
};
