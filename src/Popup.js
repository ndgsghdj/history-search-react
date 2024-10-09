import React, { useState, useEffect } from 'react';

const Popup = ({ event, onClose }) => {
    const [formattedDescription, setFormattedDescription] = useState('');

    useEffect(() => {
        // Add line breaks after 300 characters in the event description
        if (event.Description) {
            const formattedText = addLineBreaks(event.Description, 200);
            setFormattedDescription(formattedText);
        }
    }, [event]);

    function addLineBreaks(text, limit) {
        let result = '';
        let currentLength = 0;
    
        // Define a regular expression to detect punctuation marks
        const punctuationRegex = /[.!?]$/;
    
        const words = text.split(' ');
    
        words.forEach(word => {
            currentLength += word.length + 1;
            result += word + ' ';
    
            // Check if the currentLength exceeds the limit and the word ends with a punctuation mark
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
        <div className="popup-overlay" onClick={handleOverlayClick}>
            <div className="popup-content" onClick={e => e.stopPropagation()}>
                <h2>{event.Event}</h2>
                <p><strong>Date:</strong> {event.Date}</p>
                <div dangerouslySetInnerHTML={{ __html: formattedDescription }} />
                <button className="close-popup" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Popup;

