const axios = require("axios");

// helper: random IP generator
const getRandomIP = () => {
    return `192.168.1.${Math.floor(Math.random() * 255)}`;
};

// helper: random action generator
const getRandomAction = () => {
    const actions = [
        "login_success",
        "login_failed",
        "file_access",
        "password_attempt"
    ];

    return actions[Math.floor(Math.random() * actions.length)];
};

// main generator loop
setInterval(async () => {

    const log = {
        ip: getRandomIP(),
        action: getRandomAction()
    };

    try {
        await axios.post("http://localhost:5000/logs", log);
        console.log("📡 Log Sent:", log);
    } catch (err) {
        console.log("❌ Error sending log:", err.message);
    }

}, 2000); // every 2 seconds