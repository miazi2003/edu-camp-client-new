import React, { useState } from "react";
import "./BannerTwo.css";
import { Link } from "react-router-dom";

const BannerTwo = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="banner-two" aria-label="Learning empowerment section">
      <div className="text-area">
        <div className="header-section">
          <span className="eyebrow">Elevate Your Career</span>
          <h1 className="head2">
            Master Skills with
            <span className="highlight"> Expert</span> Courses
          </h1>
        </div>
        
        <p className="para2">
          Transform your career with 500+ expert-led courses, hands-on projects, 
          and dedicated career support—all in one modern platform.
        </p>

           <div className="cta-container">
          <Link to="/assignments" style={{ textDecoration: 'none' }}>
            <button 
              className="explore" 
              aria-label="Explore our course catalog"
            >
              Start Learning Free
              <svg className="arrow-icon" width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M4.16666 10H15.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 4.16666L15.8333 10L10 15.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </Link>
        </div>
        
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">✓</div>
            <span>Industry Experts</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon">✓</div>
            <span>Live Projects</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon">✓</div>
            <span>Certifications</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon">✓</div>
            <span>Career Support</span>
          </div>
        </div>
        
     
      </div>
      
      <div className="image-area">
        <div className="image-container">
          <div className="image-frame">
            {!imageError ? (
              <img
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/dfd9b2b3-0feb-441d-9d5e-94f92cc32965.png"
                alt="Smiling young professional at modern workspace"
                className="main-img"
                loading="lazy"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="image-fallback" aria-label="Professional illustration placeholder">
                <div className="fallback-content">
                  <span role="img" aria-label="Professional icon">👨‍💼</span>
                  <p>Ready to Learn</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="floating-badge">
            <div className="badge-content">
              <span className="badge-text">98%</span>
              <span className="badge-label">Success Rate</span>
            </div>
          </div>
          
          <div className="floating-testimonial">
            <div className="testimonial-avatar">AS</div>
            <div className="testimonial-text">
              "Career transformed in 6 months"
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerTwo;