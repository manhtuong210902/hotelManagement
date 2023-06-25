const Bill = require("../models/bill.m");
const RentalCard = require("../models/rentalCard.m")
const { ObjectId } = require('mongodb');
class bookController {

    async createRentalCard(req, res, next) {
        try {
            const newBill = new RentalCard( req.body)

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

    async createBill(req, res, next) {
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

    async getBills(req, res) {
      const {id} = req.body;
      const objID = new ObjectId(id)

      Bill.aggregate([
          {
            $lookup: {
              from: 'rentalcards',
              localField: 'rentalCard',
              foreignField: '_id',
              as: 'bill_rental'
            }
          },
          {
            $match: {
              'bill_rental.user': objID 
            }
          }
      ])
      .then(bills => {
          return res.json({
            success: true,
            bills,
        });
      })
      .catch(error => {
          console.log(error);
          res.status(500).json({
              success: false,
              message: "Internal server error",
          });
      });

    }

    async getRentalCardsActive(req, res) {
      const {id} = req.body;
      const objID = new ObjectId(id)
      try {
        const cursor = RentalCard.aggregate([
          {
            $lookup: {
              from: 'rooms',
              localField: 'room',
              foreignField: '_id',
              as: 'room_rental'
            }
          },
          { 
            $match : { 
              user : objID,
              status: true,
            } 
          },
          {
            $project: {
              number: '$room_rental.number',
              arrivalDate: '$arrivalDate',
              numDays: '$numDays',
              id: '$_id'
            }
          }
        ])
        async function processDocuments() {
          try {
            let res = []
            for await (const doc of cursor) {
              res.push(doc)
            }
            
            return res            
          } catch (err) {
            console.error('Lỗi khi truy vấn dữ liệu:', err);
          }
        }
        
        processDocuments().then(rentalCards => {
          return res.json({
              success: true,
              rentalCards,
          });
        })
      
      } catch (error) {
          console.log(error);
          res.status(500).json({
              success: false,
              message: "Internal server error",
          });
      }
    }

    async getRentalCardsCanceled(req, res) {
      const {id} = req.body;
      const objID = new ObjectId(id)
      try {
        const cursor = RentalCard.aggregate([
          {
            $lookup: {
              from: 'rooms',
              localField: 'room',
              foreignField: '_id',
              as: 'room_rental'
            }
          },
          { 
            $match : { 
              user : objID,
              status: false,
            } 
          },
          {
            $project: {
              number: '$room_rental.number',
              arrivalDate: '$arrivalDate',
              createdAt: '$createdAt',
              cancelAt: '$cancelAt',
              cancelBy: '$cancelBy', 
              id: '$_id'
            }
          }
        ])
        async function processDocuments() {
          try {
            let res = []
            for await (const doc of cursor) {
              res.push(doc)
            }
            return res            
          } catch (err) {
            console.error('Lỗi khi truy vấn dữ liệu:', err);
          }
        }
        
        processDocuments().then(rentalCards => {
          return res.json({
              success: true,
              rentalCards,
          });
        })
      
      } catch (error) {
          console.log(error);
          res.status(500).json({
              success: false,
              message: "Internal server error",
          });
      }
    }

    async getRentalCard(req, res) {
      const {id} = req.body;
      try {
        const rentalCard = await RentalCard.find({_id: id});
        return res.json({
            success: true,
            rentalCard,
        });
      } catch (error) {
          console.log(error);
          res.status(500).json({
              success: false,
              message: "Internal server error",
          });
      }
    }

    async deleteAllBill(req, res) {
      await Bill.deleteMany()
    }

    async cancelRental(req, res) {
      try {
        const rental = req.body
        const rentalUpdate = await RentalCard.updateOne({'_id':rental._id},{'status': false, 'cancelAt' : rental.cancelAt, 'cancelBy' : rental.cancelBy })
        const newRental = await RentalCard.findById(rental._id)
        
        if(newRental)
          return res.json({
              success: true,
              newRental
          });

      } catch (error) {
          console.log(error);
          res.status(500).json({
              success: false,
              message: "Internal server error",
          });
      }
    }

    async updateBill(req, res) {
      try {
        const rental = req.body.bill
        const rentalUpdate = await Bill.updateOne({'_id':rental._id},{'paymentMethod': 'paypal','isPaid' : true, 'paidAt': new Date(), 'paymentResult': rental.paymentResult})
        const updateBill = await Bill.findById(rental._id)
        
        if(updateBill)
          return res.json({
              success: true,
              updateBill 
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

module.exports = new bookController();
