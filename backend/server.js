const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const socketIo = require("socket.io");

const connectDB = require("./config/db");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// HTTP server create
const server = http.createServer(app);

// SOCKET setup
const io = socketIo(server, {
    cors: {
        origin: "*"
    }
});

// make io accessible globally
global.io = io;

// when client connects
io.on("connection", (socket) => {
    console.log("🟢 SOC Dashboard connected");

    socket.on("disconnect", () => {
        console.log("🔴 SOC Dashboard disconnected");
    });
});

// ROUTES
app.use("/logs", require("./routes/logRoutes"));
app.use("/alerts", require("./routes/alertRoutes"));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`🚀 SOC Server running on port ${PORT}`);
});