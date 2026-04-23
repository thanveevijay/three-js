import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const TEAM_NAME = "THREE.JS";

export default function AddMember() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    name: '', roll: '', year: '', degree: '',
    project: '', hobbies: '', certificate: '', internship: '', aim: '',
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.roll.trim()) errs.roll = 'Roll number is required';
    if (!form.year.trim()) errs.year = 'Year is required';
    if (!form.degree.trim()) errs.degree = 'Degree is required';
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, v));
      if (image) data.append('image', image);
      await axios.post('http://localhost:5000/api/members', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSuccess(true);
      setTimeout(() => navigate('/view'), 1500);
    } catch (err) {
      alert('Error adding member. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="page-title">Add <span>Member</span></h1>
          <Link to="/view" className="btn btn-secondary">← Back to Members</Link>
        </div>

        {success && (
          <div className="success-banner">✓ Member added successfully! Redirecting...</div>
        )}

        <div className="form-card">
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name *</label>
              <input name="name" placeholder="e.g. Dharani S" value={form.name} onChange={handleChange} />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label>Roll Number *</label>
              <input name="roll" placeholder="e.g. RA2111003010456" value={form.roll} onChange={handleChange} />
              {errors.roll && <span className="error-text">{errors.roll}</span>}
            </div>
            <div className="form-group">
              <label>Year *</label>
              <input name="year" placeholder="e.g. 2024" value={form.year} onChange={handleChange} />
              {errors.year && <span className="error-text">{errors.year}</span>}
            </div>
            <div className="form-group">
              <label>Degree *</label>
              <input name="degree" placeholder="e.g. B.Tech - CSE" value={form.degree} onChange={handleChange} />
              {errors.degree && <span className="error-text">{errors.degree}</span>}
            </div>
            <div className="form-group full-width">
              <label>About Project</label>
              <textarea name="project" placeholder="Brief description of your project..." value={form.project} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Hobbies (comma separated)</label>
              <input name="hobbies" placeholder="e.g. Coding, Reading, Gaming" value={form.hobbies} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Certificate</label>
              <input name="certificate" placeholder="e.g. AWS Cloud Practitioner" value={form.certificate} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Internship</label>
              <input name="internship" placeholder="e.g. Cloud Computing at TCS" value={form.internship} onChange={handleChange} />
            </div>
            <div className="form-group full-width">
              <label>About Your Aim</label>
              <textarea name="aim" placeholder="Your career goal or aim..." value={form.aim} onChange={handleChange} />
            </div>
            <div className="form-group full-width">
              <label>Profile Photo</label>
              <div className="file-upload-area">
                <input type="file" accept="image/*" onChange={handleImage} />
                {preview ? (
                  <img src={preview} alt="preview" className="file-preview" />
                ) : (
                  <>
                    <div className="file-upload-icon">📷</div>
                    <div className="file-upload-text">
                      <strong>Click to upload</strong> or drag and drop<br />
                      PNG, JPG, JPEG up to 5MB
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="form-actions">
            <Link to="/" className="btn btn-secondary">Cancel</Link>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Saving...' : '✓ Add Member'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}