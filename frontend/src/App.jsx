import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import FeedPage from './pages/Feed';
import SubmitPage from './pages/Submit';

function App() {
  const [prices, setPrices] = useState([]);
  const [heroes, setHeroes] = useState([]);

  const fetchPrices = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/feed`);
      if (res.ok) {
        const data = await res.json();
        setPrices(data);
      } else {
        console.error("Fetch prices failed:", res.status);
      }
    } catch (e) {
      console.error("Failed to fetch prices", e);
    }
  };

  const fetchHeroes = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/leaderboard`);
      if (res.ok) {
        const data = await res.json();
        setHeroes(data);
      } else {
        console.error("Fetch heroes failed:", res.status);
      }
    } catch (e) {
      console.error("Failed to fetch leaderboard", e);
    }
  }

  useEffect(() => {
    fetchPrices();
    fetchHeroes();
    // Set up polling interval for live feel
    const interval = setInterval(() => {
      fetchPrices();
      fetchHeroes();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePriceSubmit = async (formData) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // Immediate refresh after submit
        fetchPrices();
        fetchHeroes();
        return true;
      }
    } catch (e) {
      // console.error("Submission failed", e);
      throw e;
    }
  };

  return (
    <Router>
      <div className="min-h-screen selection:bg-indigo-500 selection:text-white flex flex-col">
        <Navbar />
        <main className="flex-grow pt-4 md:pt-24 px-2 sm:px-4 lg:px-8">
          <Routes>
            <Route path="/" element={<HomePage heroes={heroes} />} />
            <Route path="/feed" element={<FeedPage prices={prices} />} />
            <Route path="/submit" element={<SubmitPage onSubmit={handlePriceSubmit} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
