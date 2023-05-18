const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Message = new Schema(
    {
        idChat: String,
        role: Boolean,
        content: String,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("messages", Message);
