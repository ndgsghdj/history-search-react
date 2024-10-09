import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();  // Using useNavigate for React Router v6

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    onSearch(query);    // Call the onSearch function passed as a prop
    navigate(`/search?query=${query}`);  // Navigate to /search with the query in the URL
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter a keyword (e.g., 'moon landing')"
        required
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;

