import { useState } from "react";
import ClientList from "../components/ClientList";
import TaskList from "../components/TaskList";
import "../styles/dashboard.css";

function Dashboard() {
  const [selectedClient, setSelectedClient] = useState(null);

  return (
    <div className="app-container">
      {/* Header */}
      <div className="header">
        <h2>Mini Compliance Tracker</h2>
      </div>

      <div className="dashboard">
        <div className="sidebar">
          <ClientList
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient}
          />
        </div>

        <div className="main">
          <TaskList selectedClient={selectedClient} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;