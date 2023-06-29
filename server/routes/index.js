const userRouter = require("./user");
const roomRouter = require("./room");
const chatRouter = require("./chat");
const paymentsRouter = require("./payments");
const bookRouter = require("./book");
const reviewRouter = require("./review");
const reportRouter = require("./report");

function routes(app) {
    app.use("/api/user", userRouter);
    app.use("/api/rooms", roomRouter);
    app.use("/api/chats", chatRouter);
    app.use("/api/book", bookRouter);
    app.use("/api/reviews", reviewRouter);
    app.use("/api/report", reportRouter);
    app.use("/api/payment", paymentsRouter);
}

module.exports = routes;
