import React from "react";

import styled from "styled-components";

import NavBar from "@src/components/NavBar";
import Movies from "@src/components/Movies";
import FilterSection from "@src/components/FilterSection";
import Search from "@src/components/Search";
import Footer from "@src/components/Footer";
import LoadingBar from "@src/components/UI/LoadingBar";

import "@src/App.css";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 2%;
  padding-right: 2%;
  padding-top: 4rem;
  @media (min-width: 768px) {
    flex-direction: row;
    padding-left: 15%;
    padding-right: 15%;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

function App() {
  const [isSearchVisible, setIsSearchVisible] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortOption, setSortOption] = React.useState("popularity.desc");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = React.useState(false);
  const [loadingProgress, setLoadingProgress] = React.useState(0);
  const [isSearchActive, setIsSearchActive] = React.useState(false);

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
        role="progressbar" 
      />
      <NavBar
        toggleSearchVisibility={toggleSearchVisibility}
        isSearchOpen={isSearchVisible}
        role="navigation" 
      />
      <MainContainer role="main"> 
        {isSearchVisible && <Search onSearch={handleSearch} role="search" />} 
        <ContentContainer>
          <FilterSection onSortChange={handleSortChange}/> 
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
      <Footer role="contentinfo" /> 
    </React.Fragment>
  );
}

export default App;