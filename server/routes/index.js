const userRouter = require("./user");
const roomRouter = require("./room");
const chatRouter = require("./chat");

function routes(app) {
    app.use("/api/user", userRouter);
    app.use("/api/rooms", roomRouter);
    app.use("/api/chats", chatRouter);
}

module.exports = routes;
