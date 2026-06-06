const Log = require("../models/Log");
const detectThreat = require("../services/detectionEngine");

// ADD LOG + REALTIME PUSH
exports.addLog = async (req, res) => {
    try {
        const log = await Log.create(req.body);

        // SOC detection engine
        await detectThreat(log);

        // 🔥 REAL-TIME LOG SEND TO DASHBOARD
        global.io.emit("new-log", log);

        res.status(201).json(log);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET LOGS
exports.getLogs = async (req, res) => {
    try {
        const logs = await Log.find();
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    console.log("LOG RECEIVED:", req.body);
};