import { Route, Routes } from 'react-router-dom';
import { CampaignsPage } from '@/pages/CampaignsPage/CampaignsPage';
import { DashBoard } from '@/pages/Dashboard/Dashboard';
import { NotFound } from '@/pages/NotFound/NotFound';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<CampaignsPage />} />
      <Route path='/campaigns' element={<CampaignsPage />} />
      <Route path='/dashboard/:id' element={<DashBoard />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};
