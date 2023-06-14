const express = require("express");
const router = express.Router();
//
const userController = require("../controllers/user.c");
const authenToken = require("../middlewares/auth");

router.get("/", authenToken, userController.loadUser);

router.get("/search", authenToken, userController.searchUser);

router.get("/customer", authenToken, userController.getCustomer);

router.get("/employee", authenToken, userController.getEmployee);

router.get("/:id", authenToken, userController.getUserById);

router.post("/add/employee", authenToken, userController.addEmployee);

router.delete("/delete/:id", authenToken, userController.deleteAccount);

router.put("/edit/employee/:id", authenToken, userController.updateAccount);

router.post("/register", userController.register);

router.post("/login", userController.login);

router.put("/update", authenToken, userController.update);

module.exports = router;
