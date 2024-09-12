import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For matchers like toBeInTheDocument
import { ErrorMessage } from './ErrorMessage'; // Import the ErrorMessage component

describe('ErrorMessage Component', () => {
  it('should render the error message when passed as a prop', () => {
    const errorMessage = 'Something went wrong';

    // Render the ErrorMessage component with an error prop
    render(<ErrorMessage error={errorMessage} />);

    // Check if the error message is rendered correctly
    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });

  it('should render the error message in the error-message-container div', () => {
    const errorMessage = 'Unable to load data';

    // Render the ErrorMessage component with an error prop
    render(<ErrorMessage error={errorMessage} />);

    // Check if the error message is inside a div with class 'error-message-container'
    const container = screen.getByText(errorMessage).closest('div');
    expect(container).toHaveClass('error-message-container');
  });
});
