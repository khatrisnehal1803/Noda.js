const express = require("express");
const app = express();
const { swaggerUi, specs } = require("./config/swagger");

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api/auth", require("./routes/authRoutes"));

module.exports = app;
