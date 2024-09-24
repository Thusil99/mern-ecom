import express from "express";
import Product from "../models/product.model.js";
import mongoose from "mongoose";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controller/product.controller.js";

const router = express.Router();

//GET ALL PRODCUTS
router.get("/", getAllProducts);

//CREATE A PRODUCT
router.post("/", createProduct);

//DELETE A PRODUCT
router.delete("/", deleteProduct);

//UPDATE A PRODUCT
router.put("/", updateProduct);

export default router;
