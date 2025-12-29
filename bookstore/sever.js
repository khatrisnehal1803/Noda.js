import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import bookRoutes from "./routes/Book.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/books", bookRoutes);

const PORT = 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
