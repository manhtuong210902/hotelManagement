const paypalApi = require('../paypal-api')

class paymentController {

    async createPaypalOrder(req, res)  {
        try {
          const order = await paypalApi.createOrder(req.body);
          
          res.json(order);
        } catch (err) {
          res.status(500).send(err.message);
        }
      }
      
    async capturePaypalOrder(req, res) {
        const { orderID } = req.body;
        
        try {
          const captureData = await paypalApi.capturePayment(orderID);
          res.json(captureData);
        } catch (err) {
          res.status(500).send(err.message);
        }
    }
    
}

module.exports = new paymentController();
