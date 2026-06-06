const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// database connect
connectDB();

// routes
app.use("/logs", require("./routes/logRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`SOC Server running on port ${PORT}`);
});