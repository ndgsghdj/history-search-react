import React from 'react';
import { Card, CardContent, Typography, CardActionArea, useTheme } from '@mui/material';

const EventCard = ({ event, index, handleCardClick }) => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark'; // Checks if dark mode is enabled

    // Limit for the description length to show in the card
    const maxDescriptionLength = 150;

    const truncatedDescription =
        event.Description && event.Description.length > maxDescriptionLength
            ? event.Description.slice(0, maxDescriptionLength) + '...'
            : event.Description;

    return (
        <Card
            key={index}
            sx={{
                marginBottom: 2,
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: isDarkMode ? '#1f1f1f' : '#fff',
                color: isDarkMode ? '#e0e0e0' : 'inherit'
            }}
            onClick={() => handleCardClick(event)}
        >
            <CardActionArea>
                <CardContent>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{ color: isDarkMode ? '#42a5f5' : 'primary.main' }}
                    >
                        <strong>{event.Event}</strong>
                    </Typography>
                    <Typography variant="body2" color={isDarkMode ? '#b0bec5' : 'text.secondary'}>
                        <strong>Date:</strong> {event.Date}
                    </Typography>
                    {event.Description ? (
                        <Typography variant="body2" color={isDarkMode ? '#e0e0e0' : 'text.primary'}>
                            {truncatedDescription}
                        </Typography>
                    ) : (
                        <Typography variant="body2" color={isDarkMode ? '#b0bec5' : 'text.secondary'}>
                            <em>No description available.</em>
                        </Typography>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default EventCard;

