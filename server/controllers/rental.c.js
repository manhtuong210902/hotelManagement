const Bill = require("../models/bill.m");

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

}

module.exports = new billController();
