const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
    ip: String,
    type: String,
    severity: {
        type: String,
        default: "medium"
    },
    message: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Alert", alertSchema);