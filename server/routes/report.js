const express = require("express");
const router = express.Router();
//
const authenToken = require("../middlewares/auth");
const reportController = require("../controllers/report.c");

router.post("/revenue", authenToken, reportController.generateRevenueReportByRoom);
router.post("/density", authenToken, reportController.generateOccupancyReport);

module.exports = router;
