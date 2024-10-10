import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, List } from '@mui/material';
import Popup from './Popup';
import EventCard from './Card';

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
    <Box sx={{ mt: 4 }}>
      {/* Search Results Heading */}
      <Typography variant="h5" component="h2" gutterBottom color="text.primary">
        Search Results
      </Typography>

      {filteredEvents.length > 0 ? (
        <List>
          {filteredEvents.map((event, index) => (
                <EventCard event={event} index={index} handleCardClick={handleCardClick} />
          ))}
        </List>
      ) : (
        <Typography variant="body1" color="text.secondary">
          No events found matching your search.
        </Typography>
      )}

      {/* Popup component to show event details */}
      {selectedEvent && <Popup event={selectedEvent} onClose={closePopup} />}
    </Box>
  );
};

export default SearchResults;

