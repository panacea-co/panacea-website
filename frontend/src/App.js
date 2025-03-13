import React from 'react';
import './App.css';
import logo from './panacea_logo.png'; // Make sure to add your logo
import axios from 'axios';
import { useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setStatus('submitting');
      const response = await axios.post(`${API_URL}/api/waitlist`, {
        email: email
      });
      
      setStatus('success');
      setEmail(''); // Clear the input
      alert('Thank you for joining our waitlist!');
    } catch (error) {
      setStatus('error');
      console.error('Error submitting email:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
      <div className="logo">
          <img src={logo} alt="Panacea Logo" className="footer-logo" />
          <span>panacea</span>
        </div>
        {/* <div className="nav-links">
          <a href="#who">Who are we?</a>
          <a href="#features">Features</a>
        </div> */}
      </nav>

      <section className="hero">
        <h1>
          Empowering cancer patients to find<br />
          the <span className="emphasis">right support</span> at the <span className="emphasis">right time</span>
        </h1>
        <h2 className="subheading">
        <em>Your Story Matters.</em> Panacea listens, learns, and guides you toward <em>better survivorship care</em>.
        </h2>
        
        <h3 className="waitlist-heading">Join the Waitlist – Be the First to Access Panacea:</h3>
        <form onSubmit={handleSubmit} className="waitlist-form">
          <input 
            type="email" 
            placeholder="Your email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? '...' : '→'}
          </button>
        </form>
        {/* Add the arrow here */}
        <div className="scroll-arrow">
          <span>↓</span>
        </div>
      </section>

      <section className="problem">
        <h2>The Problem</h2>
        <p>
          <strong>From diagnosis to survivorship, the journey through cancer is unexpected, confusing, and extremely lonely.</strong> There exists a significant disconnect between clinical cancer care and the practical knowledge and resources necessary for patients to take care of themselves outside the hospital. Healthcare providers are often constrained by time to address the numerous quality-of-life challenges patients face after treatment. This results in patients being unaware of valuable resources, financial assistance programs, and evidence-based solutions that could significantly improve their healing journey.
        </p>
      </section>

      <section className="solution">
        <h2>Our Solution</h2>
        <p>
          <strong>Panacea</strong> is a <strong>Personal Health Navigator</strong>, connecting cancer patients with the <strong>right resources</strong> at the <strong>right time</strong>. Find <strong>support groups</strong>, <strong>financial aid</strong>, <strong>clinical trials</strong>, and <strong>wellness programs</strong> tailored to your journey.
        </p>
        
      </section>

      <footer>
        <div className="logo" style={{ justifyContent: 'center' }}>
          <img src={logo} alt="Panacea Logo" className="footer-logo" />
          <span>panacea</span>
        </div>
        <div className="contact-info">
          <a href="mailto:nicolewu@utexas.edu">nicolewu@utexas.edu</a>
        </div>
      </footer>
    </div>
  );
}

export default App;