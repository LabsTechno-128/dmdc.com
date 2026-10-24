import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Symptoms from './components/Symptoms';
import Stats from './components/Stats';
import Experts from './components/Experts';
import Articles from './components/Articles';
import Footer from './components/Footer';
import AppointmentModal from './components/AppointmentModal';
import SectionErrorBoundary from './components/SectionErrorBoundary';
import SEOHead from './components/SEOHead';
import { LandingProvider, useLanding } from './context/LandingContext';

function LandingPageContent() {
  const { seo, content } = useLanding();
  const visibility = content.sectionVisibility || {
    hero: true,
    services: true,
    about: true,
    stats: true,
    doctors: true,
    articles: true,
    appointment: true,
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 relative">
      <SEOHead seo={seo} />
      <Navbar />
      <main>
        {visibility.hero && (
          <SectionErrorBoundary fallbackTitle="Hero section is unavailable">
            <Hero />
          </SectionErrorBoundary>
        )}

        {visibility.services && (
          <SectionErrorBoundary fallbackTitle="Services section is unavailable">
            <Services />
          </SectionErrorBoundary>
        )}

        {visibility.about && (
          <SectionErrorBoundary fallbackTitle="About section is unavailable">
            <Symptoms />
          </SectionErrorBoundary>
        )}

        {visibility.stats && (
          <SectionErrorBoundary fallbackTitle="Statistics section is unavailable">
            <Stats />
          </SectionErrorBoundary>
        )}

        {visibility.doctors && (
          <SectionErrorBoundary fallbackTitle="Specialists section is unavailable">
            <Experts />
          </SectionErrorBoundary>
        )}

        {visibility.articles && (
          <SectionErrorBoundary fallbackTitle="Articles section is unavailable">
            <Articles />
          </SectionErrorBoundary>
        )}
      </main>
      <Footer />
      <AppointmentModal />
    </div>
  );
}

function App() {
  return (
    <LandingProvider>
      <LandingPageContent />
    </LandingProvider>
  );
}

export default App;
