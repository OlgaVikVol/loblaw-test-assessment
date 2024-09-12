import { Loading } from '@/components/Loading/Loading';

import { useFetchDashboardData } from '@/shared/hooks/useFetchDashboardData';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';
import './Dashboard.css';

export const DashBoard = () => {
  const { recentStats, totalStats, iteration, loading, error } =
    useFetchDashboardData();

  if (error) {
    return <ErrorMessage error={error}/>;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='dashboard-page'>
      {totalStats ? (
        <div className='dashboard-wrapper'>
          {/* Dashboard title (current iteration) */}
          <div className='dashboard-title dashboard-iteration'>
            <h2>Current Iteration</h2>
            <p>{iteration.toString()}</p>
          </div>

          {/* Dashboard row (Total) */}
          <div className='dashboard-row'>
            <h3>Total:</h3>
            <div className='dashboard-grid'>
              <div className='dashboard-title'>
                <h4>Impressions</h4>
                <p>{totalStats.totalImpressions.toString()}</p>
              </div>
              <div className='dashboard-title'>
                <h4>Clicks</h4>
                <p>{totalStats.totalClicks.toString()}</p>
              </div>
              <div className='dashboard-title'>
                <h4>CTR</h4>
                <p>{totalStats.totalCtr.toString()}%</p>
              </div>
              <div className='dashboard-title'>
                <h4>Users</h4>
                <p>{totalStats.totalUsers.toString()}</p>
              </div>
            </div>
          </div>

          {/* Dashboard row (Most Recent) */}
          <div className='dashboard-row'>
            <h3>Most Recent:</h3>
            <div className='dashboard-grid'>
              <div className='dashboard-title'>
                <h4>Most Recent Impressions</h4>
                <p>{recentStats.impressions.toString()}</p>
              </div>
              <div className='dashboard-title'>
                <h4>Most Recent Clicks</h4>
                <p>{recentStats.clicks.toString()}</p>
              </div>
              <div className='dashboard-title'>
                <h4>Most Recent CTR</h4>
                <p>{recentStats.ctr.toString()}%</p>
              </div>
              <div className='dashboard-title'>
                <h4>Most Recent Users</h4>
                <p>{recentStats.users.toString()}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>No dashboard results found</div>
      )}
    </div>
  );
};
