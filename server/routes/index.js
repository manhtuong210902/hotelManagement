const userRouter = require("./user");
const roomRouter = require("./room");
const chatRouter = require("./chat");
const paymentsRouter = require("./payments");
const bookRouter = require("./book");

function routes(app) {
    app.use("/api/user", userRouter);
    app.use("/api/rooms", roomRouter);
    app.use("/api/chats", chatRouter);
    app.use("/api/book", bookRouter);
    app.use("/", paymentsRouter);
    
}

module.exports = routes;
