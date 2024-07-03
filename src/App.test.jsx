import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

jest.mock('./components/NavBar', () => () => <div>NavBar</div>);
jest.mock('./components/Search', () => () => <input placeholder="Search" />);
jest.mock('./components/FilterSection', () => () => <div>FilterSection</div>);
jest.mock('./components/Movies', () => () => <div>Movies</div>);
jest.mock('./components/Footer', () => () => <div>Footer</div>);

describe('App Component', () => {
  test('renders App component correctly', () => {
    render(<App />);
    expect(screen.getByText('NavBar')).toBeInTheDocument();
    expect(screen.getByText('FilterSection')).toBeInTheDocument();
    expect(screen.getByText('Movies')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

});