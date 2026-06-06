import { useState, useEffect } from 'react';
import './LeadsPanel.css';

export default function LeadsPanel() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/offers');
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setLeads(data.data);
        setError(null);
      } else {
        throw new Error(data.message || 'Failed to fetch leads');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredLeads = leads.filter(lead => {
    if (filter === 'all') return true;
    return lead.propertyType === filter;
  });

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/offers/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setLeads(leads.filter(lead => lead._id !== id));
        alert('Lead deleted successfully');
      } else {
        alert('Failed to delete lead');
      }
    } catch (err) {
      console.error('Error deleting lead:', err);
      alert('Error deleting lead');
    }
  };

  if (loading) {
    return <div className="leads-panel loading">Loading leads...</div>;
  }

  return (
    <div className="leads-panel">
      <div className="leads-header">
        <h1>User Leads Management</h1>
        <div className="header-actions">
          <button 
            className="refresh-btn" 
            onClick={fetchLeads}
            title="Refresh leads"
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="leads-stats">
        <div className="stat-box">
          <div className="stat-number">{leads.length}</div>
          <div className="stat-label">Total Leads</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">
            {leads.filter(l => l.propertyType === 'residential').length}
          </div>
          <div className="stat-label">Residential</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">
            {leads.filter(l => l.propertyType === 'commercial').length}
          </div>
          <div className="stat-label">Commercial</div>
        </div>
      </div>

      <div className="filter-section">
        <label>Filter by Property Type:</label>
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Properties</option>
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
        </select>
      </div>

      {filteredLeads.length === 0 ? (
        <div className="no-leads">
          <p>No leads found</p>
        </div>
      ) : (
        <div className="leads-table-container">
          <table className="leads-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Property Type</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead._id} className="lead-row">
                  <td className="name-cell">{lead.name}</td>
                  <td className="email-cell">
                    <a href={`mailto:${lead.email}`}>{lead.email}</a>
                  </td>
                  <td className="phone-cell">
                    <a href={`tel:${lead.mobileNo}`}>{lead.mobileNo}</a>
                  </td>
                  <td className="property-cell">
                    <span className={`badge badge-${lead.propertyType}`}>
                      {lead.propertyType.charAt(0).toUpperCase() + lead.propertyType.slice(1)}
                    </span>
                  </td>
                  <td className="date-cell">
                    {new Date(lead.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="actions-cell">
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => handleDelete(lead._id)}
                      title="Delete lead"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="leads-footer">
        <p>Showing {filteredLeads.length} of {leads.length} leads</p>
      </div>
    </div>
  );
}
