import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useFetchCampaigns } from '@/shared/hooks/useFetchCampaigns';
import { useNavigate } from 'react-router-dom';
import { CampaignsPage } from './CampaignsPage';

// Mock useFetchCampaigns hook
vi.mock('@/shared/hooks/useFetchCampaigns');

// Mock useNavigate hook from react-router-dom
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('CampaignsPage', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should show loading component when data is being fetched', () => {
    // Mock useFetchCampaigns to return loading state
    vi.mocked(useFetchCampaigns).mockReturnValue({
      campaigns: [],
      loading: true,
      error: '',
    });

    render(<CampaignsPage />);

    // Check if Loading component is rendered
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should show error message when there is an error', () => {
    // Mock useFetchCampaigns to return error state
    vi.mocked(useFetchCampaigns).mockReturnValue({
      campaigns: [],
      loading: false,
      error: 'Failed to fetch campaigns',
    });

    render(<CampaignsPage />);

    // Check if the ErrorMessage component is rendered with the correct error
    expect(screen.getByText('Failed to fetch campaigns')).toBeInTheDocument();
  });

  it('should render the list of campaigns', () => {
    // Mock useFetchCampaigns to return a successful response
    vi.mocked(useFetchCampaigns).mockReturnValue({
      campaigns: [
        { id: '1', name: 'Campaign 1' },
        { id: '2', name: 'Campaign 2' },
      ],
      loading: false,
      error: '',
    });

    render(<CampaignsPage />);

    // Check if the table headers are rendered
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Campaign Name')).toBeInTheDocument();

    // Check if the campaign list is rendered
    expect(screen.getByText('Campaign 1')).toBeInTheDocument();
    expect(screen.getByText('Campaign 2')).toBeInTheDocument();
  });

  it('should navigate to the dashboard when a campaign is clicked', () => {
    // Mock useFetchCampaigns to return a successful response
    vi.mocked(useFetchCampaigns).mockReturnValue({
      campaigns: [
        { id: '1', name: 'Campaign 1' },
        { id: '2', name: 'Campaign 2' },
      ],
      loading: false,
      error: '',
    });

    render(<CampaignsPage />);

    // Simulate click on the first campaign
    fireEvent.click(screen.getByText('Campaign 1'));

    // Check if navigate was called with the correct ID
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard/1');
  });
});
