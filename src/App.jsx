import { Route, Routes } from 'react-router-dom';
import { MenuProvider } from '@/context/MenuContext';
import { ProjectMenu } from '@/components/layout/ProjectMenu';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { CursorDot } from '@/components/ui/CursorDot';
import { HomePage } from '@/pages/HomePage';
import { ProjectPage } from '@/pages/ProjectPage';
import { ClientPage } from '@/pages/ClientPage';
import { CampaignPage } from '@/pages/CampaignPage';
import { SubBrandPage } from '@/pages/SubBrandPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export function App() {
  return (
    <MenuProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollToTop />
      <ProjectMenu />
      <CursorDot />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/formed" element={<SubBrandPage key="formed" brand="formed" />} />
        <Route path="/formed/:client" element={<ClientPage />} />
        <Route path="/formed/:client/:campaign" element={<CampaignPage />} />
        <Route path="/objects" element={<SubBrandPage key="objects" brand="objects" />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MenuProvider>
  );
}
