import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Popup from './Popup.js'
import Card from './Card.js'

const SearchResults = ({ events }) => {
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);  // Track selected event for popup
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');  // Get the search query from the URL

  useEffect(() => {
    if (query) {
      const lowerQuery = query.toLowerCase();
      const filtered = events.filter(
        (event) =>
          event.Event.toLowerCase().includes(lowerQuery) ||
          event.Description?.toLowerCase().includes(lowerQuery)
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  }, [query, events]);

  const handleCardClick = (event) => {
    setSelectedEvent(event);  // Set the clicked event for the popup
  };

  const closePopup = () => {
    setSelectedEvent(null);  // Close the popup by resetting selectedEvent
  };

  return (
    <div>
      <h2>Search Results</h2>
      {filteredEvents.length > 0 ? (
        <ul className="results-list">
          {filteredEvents.map((event, index) => (
              <Card event={event} index={index} handleCardClick={handleCardClick}/>
          ))}
        </ul>
      ) : (
        <p>No events found matching your search.</p>
      )}

      {/* Popup component to show event details */}
      {selectedEvent && (
        <Popup event={selectedEvent} onClose={closePopup} />
      )}
    </div>
  );
};

export default SearchResults;

