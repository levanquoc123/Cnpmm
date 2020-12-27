const express = require("express");
// const { body } = require("express-validator");

const router = express.Router();

const categoryController = require("../controllers/categoryController");

//middleware routes
const { getUserById } = require("../controllers/userController");
const {
  requireSignin,
  isAdmin,
  isAuth,
} = require("../controllers/authController");

// GET /api/categories
router.get("/categories", categoryController.getCategories);

router.get("/category/:categoryId", categoryController.read);

router.put(
  "/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  categoryController.updateCategory
);
router.delete(
  "/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  categoryController.deleteCategory
);

router.post(
  "/category/create/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  categoryController.createCategory
);

//run the middleware finduserById when there is a param of :userId
router.param("userId", getUserById);
router.param("categoryId", categoryController.getCategoryById);

// // POST /api/category
// router.post(
//   "/category",
//   // [
//   //   body("name").trim().isLength({ min: 5 }),
//   // ],
//   categoryController.createCategory
// );

// router.get("/category/:categoryId", isAuth, categoryController.getCategory);

// router.put(
//   "/category/:categoryId",
//   isAuth,
//   [
//     body("title").trim().isLength({ min: 5 }),
//     body("content").trim().isLength({ min: 5 }),
//   ],
//   categoryController.updateCategory
// );

// router.delete('/category/:categoryId', isAuth, categoryController.deleteCategory);

module.exports = router;
