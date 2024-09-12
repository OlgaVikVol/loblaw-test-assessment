import { BASE_URL } from '@/shared/consts/api';
import { useEffect, useState } from 'react';

/**
 * Interface for a campaign object.
 */
export interface ICampaign {
  id: string;
  name: string;
}

/**
 * Custom hook to fetch list of campaigns from API
 * 
 * @return  {Object} - The returned object contains:
 * - `campaigns` {ICampaign[]} - Array of campaign objects with `id` and `name` properties.
 * - `loading` {boolean} - Boolean indicating if the data is still being fetched.
 * - `error` {string} - Error message if the request fails.
 */
export const useFetchCampaigns = () => {
  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);

        // Make the request to /api/campaigns
        const response = await fetch(`${BASE_URL}/campaigns`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          // Assuming the response is a list of campaigns, access `data` directly
          const data = await response.json();
          setCampaigns(data); 
        } else {
          throw new Error(`Error: ${response.statusText}`);
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

    fetchCampaigns();
  }, []);

  return { campaigns, loading, error };
};
