import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const TEAM_NAME = "THREE.JS";

export default function Home() {
  const [count, setCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    axios.get('http://localhost:5000/api/members')
      .then(res => setCount(res.data.length))
      .catch(() => {});
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

      <div className="home-hero">

        <h1 className="hero-title">
          Welcome to<br />
          <span className="highlight">{TEAM_NAME}</span>
        </h1>
        <p className="hero-subtitle">
          A unified platform to manage, track, and showcase your team members with style.
        </p>
        <div className="hero-actions">
          <Link to="/add" className="btn btn-primary">＋ Add Member</Link>
          <Link to="/view" className="btn btn-secondary">View Members →</Link>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-num">{count}</div>
            <div className="stat-label">Members</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">1</div>
            <div className="stat-label">Team</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">∞</div>
            <div className="stat-label">Potential</div>
          </div>
        </div>
      </div>
    </div>
  );
}