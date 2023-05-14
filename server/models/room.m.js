const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomChema = new Schema(
    {
        number: { type: String, required: true },
        name: String,
        type: String,
        image: String,
        description: String,
        price: Number,
        capacity: Number,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("rooms", RoomChema);
