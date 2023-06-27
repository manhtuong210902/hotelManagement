const express = require("express");
const router = express.Router();
//
const authenToken = require("../middlewares/auth");
const reviewController = require("../controllers/review.c");

router.post("/add", authenToken, reviewController.add);
router.get("/:id", authenToken, reviewController.getByRoomId);

module.exports = router;
