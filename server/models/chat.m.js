const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatChema = new Schema(
    {
        customer: { type: Schema.Types.ObjectId, ref: "users" },
        messages: [{ type: Schema.Types.ObjectId, ref: "messages" }],
        lastMessage: { type: Schema.Types.ObjectId, ref: "messages" },
        email: String,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("chats", ChatChema);
