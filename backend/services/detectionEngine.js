const Alert = require("../models/Alert");
const Log = require("../models/Log");

const detectThreat = async (log) => {

    let alert = null;

    // 🔥 BRUTE FORCE DETECTION
    if (log.action === "login_failed") {

        const recentFails = await Log.find({
            ip: log.ip,
            action: "login_failed"
        });

        if (recentFails.length >= 5) {
            alert = await Alert.create({
                ip: log.ip,
                type: "Brute Force Attack",
                severity: "high",
                message: "Multiple failed login attempts detected"
            });
        }
    }

    // 🔥 UNKNOWN IP LOGIN FAILED
    if (log.action === "login_failed" && !log.ip.startsWith("192.168")) {
        alert = await Alert.create({
            ip: log.ip,
            type: "Suspicious Login",
            severity: "medium",
            message: "Login from unknown network"
        });
    }

    // 🚨 REAL-TIME ALERT PUSH
    if (alert) {
        global.io.emit("new-alert", alert);
    }
};

module.exports = detectThreat;