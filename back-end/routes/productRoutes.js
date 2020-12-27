const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const productController = require("../controllers/productController");
// const isAuth = require('../middleware/authMiddleware');

// const multer = require("multer");
// var storage = multer.memoryStorage();
// var upload = multer({ storage: storage });

//middleware routes
const { getUserById } = require("../controllers/userController");
const {
  requireSignin,
  isAdmin,
  isAuth,
} = require("../controllers/authController");

// Create a new Tutorial
// router.post("/", productController.create);

// Retrieve all Tutorials
router.get("/findproducts", productController.findAll);

// Retrieve all published Tutorials
router.get("/published", productController.findAllPublished);

// // Retrieve a single Tutorial with id
// router.get("/:id", productController.findOne);

// // Update a Tutorial with id
// router.put("/:id", productController.update);

// // Delete a Tutorial with id
// router.delete("/:id", productController.delete);

// // Create a new Tutorial
// router.delete("/", productController.deleteAll);

// CRUD Methods
router.get("/product/:productId", productController.read);
router.put(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  productController.updateProduct
);
router.delete(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  productController.deleteProduct
);
// router.post(
//   "/product/create/:userId",
//   requireSignin,
//   isAuth,
//   isAdmin,
//   productController.createProduct
// );

//Customed GET routes
router.get("/listproducts", productController.getProducts);
router.get("/products/:userId", requireSignin,
  isAuth,
  isAdmin,
  productController.list);
router.get("/products/search", productController.listSearch);
router.get("/products/related/:productId", productController.listRelated);
router.get("/products/categories", productController.listCategories);
router.get("/product/photo/:productId", productController.photo);

//Customed POST routes
router.post("/products/by/search", productController.listBySearch);

router.post(
  "/product/create/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  productController.createProduct
);

//run the middleware finduserById when there is a param of :userId
router.param("userId", getUserById);
router.param("productId", productController.getProductById);

// // GET /api/products
// router.get("/products", isAuth, productController.getProducts);

// // POST /api/product
// router.post(
//   "/product",
//   isAuth,
//   // [
//   //   body("title").trim().isLength({ min: 5 }),
//   //   body("content").trim().isLength({ min: 5 }),
//   // ],
//   productController.createProduct
// );

// router.get("/product/:productId", isAuth, productController.getProduct);

// router.put(
//   "/product/:productId",
//   isAuth,
//   // [
//   //   body("title").trim().isLength({ min: 5 }),
//   //   body("content").trim().isLength({ min: 5 }),
//   // ],
//   productController.updateProduct
// );

// router.delete('/product/:productId', isAuth, productController.deleteProduct);

module.exports = router;
