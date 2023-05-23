const express = require("express");
const router = express.Router();
//
const authenToken = require("../middlewares/auth");
const chatController = require("../controllers/chat.c");

router.get("/", chatController.getFull);
router.get("/search", authenToken, chatController.searchChat);
router.get("/messages/:id", authenToken, chatController.getMessageById);

router.post("/add", authenToken, chatController.addMessage);

module.exports = router;
