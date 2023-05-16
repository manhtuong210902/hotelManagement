const express = require("express");
const router = express.Router();
//
const userController = require("../controllers/user.c");
const authenToken = require("../middlewares/auth");

router.get("/", authenToken, userController.loadUser);

router.post("/register", userController.register);

router.post("/login", userController.login);

router.put("/update", authenToken, userController.update);

module.exports = router;
