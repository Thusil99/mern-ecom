import express from "express";
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
router.delete("/:id", deleteProduct);

//UPDATE A PRODUCT
router.put("/:id", updateProduct);

export default router;
