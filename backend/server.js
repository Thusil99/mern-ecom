/* Include API entry points */
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import path from "path";

dotenv.config();

const app = express();

const __dirname = path.resolve();

app.use(express.json()); // Works as middleware which is a function that is run when sending reponse to the client, allows us to accept JSON data in the req.body

app.use("/api/products", productRoutes);

//This code lines does the following:
//1. Check if the environment is production
//2. If it is, then serve the frontend/build folder and make it static and render the index.html file
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
