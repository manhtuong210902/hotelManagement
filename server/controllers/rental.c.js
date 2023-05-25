const Bill = require("../models/bill.m");
const {createOrder, capturePayment} = require("../paypal-api")
class billController {

    async createRentalCard(req, res, next) {
        try {
            const newBill = new Bill( req.body)

            await newBill.save();
            return res.json({
                success: true,
                newBill,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    async createPaypalOrder(req, res)  {
        try {
          const order = await createOrder();
          res.json(order);
        } catch (err) 
        {
          res.status(500).send(err.message);
        }
    }

    async capturePaypalOrder(req, res)  {
        const { orderID } = req.body;
        try {
          const captureData = await capturePayment(orderID);
          res.json(captureData);
        } catch (err) {
          res.status(500).send(err.message);
        }
      }

}

module.exports = new billController();
