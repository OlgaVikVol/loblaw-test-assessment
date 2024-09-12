import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useFetchDashboardData } from '@/shared/hooks/useFetchDashboardData';

// Mock the global `fetch` API
const mockFetch = vi.fn();

// Mock useParams to return a specific campaign ID
vi.mock('react-router-dom', () => ({
  useParams: () => ({ id: '123' }),
}));

// Mock useIterationNumber to return a specific iteration number that we can control
let mockIteration = { iteration: 1 };
vi.mock('@/shared/hooks/useIterationNumber', () => ({
  useIterationNumber: () => mockIteration,
}));

describe('useFetchDashboardData', () => {
  beforeEach(() => {
    global.fetch = mockFetch;
    mockFetch.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should set loading to true and then false after data is fetched', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        clicks: 100,
        impressions: 200,
        users: 150,
      }),
    });

    const { result } = renderHook(() => useFetchDashboardData());

    // Loading should initially be true
    expect(result.current.loading).toBe(true);

    // Wait for hook to fetch data and update state
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Check recent stats
    expect(result.current.recentStats.clicks).toBe(100);
    expect(result.current.recentStats.impressions).toBe(200);
    expect(result.current.recentStats.users).toBe(150);
  });

  it('should handle API errors gracefully', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useFetchDashboardData());

    // Wait for the hook to fetch data and fail
    await waitFor(() => expect(result.current.error).toBe('Network error'));

    // Loading should be false after the error
    expect(result.current.loading).toBe(false);
  });

  it('should calculate and update total stats correctly', async () => {
    // First mock fetch response with initial data
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        clicks: 50,
        impressions: 100,
        users: 75,
      }),
    });

    const { result, rerender } = renderHook(() => useFetchDashboardData());

    // Wait for the first fetch and state update
    await waitFor(() =>
      expect(result.current.totalStats.totalClicks).toBe(50)
    );
    expect(result.current.totalStats.totalImpressions).toBe(100);
    expect(result.current.totalStats.totalUsers).toBe(75);

    // Simulate another API call with additional data by incrementing the iteration
    act(() => {
      mockIteration = { iteration: 2 }; // Increment the iteration for the second fetch
    });

    // Second mock fetch response with additional data
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        clicks: 50,
        impressions: 100,
        users: 75,
      }),
    });

    // Trigger the re-fetch by calling `rerender`
    act(() => {
      rerender(); // Use rerender to trigger a new fetch based on updated iteration
    });

    // Wait for the second fetch and state update
    await waitFor(() =>
      expect(result.current.totalStats.totalClicks).toBe(100)
    );
    expect(result.current.totalStats.totalImpressions).toBe(200);
    expect(result.current.totalStats.totalUsers).toBe(150);
  });
});
