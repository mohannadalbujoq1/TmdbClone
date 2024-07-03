import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MenuItems from './MenuItems';

describe('MenuItems component', () => {
  const util = <MenuItems />;

  test('renders all menu headers and items', () => {
    render(util);
    expect(screen.getByText(/Movie/i)).toBeInTheDocument();
    expect(screen.getByText(/TV Shows/i)).toBeInTheDocument();
    expect(screen.getByText(/People/i)).toBeInTheDocument();
    expect(screen.getByText(/Contribution/i)).toBeInTheDocument();
    expect(screen.getByText(/Bible/i)).toBeInTheDocument();
  });

  test('menu item can be clicked', async () => {
    render(util);
    const menuItem = screen.getByText(/Contribution/i);
    await userEvent.click(menuItem);
   
  });

});