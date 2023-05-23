const Chat = require("../models/chat.m");
const Message = require("../models/message.m");

class chatController {
    //@route [GET]: api/chat
    //@desc get full chat
    //@access public
    async getFull(req, res, next) {
        try {
            const chats = await Chat.find({
                $expr: { $gt: [{ $size: "$messages" }, 1] },
            }).populate("customer");
            return res.json({
                success: true,
                chats,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    //@route [GET] :api/rooms/search?q
    //@desc: search room
    //@access private
    async searchChat(req, res, next) {
        try {
            const { q } = req.query;
            const regex = new RegExp(q, "i");

            const chats = await Chat.find({ email: regex }).populate({
                path: "customer",
            });

            return res.json({
                success: true,
                chats,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    async getMessageById(req, res, next) {
        const id = req.params.id;
        try {
            const chats = await Chat.findOne({ customer: id }).populate("messages");

            return res.json({
                success: true,
                messages: chats.messages,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    async addMessage(req, res, next) {
        const { idUser, text, role } = req.body;

        try {
            const chats = await Chat.findOne({ customer: idUser });
            const newMessage = new Message({
                idChat: chats._id,
                content: text,
                role: role,
            });

            newMessage.save();

            chats.messages.push(newMessage._id);

            chats.save();

            return res.json({
                success: true,
                newMessage,
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

module.exports = new chatController();
