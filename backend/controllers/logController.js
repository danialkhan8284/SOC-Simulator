const Log = require("../models/Log");

// ADD LOG
exports.addLog = async (req, res) => {
    try {
        const log = await Log.create(req.body);
        res.status(201).json(log);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET ALL LOGS
exports.getLogs = async (req, res) => {
    try {
        const logs = await Log.find();
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};