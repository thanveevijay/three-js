import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const TEAM_NAME = "THREE.JS";

export default function MemberDetails() {
  const { id } = useParams();
  const location = useLocation();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/members/${id}`)
      .then(res => { setMember(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

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
          <h1 className="page-title">Member <span>Details</span></h1>
          <Link to="/view" className="btn btn-secondary">← Back to Members</Link>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p style={{ color: 'var(--muted)' }}>Loading...</p>
          </div>
        ) : !member ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <p>Member not found.</p>
          </div>
        ) : (
          <div className="details-layout">
            <div className="details-sidebar">
              {member.image ? (
                <img
                  src={`http://localhost:5000/uploads/${member.image}`}
                  alt={member.name}
                  className="details-avatar"
                />
              ) : (
                <div className="details-avatar-placeholder">
                  {member.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="details-name">{member.name}</div>
              <div className="details-degree">{member.degree} · {member.year}</div>
            </div>

            <div className="details-main">
              <div className="detail-card">
                <div className="detail-card-title">Academic Info</div>
                <div className="detail-row">
                  <span className="detail-label">Roll Number</span>
                  <span className="detail-value">{member.roll || '—'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Degree</span>
                  <span className="detail-value">{member.degree || '—'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Year</span>
                  <span className="detail-value">{member.year || '—'}</span>
                </div>
              </div>

              <div className="detail-card">
                <div className="detail-card-title">Project & Experience</div>
                <div className="detail-row">
                  <span className="detail-label">Project</span>
                  <span className="detail-value">{member.project || '—'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Certificate</span>
                  <span className="detail-value">{member.certificate || '—'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Internship</span>
                  <span className="detail-value">{member.internship || '—'}</span>
                </div>
              </div>

              <div className="detail-card">
                <div className="detail-card-title">Personal</div>
                <div className="detail-row">
                  <span className="detail-label">About Aim</span>
                  <span className="detail-value">{member.aim || '—'}</span>
                </div>
                {member.hobbies && (
                  <div className="detail-row">
                    <span className="detail-label">Hobbies</span>
                    <span className="detail-value">
                      {member.hobbies.split(',').map((h, i) => (
                        <span key={i} className="hobby-tag">{h.trim()}</span>
                      ))}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}