import { Calendar, ChevronRight } from 'lucide-react';
import { useLanding } from '../context/LandingContext';
import SafeImage from './SafeImage';

export default function Hero() {
  const { content, openAppointmentModal } = useLanding();
  const hero = content.hero;

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative pt-24 pb-14 sm:pt-36 sm:pb-20 lg:pt-44 lg:pb-32 overflow-hidden bg-slate-50">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-24 -right-24 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-blue-100/50 blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-orange-50/50 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 items-center">
          
          {/* Left Column */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-[#1e56a0] px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium text-xs sm:text-sm mb-4 sm:mb-6">
              <span className="flex h-2 w-2 rounded-full bg-[#1e56a0]"></span>
              <span className="truncate">{hero.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.18] sm:leading-tight mb-4 sm:mb-6 tracking-tight">
              {hero.title}{' '}
              <span className="text-[#1e56a0]">{hero.highlightText}</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-lg">
              {hero.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button 
                onClick={() => openAppointmentModal()}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#1e56a0] text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-medium hover:bg-blue-800 transition-all shadow-[0_4px_14px_0_rgba(30,86,160,0.39)] hover:shadow-[0_6px_20px_rgba(30,86,160,0.23)] hover:-translate-y-0.5 cursor-pointer min-h-[48px]"
              >
                <Calendar className="w-5 h-5 flex-shrink-0" />
                <span>{hero.ctaButtonText || 'Make Appointment'}</span>
              </button>
              <button 
                onClick={scrollToAbout}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white text-gray-700 border border-gray-200 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-medium hover:bg-gray-50 transition-all hover:border-gray-300 cursor-pointer min-h-[48px]"
              >
                <span>{hero.secondaryButtonText || 'Learn More'}</span>
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-none mx-auto lg:ml-auto mt-4 lg:mt-0">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] sm:aspect-[4/3] lg:aspect-[5/4] max-h-[380px] sm:max-h-[480px] lg:max-h-none">
              <SafeImage 
                src={hero.heroImage} 
                alt="Lead Medical Professional" 
                className="w-full h-full object-cover rounded-2xl sm:rounded-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent pointer-events-none"></div>
            </div>
            
            {/* Floating Card */}
            <div className="absolute bottom-3 left-3 sm:bottom-6 sm:-left-6 lg:-left-10 bg-white/95 backdrop-blur-md p-3.5 sm:p-5 rounded-xl sm:rounded-2xl shadow-xl border border-white/40 max-w-[calc(100%-1.5rem)] sm:max-w-xs transition-transform duration-300">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="bg-green-100 p-2 sm:p-3 rounded-full flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{hero.doctorCardName}</p>
                  <p className="text-[11px] sm:text-xs text-gray-500 truncate">{hero.doctorCardRole}</p>
                </div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute top-3 right-3 sm:top-6 sm:-right-4 lg:-right-6 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl border border-white/40">
              <div className="flex flex-col items-center">
                <span className="text-xl sm:text-2xl font-bold text-[#1e56a0] leading-none">{hero.emergencyBadgeNumber}</span>
                <span className="text-[10px] sm:text-xs text-gray-500 font-medium mt-1">{hero.emergencyBadgeText}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
