import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import SearchResults from './SearchResults';

const App = () => {
  const [recentEvents, setRecentEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  
  // Fetch recent events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      const apiUrl = "https://script.google.com/macros/s/AKfycby44G47rIm2eTMooqC4aHyJUgRwHLoHrgjDDeEOrn6bCCsm4C2gZAlvgqmoiwiGZyBaMg/exec";
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          const events = data.results || [];
          const randomEvents = getRandomEvents(events, 5);
          console.log(randomEvents);
          setRecentEvents(randomEvents);
          setFilteredEvents(events);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setRecentEvents([]);
      }
    };

    fetchEvents();
  }, []);

  const getRandomEvents = (events, count) => {
    const shuffled = [...events].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home recentEvents={recentEvents}/>}/>
          <Route path="/search" element={<SearchResults events={filteredEvents} />}/>
      </Routes>
    </Router>
  );
};

export default App;

