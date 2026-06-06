import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:5000");

function App() {
  const [logs, setLogs] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    socket.on("new-log", (log) => {
      setLogs((prev) => [log, ...prev]);
    });

    socket.on("new-alert", (alert) => {
      setAlerts((prev) => [alert, ...prev]);
    });

    return () => {
      socket.off("new-log");
      socket.off("new-alert");
    };
  }, []);

  return (
    <div className="dashboard">
      <h1>SOC Dashboard</h1>

      <div className="stats">
        <div className="card">
          <h2>{logs.length}</h2>
          <p>Logs</p>
        </div>

        <div className="card">
          <h2>{alerts.length}</h2>
          <p>Alerts</p>
        </div>
      </div>

      <div className="grid">
        <div className="panel">
          <h2>Live Logs</h2>

          {logs.map((log, index) => (
            <div className="log-item" key={index}>
              <strong>{log.ip}</strong>
              <span>{log.action}</span>
            </div>
          ))}
        </div>

        <div className="panel">
          <h2>Security Alerts</h2>

          {alerts.map((alert, index) => (
            <div className="alert-item" key={index}>
              <strong>{alert.type}</strong>
              <p>{alert.ip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;