const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth API",
      version: "1.0.0"
    }
  },
  apis: ["./src/routes/*.js"]
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
