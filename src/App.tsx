import { Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
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
