import { useEffect, useState } from "react";
import "../styles/clientList.css";

function ClientList({ selectedClient, setSelectedClient }) {
  const [clients, setClients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    company_name: "",
    country: "",
    entity_type: "",
  });

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchClients = async () => {
    try {
      const res = await fetch(`${API_URL}/api/clients`);
      const data = await res.json();
      setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddClient = async (e) => {
    e.preventDefault();

    if (!formData.company_name) {
      alert("Company name required");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/clients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed");

      setFormData({
        company_name: "",
        country: "",
        entity_type: "",
      });

      setShowForm(false);
      fetchClients();
    } catch (error) {
      console.error("Error adding client:", error);
    }
  };

  const filteredClients = clients.filter((client) =>
    client.company_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="client-container">
      <div className="client-header">
        <span>CLIENTS</span>
      </div>

      <input
        className="client-search"
        placeholder="Search clients..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        className="add-client-btn"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancel" : "Add Client"}
      </button>

      {showForm && (
        <form className="client-form" onSubmit={handleAddClient}>
          <input
            name="company_name"
            placeholder="Company Name"
            value={formData.company_name}
            onChange={handleChange}
          />
          <input
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
          />
          <input
            name="entity_type"
            placeholder="Entity Type"
            value={formData.entity_type}
            onChange={handleChange}
          />
          <button type="submit">Save</button>
        </form>
      )}

      <div className="client-list">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            onClick={() => setSelectedClient(client.id)}
            className={`client-item ${
              selectedClient === client.id ? "active" : ""
            }`}
          >
            <div className="client-avatar">{client.company_name[0]}</div>
            <div className="client-name">{client.company_name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClientList;