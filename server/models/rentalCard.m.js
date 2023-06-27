const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RentalCardSchema = new Schema(
    {
        //admin or customer
        booker: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
        },
        infoCus: {
            Name: { type: String },
            Email: { type: String },
            required: true,
        },
        room: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        numDays: {
            type: Number,
            required: true,
            default: 0,
        },
        arrivalDate: {
            type: Date,
            required: true,
        },
        isCheckIn: {
            type: Boolean,
            default: false,
        },
        isCheckOut: {
            type: Boolean,
            default: false,
        },
        status: {
            type: Boolean,
            default: true,
        },
        cancelBy: {
            type: String,
            default: "",
        },
        cancelAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("RentalCard", RentalCardSchema);
