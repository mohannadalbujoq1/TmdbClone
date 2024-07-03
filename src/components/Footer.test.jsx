import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from './Footer';

describe('Footer component', () => {
  const util = <Footer />;

  test('renders Footer component with all sections', () => {
    render(util);
    expect(screen.getByText('The Basics')).toBeInTheDocument();
    expect(screen.getByText('Get Involved')).toBeInTheDocument();
    expect(screen.getByText('Community')).toBeInTheDocument();
    expect(screen.getByText('Legal')).toBeInTheDocument();
    expect(screen.getByText('About TMDB')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('Support Forums')).toBeInTheDocument();
    expect(screen.getByText('API')).toBeInTheDocument();
    expect(screen.getByText('System Status')).toBeInTheDocument();
    expect(screen.getByText('Contribution Bible')).toBeInTheDocument();
    expect(screen.getByText('Add New Movie')).toBeInTheDocument();
    expect(screen.getByText('Add New TV Show')).toBeInTheDocument();
    expect(screen.getByText('Guidelines')).toBeInTheDocument();
    expect(screen.getByText('Discussions')).toBeInTheDocument();
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
    expect(screen.getByText('Terms of Use')).toBeInTheDocument();
    expect(screen.getByText('API Terms of Use')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('DMCA Policy')).toBeInTheDocument();
  });

  test('footer links are clickable', async () => {
    render(util);
    const link = screen.getByText('About TMDB');
    await userEvent.click(link);
  });

});