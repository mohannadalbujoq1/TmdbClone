import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSearch, FaTimes } from 'react-icons/fa';
import axios from 'axios';

const SearchContainer = styled.div`
  position: absolute;
  top: 3.6375rem;
  left: 0;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding-top: 0%;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 1);
  box-sizing: border-box;
  border-top: thin solid lightgrey;
  border-bottom: thin solid lightgrey;
`;

const SearchInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SearchInput = styled.input`
  padding: 0.8125rem 1.5625rem;
  width: calc(70%);
  border: 0rem;
  transition: all 0.3s ease;
  border-radius: 0;
  font-size: 1rem;
  padding-left: 5rem;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-family: Arial, sans-serif;
    font-style: italic;
    font-size: 100%;
    color: #707070;
  }
`;

const StyledFaSearch = styled(FaSearch)`
  position: absolute;
  top: 31%;
  left: 15.2%;
  font-size: 0.9375rem;
`;

const StyledFaTimes = styled(FaTimes)`
  position: absolute;
  top: 31%;
  right: 15.2%;
  font-size: 0.9375rem;
  cursor: pointer;
`;

const SuggestionsContainer = styled.div`
  width: 100%;
  background: white;
  border: 1px solid #ddd;
  max-height: 200px;
  overflow-y: auto;
  margin-top: 1rem;
  z-index: 1001;
  
  `;

const SuggestionItem = styled.div`
  padding: 0.5rem;
  padding-bottom: 1rem;
   padding-top: 1rem;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
  padding-left: 19.75rem;
  &:hover {
    background-color: #f0f0f0;
  }
`;

function Search({ onSearch }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState(''); 
  const apiKey = "56c6dc3c65ce55e8a0215b70ab55345d";

  useEffect(() => {
    setErrorMessage(''); 
    if (query.length > 2) {
      axios
        .get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
        .then((response) => {
          setSuggestions(response.data.results);
        })
        .catch((error) => {
          console.error('Failed to fetch search results:', error);
          setErrorMessage('Failed to fetch search results. Please try again.'); 
        });
    } else {
      setSuggestions([]);
    }
  }, [query, apiKey]);


  useEffect(() => {
    if (query.length > 2) {
      axios
        .get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
        .then((response) => {
          setSuggestions(response.data.results);
        })
        .catch((error) => {
          console.error('Failed to fetch search results:', error);
        });
    } else {
      setSuggestions([]);
    }
  }, [query, apiKey]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setQuery('');
    onSearch('');
    setSuggestions([]);
  };

  const handleSuggestionClick = (title) => {
    setQuery(title);
    onSearch(title); 
    setSuggestions([]);
  };

  return (
    <SearchContainer>
      <SearchInputContainer>
        <StyledFaSearch />
        <SearchInput
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for a movie, tv show, person..."
        />
{query && <StyledFaTimes onClick={handleClearSearch} data-testid="clear-button" />}
      </SearchInputContainer>
      {errorMessage && ( // Step 3: Display error message
        <div data-testid="search-error" style={{ color: 'red', marginTop: '1rem' }}>
          {errorMessage}
        </div>
      )}
      {suggestions.length > 0 && (
        <SuggestionsContainer>
          {suggestions.map((suggestion) => (
            <SuggestionItem
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion.title)}
            >
              {suggestion.title}
            </SuggestionItem>
          ))}
        </SuggestionsContainer>
      )}
    </SearchContainer>
  );
}

export default Search;
