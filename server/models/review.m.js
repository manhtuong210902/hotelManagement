const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewChema = new Schema(
    {
        roomId: { type: String },
        author: { type: Schema.Types.ObjectId, ref: "users" },
        stars: { type: Number },
        text: { type: String },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("reviews", ReviewChema);
