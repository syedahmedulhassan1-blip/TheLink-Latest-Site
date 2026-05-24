import Seo from '../seo/Seo';
import Hero from '../components/Hero';
import Slideshow from '../components/Slideshow';
import Clients from '../components/Clients';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import AgenticAI from '../components/AgenticAI';
import Services from '../components/Services';
import Websites from '../components/Websites';
import RentACreative from '../components/RentACreative';
import Contact from '../components/Contact';

export const HomePage: React.FC = () => (
  <>
    <Seo page="home" />
    <Hero />
    <Slideshow />
    <Clients />
  </>
);

export const AboutPage: React.FC = () => (
  <>
    <Seo page="about" />
    <About />
  </>
);

export const PortfolioPage: React.FC = () => (
  <>
    <Seo page="portfolio" />
    <Portfolio />
  </>
);

export const AgenticAIPage: React.FC = () => (
  <>
    <Seo page="agentic-ai" />
    <AgenticAI />
  </>
);

export const ServicesPage: React.FC = () => (
  <>
    <Seo page="services" />
    <Services />
    <Websites />
  </>
);

export const RentCreativePage: React.FC = () => (
  <>
    <Seo page="rent-creative" />
    <RentACreative />
  </>
);

export const ContactPage: React.FC = () => (
  <>
    <Seo page="contact" />
    <Contact />
  </>
);
