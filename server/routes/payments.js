const express = require("express");
const router = express.Router()
const billController = require("../controllers/book.c");

router.get('/config', (req, res) => {
  return res.status(200).json({
    status: 'OK',
    data: process.env.CLIENT_ID
  })
})

router.post("/my-server/create-paypal-order", billController.createPaypalOrder);
router.post("/my-server/capture-paypal-order", billController.capturePaypalOrder);


module.exports = router