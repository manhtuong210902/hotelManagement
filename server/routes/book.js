const express = require("express");
const router = express.Router();
const authenToken = require("../middlewares/auth");
const bookController = require("../controllers/book.c");

//booking
router.post("/create-rental-card", authenToken, bookController.createRentalCard);
router.post("/create-bill", authenToken, bookController.createBill);
router.post("/bills", bookController.getBills);
router.post("/rental-cards", bookController.getRentalCardsActive);
router.post("/rental-cards-canceled", bookController.getRentalCardsCanceled);
router.post("/get-rental-card", bookController.getRentalCard);
router.post("/cancel-rental-card", bookController.cancelRental);
router.post("/del", bookController.deleteAllBill);
router.post("/update-bill", bookController.updateBill);
router.post("/update-bill-by-emp", bookController.updateBillByEmp);
router.post("/get-bill-by-id", bookController.getBillById);
router.post("/check-in", bookController.checkIn);
router.post("/check-out", bookController.checkOut);
router.post("/check-booking", bookController.checkBooking);
router.post("/get-rental-check-in", bookController.getRentalCardCheckIn);
router.post("/get-rental-check-in-today", bookController.getRentalCardCheckInToday);
router.post("/get-rental-check-out", bookController.getRentalCardCheckOut);
router.post("/get-rental-check-all", bookController.checkBooking);

module.exports = router;
