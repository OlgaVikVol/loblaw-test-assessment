import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NotFound } from './NotFound';

describe('NotFound Component', () => {
  it('should render the 404 page with correct text', () => {
    // Render the NotFound component
    render(<NotFound />);

    // Check if the "404" heading is in the document
    expect(screen.getByText('404')).toBeInTheDocument();

    // Check if the "Page not found" paragraph is in the document
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });
});
