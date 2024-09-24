/* Include API entry points */
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();

app.use(express.json()); // Works as middleware which is a function that is run when sending reponse to the client, allows us to accept JSON data in the req.body

app.use("/api/product", productRoutes);

app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});
