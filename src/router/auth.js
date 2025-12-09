const router = require("express").Router();
const authController = require("@controller/auth");


router.post("/sign-up", authController.signUpUser);
router.post("/sign-in", authController.signInUser);


module.exports = router;
