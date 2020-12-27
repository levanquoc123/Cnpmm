const express = require("express");
const router = express.Router();

// const { body } = require("express-validator");

// const User = require('../models/userModel');
// const isAuth = require('../middleware/authMiddleware');

const { verifySignUp } = require("../middleware");

const {
  signUp,
  signIn,
  signOut,
  forgotPassword,
  resetPassword,
  confirmationPost,
  resendTokenPost,
  getHomeAll,
} = require("../controllers/authController");

const {
  userSignupValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("../validator");

router.get("/test/all", getHomeAll);

router.post("/signup", userSignupValidator, signUp);
router.post("/signin", signIn);
router.get("/signout", signOut);

router.put("/forgot-password", forgotPasswordValidator, forgotPassword);
router.put("/reset-password", resetPasswordValidator, resetPassword);

router.post("/confirmation", confirmationPost);
router.post("/resend", resendTokenPost);

// router.post(
//   "/auth/signup",
//   [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
//   signUp
// );

// router.post("/auth/signin", signIn);

// module.exports = function(app) {
//   app.use(function(req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });

// };

// router.post(
//   "/signup",
//   // [
//   //   body("email")
//   //     .isEmail()
//   //     .withMessage("Please enter a valid email.")
//   //     .custom((value, { req }) => {
//   //       return User.findOne({ email: value }).then((userDoc) => {
//   //         if (userDoc) {
//   //           return Promise.reject("E-Mail address already exists!");
//   //         }
//   //       });
//   //     })
//   //     .normalizeEmail(),
//   //   body("password").trim().isLength({ min: 5 }),
//   //   body("name").trim().not().isEmpty(),
//   // ],
//   userSignupValidator,
//   authController.signUp
// );

// router.post('/login', authController.signIn);

// router.get('/status', isAuth, authController.getUserStatus);

// router.patch(
//   '/status',
//   isAuth,
//   [
//     body('status')
//       .trim()
//       .not()
//       .isEmpty()
//   ],
//   authController.updateUserStatus
// );

module.exports = router;
