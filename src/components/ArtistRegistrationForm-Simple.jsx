import React, { useState } from 'react';

/**
 * Artist Registration Form Component
 * Submits directly to WordPress - data saved in WordPress database only
 */
const ArtistRegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    artist_name: '',
    content_type: '',
    website: '',
    bio: '',
    social_media: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  // ⚠️ CHANGE THIS to your actual WordPress site URL
  const WORDPRESS_URL = 'https://api.awksion.ai';
  const API_ENDPOINT = `${WORDPRESS_URL}/wp-json/artist-form/v1/submit`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Submission failed');
      }

      setStatus({ loading: false, success: true, error: null });
      
      // Reset form
      setFormData({
        email: '',
        artist_name: '',
        content_type: '',
        website: '',
        bio: '',
        social_media: ''
      });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 5000);

    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        error: error.message || 'Something went wrong. Please try again.'
      });
    }
  };

  return (
    <div className="artist-form-container">
      <h2>Artist Registration</h2>
      
      {status.success && (
        <div className="success-message">
          ✓ Thank you! Your registration has been submitted successfully.
        </div>
      )}

      {status.error && (
        <div className="error-message">
          ✗ {status.error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="artist-form">
        <div className="form-group">
          <label htmlFor="email">
            Email Address <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="artist@example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="artist_name">
            Artist Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="artist_name"
            name="artist_name"
            value={formData.artist_name}
            onChange={handleChange}
            required
            placeholder="Your artist or band name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content_type">
            Content Type <span className="required">*</span>
          </label>
          <select
            id="content_type"
            name="content_type"
            value={formData.content_type}
            onChange={handleChange}
            required
          >
            <option value="">Select content type...</option>
            <option value="music">Music</option>
            <option value="video">Video</option>
            <option value="podcast">Podcast</option>
            <option value="visual-art">Visual Art</option>
            <option value="photography">Photography</option>
            <option value="writing">Writing</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://yourwebsite.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="social_media">Social Media Handle</label>
          <input
            type="text"
            id="social_media"
            name="social_media"
            value={formData.social_media}
            onChange={handleChange}
            placeholder="@yourhandle or link to profile"
          />
        </div>

        <div className="form-group">
          <label htmlFor="bio">Brief Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="4"
            placeholder="Tell us about yourself and your work..."
          />
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={status.loading}
        >
          {status.loading ? 'Submitting...' : 'Submit Registration'}
        </button>
      </form>

      <style jsx>{`
        .artist-form-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 2rem;
        }

        .artist-form {
          background: #fff;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #333;
        }

        .required {
          color: #e74c3c;
        }

        input,
        select,
        textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
          transition: border-color 0.3s;
          font-family: inherit;
        }

        input:focus,
        select:focus,
        textarea:focus {
          outline: none;
          border-color: #3498db;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
        }

        textarea {
          resize: vertical;
          min-height: 100px;
        }

        .submit-button {
          width: 100%;
          padding: 1rem;
          background: #3498db;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s;
        }

        .submit-button:hover:not(:disabled) {
          background: #2980b9;
        }

        .submit-button:disabled {
          background: #95a5a6;
          cursor: not-allowed;
        }

        .success-message {
          padding: 1rem;
          background: #d4edda;
          border: 1px solid #c3e6cb;
          border-radius: 4px;
          color: #155724;
          margin-bottom: 1rem;
          animation: slideIn 0.3s ease;
        }

        .error-message {
          padding: 1rem;
          background: #f8d7da;
          border: 1px solid #f5c6cb;
          border-radius: 4px;
          color: #721c24;
          margin-bottom: 1rem;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 640px) {
          .artist-form-container {
            padding: 1rem;
          }
          
          .artist-form {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ArtistRegistrationForm;
