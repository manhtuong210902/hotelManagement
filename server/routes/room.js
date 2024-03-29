const express = require("express");
const router = express.Router();
//
const authenToken = require("../middlewares/auth");
const roomController = require("../controllers/room.c");
const billController = require("../controllers/book.c");

router.get("/", roomController.getFull);
router.post("/add", authenToken, roomController.add);
router.get("/search", roomController.searchRoom);
router.get("/status", authenToken, roomController.getRoomsWithVacantStatus);
router.get("/:id", roomController.getById);
router.get("/getCheckOut", authenToken, roomController.hasCheckedOut);

router.delete("/:id", authenToken, roomController.delete);
router.put("/:id", authenToken, roomController.update);

router.post("/get-room-info", authenToken, roomController.searchRoomInfo);

module.exports = router;
