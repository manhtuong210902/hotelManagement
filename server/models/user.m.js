const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserChema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        fullname: { type: String, required: true },
        phone: { type: String },
        birthDay: { type: String },
        roles: [{ type: String, default: "User" }],
        address: { type: String },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("users", UserChema);
