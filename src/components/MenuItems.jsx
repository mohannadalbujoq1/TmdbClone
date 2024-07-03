import React from 'react';
import styled from 'styled-components';

const MenuItem = styled.a`
  color: #c9c9c9;
  text-decoration: none;
  padding: .3125rem 0;
  @media (min-width: 48rem) {
    padding: 0 .9375rem;
  }
`;

const MenuHeader = styled.div`
  font-size: 1.15em;
  text-transform: uppercase;
  margin-bottom: .4375rem;
  font-weight: 700;
`;

const MenuItems = () => (
  <>
    <MenuHeader>Movie</MenuHeader>
    <MenuHeader>TV Shows</MenuHeader>
    <MenuHeader>People</MenuHeader>
    <MenuItem href="">Contribution</MenuItem>
    <MenuItem href="">Bible</MenuItem>
    <MenuItem href="">Apps</MenuItem>
    <MenuItem href="">Discussions</MenuItem>
    <MenuItem href="">Leaderboard</MenuItem>
    <MenuItem href="">Contribute</MenuItem>
    <MenuItem href="">API</MenuItem>
    <MenuItem href="">Support</MenuItem>
    <MenuItem href="">About</MenuItem>
    <br />
    <MenuItem href="">Login</MenuItem>
  </>
);

export default MenuItems;
