import React, { useState, useEffect } from 'react';
import { Container, Typography, Switch, FormControlLabel, List } from '@mui/material';
import SearchForm from './components/SearchForm';
import EventCard from './components/Card.js';
import Popup from './components/Popup.js';
import { Box } from '@mui/material'


const Home = ({ recentEvents, darkMode, setDarkMode }) => {
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null); // Track selected event for popup

    // UseEffect to update filteredEvents whenever recentEvents changes
    useEffect(() => {
        if (recentEvents && recentEvents.length > 0) {
            setFilteredEvents(recentEvents); // Initialize with recentEvents
        }
    }, [recentEvents]);


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
        setSelectedEvent(event); // Set the clicked event for the popup
    };

    // Handle closing the popup
    const closePopup = () => {
        setSelectedEvent(null); // Close the popup by resetting selectedEvent
    };

    return (
        <Container>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h4" component="h1" color="text.primary">
        GCE-O Level History Search
        </Typography>

        <FormControlLabel
        control={
            <Switch
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            color="primary"
            />
        }
        label={darkMode ? 'Dark Mode' : 'Light Mode'}
        />
        </Box>

        {/* Search Form */}
        <Box sx={{ mb: 4 }}>
        <SearchForm onSearch={handleSearch} />
        </Box>

        {/* Recent Events */}
        <Typography variant="h5" component="h2" gutterBottom color="text.primary">
        Recent Events
        </Typography>
        {filteredEvents.length > 0 ? (
            <List>
            {filteredEvents.map((event, index) => (
                <EventCard
                key={index}
                event={event}
                index={index}
                handleCardClick={handleCardClick}
                />
            ))}
            </List>
        ) : (
            <Typography variant="body1" color="text.primary">No recent events available.</Typography>
        )}

        {/* Popup component to show event details */}
        {selectedEvent && <Popup event={selectedEvent} onClose={closePopup} />}
        </Container>
    );
};

export default Home;

