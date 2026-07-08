import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Symptoms from './components/Symptoms';
import Stats from './components/Stats';
import Experts from './components/Experts';
import Articles from './components/Articles';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Symptoms />
        <Stats />
        <Experts />
        <Articles />
      </main>
      <Footer />
    </div>
  );
}

export default App;
