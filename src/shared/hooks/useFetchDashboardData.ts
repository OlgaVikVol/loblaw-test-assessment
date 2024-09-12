import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { BASE_URL } from '@/shared/consts/api';
import { useIterationNumber } from './useIterationNumber';

/**
 * Custom hook to fetch dashboard data for a specific campaign from the API.
 *
 * @returns {Object} - The returned object contains:
 * - `recentStats` {Object} - Contains recent campaign statistics (clicks, impressions, users, CTR, and iterations).
 * - `totalStats` {Object} - Contains cumulative statistics for clicks, impressions, users, and CTR.
 * - `iteration` {number} - Current iteration number, fetched from `useIterationNumber`.
 * - `loading` {boolean} - Loading state, `true` if the data is being fetched.
 * - `error` {string} - Error message if the request fails.
 */
export const useFetchDashboardData = () => {
  // State for holding recent stats (clicks, impressions, users, CTR, iterations)
  const [recentStats, setRecentStats] = useState({
    clicks: 0,
    impressions: 0,
    users: 0,
    ctr: 0,
    iterations: 0,
  });

  // State for holding total stats (total clicks, impressions, users, total CTR)
  const [totalStats, setTotalStats] = useState({
    totalClicks: 0,
    totalImpressions: 0,
    totalUsers: 0,
    totalCtr: 0,
  });

  // Loading state for when data is being fetched
  const [loading, setLoading] = useState(false);

  // Error state for capturing any errors during API fetch
  const [error, setError] = useState('');

  // Get iteration number
  const { iteration } = useIterationNumber();

  // Get campaign id from params
  const { id: cid } = useParams();

 // Construct the API URL based on the campaign ID and iteration number
  const dashboardAPI = `${BASE_URL}/campaigns/${cid}?number=${iteration}`;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const response = await fetch(dashboardAPI, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();

          // Update recent stats
          setRecentStats({
            ...data,
            ctr:
              data.clicks === 0
                ? '-'
                : ((data.clicks / data.impressions) * 100).toFixed(2),
            iterations: iteration,
          });

          // Destructure recent data from the API
          const { clicks, impressions, users } = data;

          // Calculate and update the total stats
          const updatedTotalClicks = totalStats.totalClicks + clicks;
          const updatedTotalImpressions =
            totalStats.totalImpressions + impressions;
          const updatedTotalUsers = totalStats.totalUsers + users;
          const updatedTotalCtr = Number(
            ((updatedTotalClicks / updatedTotalImpressions) * 100).toFixed(2),
          );

          // Update total stats in the state
          setTotalStats({
            totalClicks: updatedTotalClicks,
            totalImpressions: updatedTotalImpressions,
            totalUsers: updatedTotalUsers,
            totalCtr: updatedTotalCtr,
          });
        }
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error(e.message);

          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    };

    // Trigger data fetching
    fetchDashboardData();
  }, [dashboardAPI]);

  return { recentStats, totalStats, iteration, loading, error };
};
