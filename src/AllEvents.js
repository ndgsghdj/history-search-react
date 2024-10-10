import React, { useState } from 'react';
import { Box, Typography, List, Pagination, } from '@mui/material';
import EventCard from './components/Card';
import Popup from './components/Popup';

const AllEvents = ({ events }) => {
    const eventsPerPage = 10; // Set the number of events per page
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEvent, setSelectedEvent] = useState(null);  // Track selected event for popup

    const totalPages = Math.ceil(events.length / eventsPerPage);

    // Get the events to display for the current page
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleCardClick = (event) => {
        setSelectedEvent(event);  // Set the clicked event for the popup
    };

    const closePopup = () => {
        setSelectedEvent(null);  // Close the popup by resetting selectedEvent
    };

    return (
        <Box sx={{ mt: 4 }}>
        {/* Heading */}
        <Typography variant="h4" gutterBottom color="text.primary">
        All Historical Events
        </Typography>

        {/* Event List */}
        {currentEvents.length > 0 ? (
            <List>
            {currentEvents.map((event, index) => (
                <EventCard event={event} index={index} handleCardClick={handleCardClick} />
            ))}
            </List>
        ) : (
            <Typography variant="body1" color="text.secondary">
            No events available.
            </Typography>
        )}

        {/* Pagination Controls */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        />
        </Box>

        {/* Popup component to show event details */}
        {selectedEvent && <Popup event={selectedEvent} onClose={closePopup} />}
        </Box>
    );
};

export default AllEvents;

