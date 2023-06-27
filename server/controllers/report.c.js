const Bill = require("../models/bill.m");
const RentalCard = require("../models/rentalCard.m");
const Room = require("../models/room.m");

class reportController {
    async generateRevenueReport(req, res, next) {
        const { startDay, endDay } = req.body;
        try {
            // Tìm các hóa đơn trong khoảng thời gian startDay đến endDay
            const bills = await Bill.find({
                paidAt: { $gte: startDay, $lte: endDay },
            });

            // Tính tổng doanh thu
            let totalRevenue = 0;
            bills.forEach((bill) => {
                totalRevenue += bill.totalPrice;
            });

            // In báo cáo
            return res.json({
                success: true,
                totalRevenue,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    async generateRevenueReportByRoom(req, res, next) {
        const { startDay, endDay } = req.body;
        try {
            const result = await Bill.aggregate([
                {
                    $match: {
                        isPaid: true,
                        paidAt: { $gte: new Date(startDay), $lte: new Date(endDay) },
                    },
                },
                {
                    $lookup: {
                        from: "rentalcards",
                        localField: "rentalCard",
                        foreignField: "_id",
                        as: "rentalCardInfo",
                    },
                },
                {
                    $unwind: "$rentalCardInfo",
                },
                {
                    $lookup: {
                        from: "rooms",
                        localField: "rentalCardInfo.room",
                        foreignField: "_id",
                        as: "roomInfo",
                    },
                },
                {
                    $unwind: "$roomInfo",
                },
                {
                    $group: {
                        _id: "$rentalCardInfo.room",
                        totalRevenue: { $sum: "$totalPrice" },
                        room: { $first: "$roomInfo.number" },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        room: 1,
                        totalRevenue: 1,
                    },
                },
            ]);

            // In báo cáo
            return res.json({
                success: true,
                result,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    async generateOccupancyReport(req, res, next) {
        const { startDay, endDay } = req.body;
        try {
            const rooms = await Room.find({});
            const report = [];

            for (const room of rooms) {
                const totalUsage = await RentalCard.countDocuments({
                    room: room._id,
                    arrivalDate: { $gte: new Date(startDay), $lte: new Date(endDay) },
                });

                report.push({
                    room: room.number,
                    totalUsage,
                });
            }
            // In báo cáo
            return res.json({
                success: true,
                report,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }
}

module.exports = new reportController();
