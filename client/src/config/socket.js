import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "http://localhost:5001";
const socket = io(URL, {
    transports: ["websocket"],
});

export default socket;
