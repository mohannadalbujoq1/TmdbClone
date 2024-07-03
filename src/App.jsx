import './App.css';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavBar from './components/NavBar';
import Movies from './components/Movies';
import FilterSection from './components/FilterSection';
import Search from './components/Search';
import Footer from './components/Footer';
import LoadingBar from './components/UI/LoadingBar';

const MainContainer = styled.div`
  display: flex;
  flex-direction: ${({ windowWidth }) => (windowWidth > 768 ? 'row' : 'column')};
  padding-left: 2%;
  padding-right: 2%;
  padding-top: 4rem;
  @media (min-width: 768px) {
    padding-left: 15%;
    padding-right: 15%;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: ${({ windowWidth }) => (windowWidth > 768 ? 'row' : 'column')};
  justify-content: space-between;
`;

function App() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('popularity.desc');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSearchVisibility = () => setIsSearchVisible(!isSearchVisible);

  const handleSortChange = (selectedOption) => {
    setSortOption(selectedOption);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearchActive(!!query);
  };

  return (
    <React.Fragment>
      <LoadingBar
        isLoading={isLoading}
        isLoaded={isLoaded}
        initialLoadComplete={initialLoadComplete}
        loadingProgress={loadingProgress}
      />
      <NavBar toggleSearchVisibility={toggleSearchVisibility} />
      <MainContainer windowWidth={windowWidth}>
        {isSearchVisible && <Search onSearch={handleSearch} />}
        <ContentContainer windowWidth={windowWidth}>
          <FilterSection onSortChange={handleSortChange} />
          <Movies
            searchQuery={searchQuery}
            sortOption={sortOption}
            setIsLoading={setIsLoading}
            setLoadingProgress={setLoadingProgress}
            setIsLoaded={setIsLoaded}
            setInitialLoadComplete={setInitialLoadComplete}
            isSearchVisible={isSearchVisible}
            isSearchActive={isSearchActive}
          />
        </ContentContainer>
      </MainContainer>
      <Footer />
    </React.Fragment>
  );
}

export default App;
