import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For matchers like toBeInTheDocument
import { Loading } from '@/components/Loading/Loading';


describe('Loading Component', () => {
  it('should render a spinner', () => {
    // Render the Loading component
    render(<Loading />);
    
    // Check if the spinner div is in the document
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  it('should render "Loading..." text', () => {
    // Render the Loading component
    render(<Loading />);
    
    // Check if the text "Loading..." is rendered
    const loadingText = screen.getByText(/loading.../i);
    expect(loadingText).toBeInTheDocument();
  });
});
