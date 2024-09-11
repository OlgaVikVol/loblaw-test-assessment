import { Route, Routes } from "react-router-dom";
import CampaignsPage from "../pages/CampaignsPage";
import DashBoard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<CampaignsPage />} />
      <Route path="/campaigns" element={<CampaignsPage />} />
      <Route path="/dashboard/:id" element={<DashBoard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
