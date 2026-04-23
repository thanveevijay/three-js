import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const TEAM_NAME = "THREE.JS";

export default function ViewMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    axios.get('http://localhost:5000/api/members')
      .then(res => { setMembers(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <nav className="navbar">
        <Link to="/" className="nav-brand"><span>✦</span> {TEAM_NAME}</Link>
        <div className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active-nav' : ''}>Home</Link>
          <Link to="/add" className={location.pathname === '/add' ? 'active-nav' : ''}>Add Member</Link>
          <Link to="/view" className={location.pathname === '/view' ? 'active-nav' : ''}>View Members</Link>
        </div>
      </nav>

      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">Meet Our <span>Team</span></h1>
          <Link to="/add" className="btn btn-primary">＋ Add Member</Link>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p style={{ color: 'var(--muted)' }}>Loading members...</p>
          </div>
        ) : members.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <p>No members yet. Add your first team member!</p>
            <br />
            <Link to="/add" className="btn btn-primary">＋ Add Member</Link>
          </div>
        ) : (
          <div className="members-grid">
            {members.map(m => (
              <div className="member-card" key={m._id}>
                {m.image ? (
                  <img
                    src={`http://localhost:5000/uploads/${m.image}`}
                    alt={m.name}
                    className="member-avatar"
                  />
                ) : (
                  <div className="member-avatar-placeholder">
                    {m.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="member-name">{m.name}</div>
                <div className="member-role">{m.degree}</div>
                <div className="member-roll">Roll: {m.roll}</div>
                <Link to={`/member/${m._id}`} className="btn btn-outline-accent">
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}