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
      <div className="gradient-blob blob-1"></div>
      <div className="gradient-blob blob-2"></div>
      <div className="gradient-blob blob-3"></div>
      
      <nav className="navbar">
      <div className="logo">
          <img src={logo} alt="Panacea Logo" className="footer-logo" />
          <span>panacea</span>
        </div>
        <div className="nav-links">
          <a href="#who">Who are we?</a>
          <a href="#features">Features</a>
        </div>
      </nav>

      <section className="hero">
        <h1>
          Empowering cancer patients to find<br />
          the <span className="emphasis">right support</span> at the <span className="emphasis">right time</span>
        </h1>
        
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
      </section>

      <section className="problem">
        <h2>The Problem ↓</h2>
        <p>
          From diagnosis to survivorship, the journey through cancer is 
          unexpected, confusing, and extremely lonely. There exists a significant 
          disconnect between clinical cancer care and the practical knowledge and 
          resources necessary for patients to take care of themselves outside the 
          hospital...
        </p>
      </section>

      <section className="solution">
        <h2>↓ Our Solution</h2>
        <p>
          Panacea empowers cancer patients in asking the right questions, finding 
          the right resources, and meeting the right people to support their health 
          journey...
        </p>
      </section>

      <section className="offerings">
        <h2>What we offer:</h2>
        <div className="offer-list">
          <div className="offer-item">wow this is great</div>
          <div className="offer-item">this is super duper cool</div>
          <div className="offer-item">woahhhhh</div>
          <div className="offer-item">what a great list</div>
        </div>
      </section>

      <footer>
        <div className="logo">
          <img src={logo} alt="Panacea Logo" className="footer-logo" />
          <span>panacea</span>
        </div>
        
      </footer>
    </div>
  );
}

export default App;