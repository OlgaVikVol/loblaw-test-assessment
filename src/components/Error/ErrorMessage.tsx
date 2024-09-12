import './ErrorMessage.css';

interface ErrorMessageProps {
  error: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <div className="error-message-container">
      <p>{error}</p>
    </div>
  );
};
