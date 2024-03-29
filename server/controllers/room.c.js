const Room = require("../models/room.m");
const RentalCard = require("../models/rentalCard.m");

class roomController {
    //@route [GET]: api/rooms
    //@desc get full room
    //@access public
    async getFull(req, res, next) {
        try {
            const rooms = await Room.find({});
            return res.json({
                success: true,
                rooms,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    //@route [GET]: api/rooms/:id
    //@desc get a post by id
    //@access private
    async getById(req, res, next) {
        const roomId = req.params.id;
        try {
            const room = await Room.findOne({ _id: roomId });
            if (!room) {
                return res.json({
                    success: false,
                    message: "room not found",
                });
            }
            return res.json({
                success: true,
                room,
            });
        } catch (error) {
            console.log(error);
            return res.json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    //@route [POST] :/api/rooms/add
    //@desc: create a post
    //@access private
    async add(req, res, next) {
        const room = req.body;
        try {
            const newRoom = new Room({
                number: room.number,
                name: room.name,
                type: room.type,
                image: room.image,
                description: room?.description || "",
                price: parseInt(room.price),
                capacity: parseInt(room.capacity),
            });

            await newRoom.save();
            return res.json({ success: true, message: "create room successfully", newRoom });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    //@route [DELETE] :/api/rooms/:id
    //@desc: delete a room
    //@access private
    async delete(req, res, next) {
        try {
            const deleteRoom = await Room.deleteOne({ _id: req.params.id });

            return res.json({
                success: true,
                message: "Delete successfully",
                deleteRoom,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    //@route [PUT] :api/room/:id
    //@desc: update a room
    //@access private
    async update(req, res, next) {
        const options = req.body;
        console.log(options);
        const id = req.params.id;
        try {
            const updateRoom = await Room.updateOne({ _id: id }, options);
            console.log(updateRoom);
            return res.json({
                success: true,
                message: "update successfully",
                updateRoom,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    //@route [GET] :api/rooms/search?q
    //@desc: search room
    //@access private
    async searchRoom(req, res, next) {
        try {
            const { q } = req.query;
            const regex = new RegExp(q, "i");

            const rooms = await Room.find({
                $or: [{ name: regex }, { number: regex }, { type: regex }, { description: regex }],
            });

            return res.json({
                success: true,
                rooms,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    async searchRoomInfo(req, res, next) {
        try {
            const { id } = req.body;
            const room = await Room.find({ number: id });

            return res.json({
                success: true,
                room,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    async getRoomsWithVacantStatus(req, res, next) {
        try {
            const currentDate = new Date();

            const rooms = await Room.find();

            const roomsWithVacantStatus = [];

            for (const room of rooms) {
                const rentalCards = await RentalCard.find({ room: room._id, status: true });

                let isVacant = true;

                for (const rentalCard of rentalCards) {
                    const arrivalDate = new Date(rentalCard.arrivalDate);
                    const endDate = new Date(rentalCard.arrivalDate);
                    endDate.setDate(endDate.getDate() + rentalCard.numDays);

                    if (endDate > currentDate && currentDate > arrivalDate) {
                        isVacant = false;
                        break;
                    }
                }

                roomsWithVacantStatus.push({
                    room,
                    vacant: isVacant,
                });
            }

            return res.json({
                success: true,
                roomsWithVacantStatus,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    async hasCheckedOut(req, res, next) {
        try {
            const { roomId } = req.body;

            const checkedOutCard = await RentalCard.findOne({
                room: roomId,
                user: req.userId,
                isCheckOut: true,
            });

            res.json({ hasCheckedOut: !!checkedOutCard });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }
}

module.exports = new roomController();
