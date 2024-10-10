import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import SearchResults from './components/SearchResults';
import AllEvents from './AllEvents';

import '@fontsource/poppins';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material'

const App = () => {
    const [recentEvents, setRecentEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            background: {
                default: darkMode ? '#121212' : '#fafafa', // Sets the background color
                paper: darkMode ? '#1f1f1f' : '#fff', // Sets the card or paper background
            },
            text: {
                primary: darkMode ? '#ffffff' : '#000000', // Adjusts text colors accordingly
            }
        },
        typography : {
            fontFamily: 'Poppins, Arial, sans-serif',
        }
    });

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
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* Ensures that the whole page takes the theme styles */}
            <Router>
                <Routes>
                    <Route path="/" element={<Home recentEvents={recentEvents} darkMode={darkMode} setDarkMode={setDarkMode} />}/>
                    <Route path="/search" element={<SearchResults events={filteredEvents} />}/>
                    <Route path="/all-events" element={<AllEvents events={filteredEvents} />}/>
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;

