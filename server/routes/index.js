const userRouter = require("./user");
const roomRouter = require("./room");
const chatRouter = require("./chat");
const paymentsRouter = require("./payments");

function routes(app) {
    app.use("/api/user", userRouter);
    app.use("/api/rooms", roomRouter);
    app.use("/api/chats", chatRouter);
    app.use("/", paymentsRouter);
}

module.exports = routes;
