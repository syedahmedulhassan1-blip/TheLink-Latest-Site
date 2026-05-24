import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import {
  HomePage,
  AboutPage,
  PortfolioPage,
  AgenticAIPage,
  ServicesPage,
  RentCreativePage,
  ContactPage,
} from './pages';

// Admin is code-split so it never weighs down the public site bundle.
const AdminPage = lazy(() => import('./admin/AdminPage'));

function App() {
  return (
    <Routes>
      {/* Standalone admin — no public header/footer */}
      <Route
        path="/admin"
        element={
          <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
            <AdminPage />
          </Suspense>
        }
      />
      {/* Public site */}
      <Route path="*" element={<SiteShell />} />
    </Routes>
  );
}

function SiteShell() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <ScrollToTop />
      <Header />
      <div className="flex-1">
        <Routes>
          {/* Home: hero sits flush at top, transparent header floats over it */}
          <Route path="/" element={<HomePage />} />
          {/* Other pages: offset so content clears the fixed header */}
          <Route path="/about" element={<OffsetPage><AboutPage /></OffsetPage>} />
          <Route path="/portfolio" element={<OffsetPage><PortfolioPage /></OffsetPage>} />
          <Route path="/agentic-ai" element={<OffsetPage><AgenticAIPage /></OffsetPage>} />
          <Route path="/services" element={<OffsetPage><ServicesPage /></OffsetPage>} />
          <Route path="/rent-creative" element={<OffsetPage><RentCreativePage /></OffsetPage>} />
          <Route path="/contact" element={<OffsetPage><ContactPage /></OffsetPage>} />
          {/* Unknown URLs fall back to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

// Pushes page content below the fixed header (used on all pages except home,
// where the hero intentionally sits under the transparent header).
const OffsetPage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="pt-[72px] md:pt-[80px]">{children}</div>
);

export default App;
