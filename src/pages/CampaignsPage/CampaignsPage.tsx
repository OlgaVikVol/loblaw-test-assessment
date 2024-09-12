import { useNavigate } from 'react-router-dom';

import { Loading } from '@/components/Loading/Loading';
import { useFetchCampaigns } from '@/shared/hooks/useFetchCampaigns';
import { ErrorMessage } from '@/components/Error/ErrorMessage';
import './CampaignsPage.css';

export const CampaignsPage = () => {
  const { campaigns, loading, error } = useFetchCampaigns();
  const navigate = useNavigate();

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  const handleClick = (id: string) => {
    navigate(`/dashboard/${id}`);
  };

  return (
    <div className='campaign-list'>
      <h1>Campaign List</h1>
      <table className='campaign-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Campaign Name</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr
              key={campaign.id}
              className='campaign-item'
              onClick={() => handleClick(campaign.id)}
            >
              <td>{campaign.id}</td>
              <td>{campaign.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
