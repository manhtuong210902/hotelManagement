const express = require("express");
const router = express.Router()
const paymentController = require("../controllers/payment.c");

router.get('/config', (req, res) => {
  return res.status(200).json({
    status: 'OK',
    data: process.env.CLIENT_ID
  })
})

router.post("/my-server/create-paypal-order", paymentController.createPaypalOrder);
router.post("/my-server/capture-paypal-order", paymentController.capturePaypalOrder);


module.exports = router