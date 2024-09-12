import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { useFetchCampaigns } from '@/shared/hooks/useFetchCampaigns';

// Mock data for campaigns
const mockCampaigns = [
  { id: 1, name: 'Campaign 1' },
  { id: 2, name: 'Campaign 2' },
];

// Test component that uses the hook
const TestComponent = () => {
  const { campaigns, loading, error } = useFetchCampaigns();

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {campaigns.map((campaign) => (
          <li key={campaign.id}>{campaign.name}</li>
        ))}
      </ul>
    </div>
  );
};

describe('useFetchCampaigns Hook', () => {
  beforeEach(() => {
    vi.resetAllMocks(); // Reset mock before each test
  });

  it('should render loading state initially', () => {
    render(<TestComponent />);

    // Check that "Loading..." is displayed initially
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should fetch and display campaigns successfully', async () => {
    // Mock the global fetch API to return the mockCampaigns data successfully
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCampaigns),
      })
    ) as unknown as typeof fetch;

    render(<TestComponent />);

    // Wait for the fetch to complete and assert that the campaigns are displayed
    await waitFor(() => expect(global.fetch).toHaveBeenCalledOnce());

    // Ensure that "Loading..." is no longer in the document
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

    // Check if the campaigns are rendered correctly
    expect(screen.getByText('Campaign 1')).toBeInTheDocument();
    expect(screen.getByText('Campaign 2')).toBeInTheDocument();
  });

  it('should handle API error when response is not OK', async () => {
    // Mock the fetch API to return a failed response
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as unknown as typeof fetch;

    render(<TestComponent />);

    // Wait for the fetch to complete
    await waitFor(() => expect(global.fetch).toHaveBeenCalledOnce());

    // Ensure that "Loading..." is no longer in the document
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

    // Since the response was not OK, ensure no campaigns or error are displayed
    expect(screen.queryByText('Campaign 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Campaign 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Error')).not.toBeInTheDocument();
  });

  it('should handle network error correctly', async () => {
    // Mock fetch to reject the request with a network error
    global.fetch = vi.fn(() =>
      Promise.reject(new Error('Network Error'))
    ) as unknown as typeof fetch;

    render(<TestComponent />);

    // Wait for the fetch to fail
    await waitFor(() => expect(global.fetch).toHaveBeenCalledOnce());

    // Ensure that "Loading..." is no longer in the document
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

    // Ensure that the error message is displayed
    expect(screen.getByText('Network Error')).toBeInTheDocument();

    // Ensure that no campaigns are displayed
    expect(screen.queryByText('Campaign 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Campaign 2')).not.toBeInTheDocument();
  });
});
