import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { useFetchDashboardData } from '@/shared/hooks/useFetchDashboardData';
import { DashBoard } from './Dashboard';

// Mock the useFetchDashboardData hook
vi.mock('@/shared/hooks/useFetchDashboardData');

describe('DashBoard', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should show loading component when data is being fetched', () => {
    // Mock useFetchDashboardData to return loading state with default values
    vi.mocked(useFetchDashboardData).mockReturnValue({
      recentStats: {
        clicks: 0,
        impressions: 0,
        users: 0,
        ctr: 0,
        iterations: 0,
      },
      totalStats: {
        totalClicks: 0,
        totalImpressions: 0,
        totalUsers: 0,
        totalCtr: 0,
      },
      iteration: 0,
      loading: true,
      error: '',
    });

    render(<DashBoard />);

    // Check if Loading component is rendered
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display an error message when there is an error', () => {
    // Mock useFetchDashboardData to return error state with default values
    vi.mocked(useFetchDashboardData).mockReturnValue({
      recentStats: {
        clicks: 0,
        impressions: 0,
        users: 0,
        ctr: 0,
        iterations: 0,
      },
      totalStats: {
        totalClicks: 0,
        totalImpressions: 0,
        totalUsers: 0,
        totalCtr: 0,
      },
      iteration: 0,
      loading: false,
      error: 'Failed to fetch dashboard data',
    });

    render(<DashBoard />);

    // Check if ErrorMessage component is rendered with the correct error message
    expect(screen.getByText('Failed to fetch dashboard data')).toBeInTheDocument();
  });

  it('should render the dashboard data when successfully fetched', async () => {
    // Mock useFetchDashboardData to return fetched data
    vi.mocked(useFetchDashboardData).mockReturnValue({
      recentStats: {
        clicks: 25,
        impressions: 100,
        users: 80,
        ctr: 25,
        iterations: 1,
      },
      totalStats: {
        totalClicks: 200,
        totalImpressions: 400,
        totalUsers: 300,
        totalCtr: 50,
      },
      iteration: 1,
      loading: false,
      error: '',
    });

    render(<DashBoard />);

    // Wait for data to be rendered
    await waitFor(() => {
      // Check if the Total stats are rendered
      expect(screen.getByText('Impressions')).toBeInTheDocument();
      expect(screen.getByText('400')).toBeInTheDocument(); // totalImpressions
      expect(screen.getByText('200')).toBeInTheDocument(); // totalClicks
      expect(screen.getByText('50%')).toBeInTheDocument(); // totalCtr
      expect(screen.getByText('300')).toBeInTheDocument(); // totalUsers

      // Check if the Most Recent stats are rendered
      expect(screen.getByText('Most Recent Impressions')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument(); // recentImpressions
      expect(screen.getByText('25')).toBeInTheDocument(); // recentClicks
      expect(screen.getByText('25%')).toBeInTheDocument(); // recentCtr
      expect(screen.getByText('80')).toBeInTheDocument(); // recentUsers
    });
  });
});
