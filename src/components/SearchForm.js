import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box } from '@mui/material';

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate(); // Using useNavigate for React Router v6

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    onSearch(query);    // Call the onSearch function passed as a prop
    navigate(`/search?query=${query}`);  // Navigate to /search with the query in the URL
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'center',
        mt: 2,
      }}
    >
      <TextField
        label="Search Events"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter a keyword (e.g., 'moon landing')"
        required
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Search
      </Button>
    </Box>
  );
};

export default SearchForm;

