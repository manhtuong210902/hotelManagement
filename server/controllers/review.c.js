const Room = require("../models/room.m");
const Review = require("../models/review.m");

class reviewController {
    //@route [POST]: api/reviews/add
    //@desc add review a room
    //@access private
    async add(req, res, next) {
        const { roomId, text, stars } = req.body;
        console.log(roomId, text);
        try {
            const room = await Room.findOne({ _id: roomId });
            if (!room) {
                return res.json({
                    success: false,
                    message: "Room not found",
                });
            }

            const newReview = new Review({
                roomId,
                text,
                stars,
                author: req.userId,
            });

            await newReview.save();

            await newReview.populate("author");

            return res.json({
                success: true,
                review: newReview,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    //@route [GET]: api/reviews/:id
    //@desc get commnet by post
    //@access private
    async getByRoomId(req, res, next) {
        const { id } = req.params;
        // const { limit = 3, skip = 0 } = req.query; // set default values for limit and skip
        try {
            const reviews = await Review.find({ roomId: id }).sort({ createdAt: -1 }).populate("author");

            return res.json({
                success: true,
                reviews,
            });
        } catch (err) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }
}

module.exports = new reviewController();
