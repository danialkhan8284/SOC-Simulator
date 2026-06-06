const Alert = require("../models/Alert");

// GET ALERTS
exports.getAlerts = async (req, res) => {
    try {
        const alerts = await Alert.find().sort({ timestamp: -1 });
        res.json(alerts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};