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
        <main className="pt-[72px] md:pt-[88px]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/agentic-ai" element={<AgenticAIPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/rent-creative" element={<RentCreativePage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Unknown URLs fall back to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
