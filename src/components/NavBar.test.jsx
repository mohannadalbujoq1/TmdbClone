import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NavBar from './NavBar';

describe('NavBar Component', () => {
  const util = (<NavBar toggleSearchVisibility={() => {}} />);

  test('should render the NavBar component', () => {
    render(util);
    const logoImage = screen.getByAltText(/The Movie Database \(TMDB\)/i);
    expect(logoImage).toBeInTheDocument();
  });

  test('should toggle mobile menu visibility', async () => {
    render(util);
    const menuIcon = screen.getByTestId('menu-icon');
    await userEvent.click(menuIcon);
   expect(screen.queryByText(/Movies/)).not.toBeNull(); 
  });

  test('should toggle search icon when clicked', async () => {
    render(util);
    const searchIcon = screen.getByLabelText('search');
    await userEvent.click(searchIcon);
  
  });
});