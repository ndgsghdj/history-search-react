import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';

const Popup = ({ event, onClose }) => {
    const [formattedDescription, setFormattedDescription] = useState('');

    // Access the current theme to inherit dark or light mode
    const theme = useTheme();

    useEffect(() => {
        // Add line breaks after 200 characters in the event description
        if (event.Description) {
            const formattedText = addLineBreaks(event.Description, 200);
            setFormattedDescription(formattedText);
        }
    }, [event]);

    function addLineBreaks(text, limit) {
        let result = '';
        let currentLength = 0;
        const punctuationRegex = /[.!?]$/;
        const words = text.split(' ');

        words.forEach(word => {
            currentLength += word.length + 1;
            result += word + ' ';

            // Add line breaks after the limit and punctuation marks
            if (currentLength > limit && punctuationRegex.test(word)) {
                result += '<br /><br />';
                currentLength = 0;
            }
        });

        return result;
    }

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('popup-overlay')) {
            onClose();  // Close popup if the click is on the overlay
        }
    };

    return (
        <Box 
            className="popup-overlay"
            onClick={handleOverlayClick}
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.4)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1300,
            }}
        >
            <Box 
                className="popup-content"
                onClick={e => e.stopPropagation()}
                sx={{
                    backgroundColor: theme.palette.background.paper,
                    padding: 3,
                    borderRadius: 2,
                    width: '400px',
                    boxShadow: 3,
                    color: theme.palette.text.primary,
                }}
            >
                <Typography variant="h6" gutterBottom>{event.Event}</Typography>
                <Typography variant="body2" gutterBottom><strong>Date:</strong> {event.Date}</Typography>
                <Typography 
                    variant="body1" 
                    gutterBottom 
                    dangerouslySetInnerHTML={{ __html: formattedDescription }}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={onClose}
                    sx={{ mt: 2 }}
                >
                    Close
                </Button>
            </Box>
        </Box>
    );
};

export default Popup;

