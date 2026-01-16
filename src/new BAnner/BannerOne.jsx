import React, { useState } from "react";
import "./BannerOne.css";
import { Link } from "react-router-dom";

const BannerOne = () => {
  const [imageError, setImageError] = useState(false);
  
  // Generate decorative dots
  const dots = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
  }));

  return (
    <section className="banner-one" aria-label="Hero banner">
      <div className="content">
        <h1 className="head">
          Transform Your Learning
          <span className="highlight"> Experience</span>
        </h1>
        <p className="para">
          Elevate your skills with expert-led courses, practical assignments,
          and personalized guidance. Education tailored for real-world success.
        </p>
        <Link to="/assignments" className="button-link">
          <button className="get" aria-label="Begin your learning journey">
            Start Learning Free
            <svg className="arrow-icon" width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M4.16666 10H15.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 4.16666L15.8333 10L10 15.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </Link>
        
        <div className="features-list">
          <div className="feature-item">
            <div className="feature-check">✓</div>
            Expert Instructors
          </div>
          <div className="feature-item">
            <div className="feature-check">✓</div>
            Hands-on Projects
          </div>
          <div className="feature-item">
            <div className="feature-check">✓</div>
            Career Support
          </div>
        </div>
      </div>
      
      <div className="image-area">
        <div className="dots">
          {dots.map(dot => (
            <div 
              key={dot.id} 
              className="dot"
              style={{ top: dot.top, left: dot.left }}
            />
          ))}
        </div>
        <div className="background-shape" aria-hidden="true"></div>
        
        <div className="image-frame">
          {!imageError ? (
            <img
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/af063799-0f61-47bb-ae33-5b2474996394.png"
              alt="Smiling student in modern learning environment"
              className="main-img"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="image-fallback">
              <div className="fallback-content">
                <span role="img" aria-label="Graduation cap">🎓</span>
                <p>Ready to Learn</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="floating-badge">
          <div className="badge-text">500+ Courses</div>
        </div>
      </div>
    </section>
  );
};

export default BannerOne;