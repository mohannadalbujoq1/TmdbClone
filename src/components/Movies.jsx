import React, { useEffect, useState, useCallback } from "react";

import axios from "axios";
import MovieCard from "./MovieCard";
import styled from "styled-components";

import Search from "@src/components/Search";

const API_KEY = "56c6dc3c65ce55e8a0215b70ab55345d";
const BASE_URL = "https://api.themoviedb.org/3/discover/movie";

const MovieContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0rem;
  justify-content: flex-start;
  padding: 0;
  padding-bottom: 2.5%;
  padding-top: 2%;
  min-width: 6.25rem;
  max-width: 64.0625rem;

  @media (min-width: 48rem) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12.5rem, 1fr));
    padding-top: 6.5%;
  }
`;

const ButtonContainer = styled.button`
  display: ${(props) => (props.isSearchActive ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  width: 64.0625rem;
  height: 5vh;
  background-color: #41c9ff;
  border-radius: 0.625rem;
  cursor: pointer;
  margin: 0 auto;
  margin-bottom: 2%;
  font-size: 1.5em;
  font-weight: bold;
  border: none; // Add this to remove default button styling
  @media screen and (max-width: 48rem) {
    width: 100%;
  }
`;

const LoadMoreText = styled.span`
  text-align: center;
  width: 100%;
  color: white;
  text-decoration: none;
  &:hover {
    color: black;
  }
`;

function Movies({ setIsLoading, setLoadingProgress, isSearchVisible }) {
  const [movieList, setMovieList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [hasClickedLoadMore, setHasClickedLoadMore] = useState(false);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => prev + 1);
  }, []);

  const getMovie = useCallback(
    (page = 1, sortOption = "popularity.desc", reset = false, query = "") => {
      setIsLoading(true);
      setLoadingProgress(0);

      const url =
        query.length > 0
          ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
          : `${BASE_URL}?api_key=${API_KEY}&page=${page}&sort_by=${sortOption}`;
      axios
        .get(url)
        .then((response) => {
          const data = response.data;
          setMovieList((prevList) =>
            reset ? data.results : [...prevList, ...data.results]
          );
          setIsSearchActive(!!query.length);

          setTimeout(() => setLoadingProgress(35), 500);
          setTimeout(() => setLoadingProgress(100), 800);
          setTimeout(() => setLoadingProgress(0), 1300);
        })
        .catch((error) => {
          console.error("Failed to fetch movies:", error);
          setLoadingProgress(100);
          setTimeout(() => setLoadingProgress(0), 1300);
        });
    },
    [setIsLoading, setLoadingProgress]
  );

  useEffect(() => {
    setLoadingProgress(0);
    getMovie(1, "popularity.desc", true);
  }, [getMovie, setLoadingProgress]);

  useEffect(() => {
    if (currentPage > 1) {
      setLoadingProgress(0);
      getMovie(currentPage, "popularity.desc");
    }
  }, [currentPage, getMovie, setLoadingProgress]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight &&
        hasClickedLoadMore &&
        !isSearchActive
      ) {
        handleNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasClickedLoadMore, isSearchActive, handleNextPage]);

  const handleSearch = (query) => {
    setCurrentPage(1);
    getMovie(1, "popularity.desc", true, query);
    setHasClickedLoadMore(false);
  };

  return (
    <div>
      {isSearchVisible && <Search onSearch={handleSearch} />}
      <>
        <MovieContainer>
          {movieList.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </MovieContainer>
      <ButtonContainer
  isSearchActive={isSearchActive}
  onClick={() => {
    handleNextPage();
    setHasClickedLoadMore(true);
  }}
>
  <LoadMoreText> Load More </LoadMoreText>
</ButtonContainer>
      </>
    </div>
  );
}

export default Movies;
