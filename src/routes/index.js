const express = require("express");
require("dotenv").config();

const router = express.Router();

// Controller
const { addUsers, getUsers, getUser, updateUser, deleteUser } = require("../controllers/user");

const { getProduct, addProduct, getProducts, deleteProduct, updateProduct } = require("../controllers/product");

const { register, login } = require("../controllers/auth");

const { getTransactions, addTransaction } = require("../controllers/transaction");
const {
  getCategorys,
  AddCategory,
  getCategory,
  updateCategory,
} = require("../controllers/category");
const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile");

// Route User
router.post("/user", addUsers);
router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

// Route product
router.get("/product", auth, getProducts);
router.get("/product/:id", auth, getProduct);
router.post("/product", auth, uploadFile("image"), addProduct);
router.delete("/product/:id", auth, deleteProduct);
router.patch("/product/:id",auth,updateProduct)

// Route Transactions
router.get("/transactions", auth, getTransactions);
router.post("/transaction", auth, addTransaction);

// Route Category
router.get("/category", auth, getCategorys);
router.post("/category", auth, AddCategory);
router.get("/category/:id", auth, getCategory);
router.patch("/category/:id", auth, updateCategory);

// Route Register Login
router.post("/register", register);
router.post("/login", login);

module.exports = router;
