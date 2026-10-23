import { Route, Routes } from 'react-router-dom';
import { MenuProvider } from '@/context/MenuContext';
import { ProjectMenu } from '@/components/layout/ProjectMenu';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { HomePage } from '@/pages/HomePage';
import { ProjectPage } from '@/pages/ProjectPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export function App() {
  return (
    <MenuProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollToTop />
      <ProjectMenu />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MenuProvider>
  );
}
