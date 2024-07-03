import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import styled from 'styled-components';
import Search from './Search'; 

const API_KEY = "56c6dc3c65ce55e8a0215b70ab55345d";
const BASE_URL = "https://api.themoviedb.org/3/discover/movie";

const MovieContainer = styled.div`
  @media (max-width: 47.9375rem) { 
    display: flex;
    flex-wrap: wrap;
    gap: 1.25rem;
    justify-content: flex-start; 
    padding: 0;
    padding-bottom: 2.5%;
    padding-top: 2%;
    min-width: 6.25rem;
    max-width: 64.0625rem;
  }
  @media (min-width: 48rem) { 
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    justify-content: flex-start;
    padding: 0;
    padding-bottom: 2.5%;
    padding-top: 2%;
    min-width: 6.25rem;
    max-width: 64.0625rem;
  }
`;

const ButtonContainer = styled.div`
  display: ${props => props.selectedMovie ? 'none' : 'flex'}; 
  justify-content: center;
  align-items: center;
  width: 64.0625rem;
  height: 5vh;
  background-color: #41C9FF;
  border-radius: .625rem;
  cursor: pointer;
  margin: 0 auto;
  margin-bottom: 2%;
  font-size: 1.5em;
  font-weight: bold;
`;

const LoadMoreText = styled.p`
  text-align: center;
  width: 100%;
  color: white;
  text-decoration: none;
  &:hover {
  
    color: black;
    }
`;

function Movies({ setIsLoading, setLoadingProgress, isSearchVisible, isSearchActive }) {
  const [movieList, setMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [hasClickedLoadMore, setHasClickedLoadMore] = useState(false);

  const handleNextPage = useCallback(() => {
    setCurrentPage(prev => prev + 1);
  }, []);

  const getMovie = useCallback((page = 1, sortOption = 'popularity.desc', reset = false, query = '') => {
    setIsLoading(true);
    setLoadingProgress(0); 

    const url = query.length > 0
      ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
      : `${BASE_URL}?api_key=${API_KEY}&page=${page}&sort_by=${sortOption}`;
    axios.get(url)
      .then(response => {
        const data = response.data;
        setMovieList(prevList => reset ? data.results : [...prevList, ...data.results]);

        
        setTimeout(() => setLoadingProgress(35), 500);

   
        setTimeout(() => setLoadingProgress(100), 800);

       
        setTimeout(() => setLoadingProgress(0), 1300);
      })
      .catch(error => {
        console.error("Failed to fetch movies:", error);
        setLoadingProgress(100); 
        setTimeout(() => setLoadingProgress(0), 1300);
      });
  }, [setIsLoading, setLoadingProgress]);

  useEffect(() => {
    setLoadingProgress(0); 
    getMovie(1, 'popularity.desc', true); 
  }, [getMovie, setLoadingProgress]);

  useEffect(() => {
    if (currentPage > 1) {
      setLoadingProgress(0); 
      getMovie(currentPage, 'popularity.desc');
    }
  }, [currentPage, getMovie, setLoadingProgress]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        handleNextPage();
      }
    };

    if (hasClickedLoadMore) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasClickedLoadMore, handleNextPage]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSearch = (query) => {
    setCurrentPage(1); 
    getMovie(1, 'popularity.desc', true, query); 
  };

  return (
    <div>
      {isSearchVisible && <Search onSearch={handleSearch} />}
      {selectedMovie ? (
        <MovieCard movie={selectedMovie} windowWidth={windowWidth}  data-testid="movie-card" />
      ) : (
        <>
        <MovieContainer data-testid="movie-container">
  {movieList.map((movie) => (
    <MovieCard key={movie.id} movie={movie} windowWidth={windowWidth} data-testid={`movie-card-${movie.id}`} />
  ))}
</MovieContainer>
<ButtonContainer selectedMovie={selectedMovie} data-testid="load-more-button" onClick={() => { handleNextPage(); setHasClickedLoadMore(true); }}>
  <LoadMoreText>Load More</LoadMoreText>
</ButtonContainer>
          </>
      )}
    </div>
  );
}

export default Movies;
