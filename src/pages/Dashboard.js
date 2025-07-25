import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    try {
      const res = await axios.get('https://admin-backend-orcin-six.vercel.app/api/entries');
      setEntries(res.data);
    } catch (err) {
      console.error('Failed to fetch entries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="admin-container">
      <h1 className="admin-heading">Scratch Card Winners</h1>

      {loading ? (
        <p className="admin-loading">Loading...</p>
      ) : entries.length === 0 ? (
        <p className="admin-empty">No entries found.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Prize (₹)</th>
              <th>Claimed At</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(entry => (
              <tr key={entry.id}>
                <td>{entry.id}</td>
                <td>{entry.name}</td>
                <td>{entry.mobile}</td>
                <td>{entry.prize}</td>
                <td>{new Date(entry.claimed_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
