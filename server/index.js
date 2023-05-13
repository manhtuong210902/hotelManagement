const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const dotenv = require("dotenv");
const routes = require("./routes");
const app = express();

dotenv.config();

app.use(express.static("public"));
//to using req.body
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

//to comunicate with front-end
app.use(
    cors({
        origin: "http://localhost:3000",
    })
);

//connect to database
db.connnect();

const PORT = 5001;

routes(app);

app.listen(PORT, () => {
    console.log(`Server running`);
});
