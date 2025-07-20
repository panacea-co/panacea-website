import React from "react";
import "./App.css";
import logo from "./apovo.PNG"; // Make sure to add your logo
import axios from "axios";
import { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function App() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let error;
    try {
      setStatus("submitting");
      const response = await fetch(`${API_URL}/api/waitlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          phone: phone,
          email: email,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setName(""); // Clear the input
        setPhone(""); // Clear the input
        setEmail(""); // Clear the input
        alert("Thank you for joining our waitlist!");
        return;
      } else {
        error = response.text();
      }
    } catch (err) {
      error = err;
    }
    setStatus("error");
    console.error("Error submitting email:", error);
    alert("Something went wrong. Please try again.");
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Apovo Logo" className="footer-logo" />
        </div>
        {/* <div className="nav-links">
          <a href="#who">Who are we?</a>
          <a href="#features">Features</a>
        </div> */}
      </nav>

      <section className="hero">
        <h1>
          Empowering cancer patients to find
          <br />
          the <span className="emphasis">right support</span> at the{" "}
          <span className="emphasis">right time</span>
        </h1>
        <h2 className="subheading">
          <em>Your Story Matters.</em> Apovo listens, learns, and guides you
          toward <em>better survivorship care</em>.
        </h2>

        <h3 className="waitlist-heading">
          Join the Waitlist – Be the First to Access Apovo:
        </h3>
        <form onSubmit={handleSubmit} className="waitlist-form">
          <input
            type="text"
            placeholder="Your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Your phone number"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Submitting..." : "Submit"}
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
          <strong>
            From diagnosis to survivorship, the journey through cancer is
            unexpected, confusing, and extremely lonely.
          </strong>{" "}
          There exists a significant disconnect between clinical cancer care and
          the practical knowledge and resources necessary for patients to take
          care of themselves outside the hospital. Healthcare providers are
          often constrained by time to address the numerous quality-of-life
          challenges patients face after treatment. This results in patients
          being unaware of valuable resources, financial assistance programs,
          and evidence-based solutions that could significantly improve their
          healing journey.
        </p>
      </section>

      <section className="solution">
        <h2>Our Solution</h2>
        <p>
          <strong>Apovo</strong> is a <strong>Personal Health Navigator</strong>
          , connecting cancer patients with the <strong>right resources</strong>{" "}
          at the <strong>right time</strong>. Find{" "}
          <strong>support groups</strong>, <strong>financial aid</strong>,{" "}
          <strong>clinical trials</strong>, and{" "}
          <strong>wellness programs</strong> tailored to your journey.
        </p>
      </section>

      <section className="press">
        <h2>Press</h2>
        <div className="press-cards">
          <div className="press-card">
            <h3>The Daily Texan</h3>
            <p className="press-date">July 3, 2025</p>
            <a
              href="https://thedailytexan.com/2025/07/03/ut-student-creates-start-up-to-help-cancer-patients/"
              target="_blank"
              rel="noopener noreferrer"
              className="press-link"
            >
              View the news article here →
            </a>
          </div>
          <div className="press-card">
            <h3>Spectrum News</h3>
            <p className="press-date">May 12, 2025</p>
            <a
              href="https://spectrumlocalnews.com/tx/austin/news/2025/05/12/panacea-ai-nicole-wu?cid=app_share"
              target="_blank"
              rel="noopener noreferrer"
              className="press-link"
            >
              View the news article here →
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="logo" style={{ justifyContent: "center" }}>
          <img src={logo} alt="Apovo Logo" className="footer-logo" />
        </div>
        <div className="contact-info">
          <a href="mailto:nicolewu@utexas.edu">nicolewu@utexas.edu</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
