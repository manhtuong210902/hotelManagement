const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const dotenv = require("dotenv");
const routes = require("./routes");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

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
const corsOptions ={
    origin: process.env.BASE_URL, 
    credentials:true,            
    optionSuccessStatus:200
  }
app.use(cors(corsOptions))
// app.use(
//     cors({
//         origin: "http://localhost:3000",
//     })
// );

const PORT = 5001;

routes(app);
//connect to database
db.connnect()
 .then(() => {

    io.on("connection", (socket) => {
        console.log("a user connected ", socket.id);

        socket.on("disconnect", () => {
            console.log("user disconnected ", socket.id);
        });

        socket.on("message", (message) => {
            console.log(message);
            io.emit("message", message);
        });
    });

    server.listen(PORT, () => {
        console.log(`Server running at port ${PORT}`);
    });

})
.catch((error) => console.log(`${error} did not connect`))