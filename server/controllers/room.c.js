const Room = require("../models/room.m");
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
}

module.exports = new roomController();
