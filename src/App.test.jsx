import React from 'react';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from '@src/App';

const util=(<App />);

describe('App Component', () => {
  it("Should render the navigation bar, when the app is rendered, to provide navigation", () => {
    render(util);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it("Should render the footer, when the app is rendered, for site information", () => {
    render(util);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it("Should not render the search component initially", () => {
    render(util);
    expect(screen.queryByRole('search')).not.toBeInTheDocument();
  });
});