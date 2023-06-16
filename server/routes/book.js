const express = require("express");
const router = express.Router();
const authenToken = require("../middlewares/auth");
const bookController = require("../controllers/book.c");

//booking
router.post("/create-rental-card", authenToken, bookController.createRentalCard);
router.post("/create-bill",authenToken, bookController.createBill);
router.post("/bills", bookController.getBills);
router.post("/rental-cards", bookController.getRentalCardsActive);
router.post("/rental-cards-canceled", bookController.getRentalCardsCanceled);
router.post("/get-rental-card", bookController.getRentalCard);
router.post("/cancel-rental-card", bookController.cancelRental);
router.post('/del', bookController.deleteAllBill)

module.exports = router;
