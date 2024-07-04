import React, { useState} from 'react';
import styled from 'styled-components';
import Dropdown from './UI/Dropdown';
import Checkbox from './UI/Checkbox';
import Select from './Select';
import Button from './UI/Button';
import Input from './UI/Input';
import RadioButtonGroup from './RadioButtonGroup';
import SubHeader from './UI/SubHeader';
import SinglePointSliderTrack from './SinglePointSliderTrack';
import TwoPointSliderTrack from './TwoPointSliderTrack';

const Container = styled.div`
  margin-right: 1.25rem;
  width: 15.8125rem;

  @media (max-width: 48rem) {
    width: 90%;
    padding: 0 5%;
  }
`;

const Header = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.25rem;
    @media (max-width: 48rem) {
    
    padding-left: 25%;
  }
`;

const Divider = styled.hr`
  border: none;
  height: .0625rem;
  background-color: #C5C5C5;
  width: 107.5%;
  margin-left: -3.5%;
`;

const GenreList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: block;
`;

const GenreListItem = styled.li`
  display: inline-flex;
  border: .0625rem solid #9e9e9e;
  border-radius: .875rem;
  padding: .25rem .75rem;
  font-size: .9em;
  margin-right: .375rem;
  margin-top: .5rem;
  box-sizing: border-box;
  cursor: pointer;
  background-color: #fff;
  color: #000;
  border-color: #9e9e9e;

  &:hover {
    background-color: rgba(0, 123, 255, 1);
    color: #fff;
    border-color: rgba(0, 123, 255, 1);

    a {
      color: #fff;
    }
  }
`;
const DropdownWrapper = styled.div`
  // Your existing styles here

  @media (max-width: 48rem) {
    display: none;
  }
`;
const GenreLink = styled.a`
  color: ${({ isHovered }) => (isHovered ? '#fff' : '#000')};
  text-decoration: none;
  font-weight: 400;
`;

const DateInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;
`;

const DateInputLabel = styled.span`
  margin-right: .625rem;
  color: #a4a4a4;
  font-size: .9em;
  padding-right: 15%;
`;

const FilterSection = ({ onSortChange }) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isWatchOpen, setIsWatchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  const toggleSort = () => setIsSortOpen(!isSortOpen);
  const toggleWatch = () => setIsWatchOpen(!isWatchOpen);
  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  const handleSortChange = (value) => {
    onSortChange(value);
    setIsSortOpen(false);
  };

  const genres = [
    'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
    'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music',
    'Mystery', 'Romance', 'Science Fiction', 'TV Movie', 'Thriller', 'War', 'Western',
  ];

  return (
    <Container>
      <Header>Popular Movies</Header>

      <Dropdown title="Sort" isOpen={isSortOpen} toggleDropdown={toggleSort}>
      <SubHeader title="Sort Result By" />
        <Select
          options={[
            { label: 'Popularity Descending', value: 'popularity.desc' },
            { label: 'Popularity Ascending', value: 'popularity.asc' },
            { label: 'Release Date Descending', value: 'release_date.desc' },
            { label: 'Release Date Ascending', value: 'release_date.asc' },
            { label: 'Rating Descending', value: 'vote_average.desc' },
            { label: 'Rating Ascending', value: 'vote_average.asc' },
            { label: 'Title A-Z', value: 'title.asc' },
            { label: 'Title Z-A', value: 'title.desc' },
          ]}
          onChange={handleSortChange}
        />
      </Dropdown>
      
      <DropdownWrapper>
      <Dropdown title="Where To Watch" isOpen={isWatchOpen} toggleDropdown={toggleWatch}>
        <Checkbox options={['Netflix', 'Hulu', 'Amazon Prime']} />
      </Dropdown>
      </DropdownWrapper>

      <DropdownWrapper>
      <Dropdown title="Filters" isOpen={isFilterOpen} toggleDropdown={toggleFilter}>
        <SubHeader title="Show me" />
        <RadioButtonGroup />
        <Divider />
        <SubHeader title="Availabilities" />
        <Checkbox options={['Search All Availabilities?']} />
        <Divider />
        <SubHeader title="Release Dates" />
        <Checkbox options={['Search all releases?']} />
        <DateInputWrapper>
          <DateInputLabel>from</DateInputLabel>
          <Input type="date" placeholder="Release Dates" />
        </DateInputWrapper>
        <DateInputWrapper>
          <DateInputLabel>to&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</DateInputLabel>
          <Input type="date" placeholder="Release Dates" />
        </DateInputWrapper>
        <Divider />
        <GenreList>
          {genres.map((genre, index) => (
            <GenreListItem
              key={index}
             
            >
              <GenreLink
                href="#"
              >
                {genre}
              </GenreLink>
            </GenreListItem>
          ))}
        </GenreList>
        <Divider />

        <SubHeader title="Language" />
        <Select
    options={[
      { label: 'English', value: 'en' },
      { label: 'Arabic', value: 'ar' },
    ]}
    onChange={(value) => console.log('Language selected:', value)}
    data-testid="language-dropdown" 
  />
        <Divider />

        <SubHeader title="User Score" />
        <TwoPointSliderTrack min={0} max={10} step={1} tickHeight={{ small: 10, large: 20 }} tickMargin={5} numberMargin={5} />
        <Divider />

        <SubHeader title="Minimum User Votes" />
        <SinglePointSliderTrack min={0} max={500} step={100} tickHeight={{ small: 10, large: 20 }} tickMargin={100} numberMargin={100} />
        <Divider />

        <SubHeader title="Runtime" />
        <TwoPointSliderTrack min={0} max={380} step={20} tickHeight={{ small: 10, large: 20 }} tickMargin={20} numberMargin={120} />
        <Divider />

        <SubHeader title="Keywords" />
        <Input type="text" placeholder="Filter by keywords..." />
      </Dropdown>
      </DropdownWrapper>
      <Button text="Search" onClick={() => console.log('Search clicked')} />
    </Container>
  );
};

export default FilterSection;