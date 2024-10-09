import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';
import Card from './Card.js';
import Popup from './Popup.js';

const Home = ({ recentEvents }) => {
    const [filteredEvents, setFilteredEvents] = useState([]);

    const [selectedEvent, setSelectedEvent] = useState(null);  // Track selected event for popup
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    // UseEffect to update filteredEvents whenever recentEvents changes
    useEffect(() => {
        if (recentEvents && recentEvents.length > 0) {
            setFilteredEvents(recentEvents);  // Initialize with recentEvents
        }
    }, [recentEvents]);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        localStorage.setItem('theme', darkMode ? 'dark': 'light');
    }, [darkMode])

    // Function to handle search
    const handleSearch = (query) => {
        if (query) {
            const lowerQuery = query.toLowerCase();
            const filtered = recentEvents.filter(
                (event) =>
                event.Event.toLowerCase().includes(lowerQuery) ||
                event.Description?.toLowerCase().includes(lowerQuery)
            );
            setFilteredEvents(filtered);
        } else {
            setFilteredEvents(recentEvents); // Reset to all events if query is empty
        }
    };

    // Handle clicking on a card to open the popup
    const handleCardClick = (event) => {
        setSelectedEvent(event);  // Set the clicked event for the popup
    };

    // Handle closing the popup
    const closePopup = () => {
        setSelectedEvent(null);  // Close the popup by resetting selectedEvent
    };

    return (
        <div>
        <h1>GCE-O Level History Search</h1>

        <label className="switch">
        <input 
            type="checkbox" 
            checked={darkMode} 
            onChange={() => setDarkMode(!darkMode)} 
        />
        <span className="slider round"></span>
        <span className="switch-label">{darkMode ? 'Dark' : 'Light'}</span>
        </label>
        <SearchForm onSearch={handleSearch} /> {/* Pass handleSearch to SearchForm */}
        <h2>Recent Events</h2>
        {filteredEvents.length > 0 ? (
            <ul className="results-list">
            {filteredEvents.map((event, index) => (
                <Card key={index} event={event} index={index} handleCardClick={handleCardClick} />
            ))}
            </ul>
        ) : (
            <p>No recent events available.</p>
        )}

        {/* Popup component to show event details */}
        {selectedEvent && (
            <Popup event={selectedEvent} onClose={closePopup} />
        )}
        </div>
    );
};

export default Home;

