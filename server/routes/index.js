const userRouter = require("./user");

function routes(app) {
    app.use("/api/user", userRouter);
}

module.exports = routes;
