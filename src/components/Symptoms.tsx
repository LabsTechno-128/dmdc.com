import { CheckCircle2 } from 'lucide-react';
import { useLanding } from '../context/LandingContext';
import SafeImage from './SafeImage';

export default function Symptoms() {
  const { content, openAppointmentModal } = useLanding();
  const about = content.about;

  return (
    <section id="about" className="py-14 sm:py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          
          {/* Image Side */}
          <div className="relative w-full max-w-lg sm:max-w-xl lg:max-w-none mx-auto">
            <div className="absolute inset-0 bg-[#1e56a0] rounded-2xl sm:rounded-[2rem] transform translate-x-2 translate-y-2 sm:translate-x-4 sm:translate-y-4 opacity-10 pointer-events-none"></div>
            <SafeImage 
              src={about.image} 
              alt="Modern Hospital Facility" 
              className="relative rounded-2xl sm:rounded-[2rem] shadow-xl w-full object-cover h-[300px] sm:h-[420px] lg:h-[560px]"
            />
            
            {/* Quick Info Badge */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 lg:bottom-8 lg:left-8 lg:right-8 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-3.5 sm:p-5 shadow-2xl border border-white/40">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="bg-[#1e56a0] text-white p-2.5 sm:p-3 rounded-full flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base truncate">{about.badgeTitle}</h4>
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{about.badgeText}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="mt-4 lg:mt-0">
            <div className="inline-flex items-center space-x-2 text-orange-500 font-semibold text-xs sm:text-sm mb-3 sm:mb-4">
              <span>{about.tag}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight tracking-tight">
              {about.title}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              {about.description}
            </p>

            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {(Array.isArray(about?.reasons) ? about.reasons : typeof about?.reasons === 'string' ? [about.reasons] : []).map((reason, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#1e56a0] flex-shrink-0 mr-3 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed">{reason}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={() => openAppointmentModal()}
              className="w-full sm:w-auto bg-gray-900 text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer min-h-[48px] flex items-center justify-center"
            >
              {about.ctaText || 'Learn More About Us'}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
