const userRouter = require("./user");
const roomRouter = require("./room");

function routes(app) {
    app.use("/api/user", userRouter);
    app.use("/api/rooms", roomRouter);
}

module.exports = routes;
