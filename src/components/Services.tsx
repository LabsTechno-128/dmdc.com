import { Activity, Stethoscope, Pill, HeartPulse } from 'lucide-react';
import { useLanding } from '../context/LandingContext';

// Helper to map icon name to lucide component
const getIcon = (iconName: string) => {
  switch (iconName?.toLowerCase()) {
    case 'stethoscope':
      return <Stethoscope className="w-6 h-6 text-blue-500" />;
    case 'pill':
      return <Pill className="w-6 h-6 text-green-500" />;
    case 'heartpulse':
      return <HeartPulse className="w-6 h-6 text-purple-500" />;
    case 'activity':
    default:
      return <Activity className="w-6 h-6 text-orange-500" />;
  }
};

export default function Services() {
  const { content, openAppointmentModal } = useLanding();
  const services = content.services;

  const handleServiceClick = (item: any) => {
    if (item.linkUrl === '#appointment' || item.title.toLowerCase().includes('check-up') || item.title.toLowerCase().includes('booking')) {
      openAppointmentModal();
    } else if (item.linkUrl && item.linkUrl.startsWith('#')) {
      const el = document.querySelector(item.linkUrl);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 tracking-tight">{services.title}</h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            {services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {(Array.isArray(services?.items) ? services.items : []).map((service, index) => (
            <div 
              key={service.id || index}
              role="button"
              tabIndex={0}
              onClick={() => handleServiceClick(service)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleServiceClick(service);
                }
              }}
              className={`p-6 sm:p-8 rounded-2xl sm:rounded-3xl ${service.bgColor || 'bg-blue-50'} transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl group cursor-pointer flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1e56a0]`}
            >
              <div>
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${service.iconBg || 'bg-blue-100'} flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 transition-transform`}>
                  {getIcon(service.icon)}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{service.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5 sm:mb-6">
                  {service.description}
                </p>
              </div>
              <span className="inline-flex items-center text-sm font-semibold text-[#1e56a0] group-hover:text-blue-800 transition-colors pt-1">
                Learn more
                <svg className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
