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
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{services.title}</h2>
          <p className="text-lg text-gray-600">
            {services.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {(Array.isArray(services?.items) ? services.items : []).map((service, index) => (
            <div 
              key={service.id || index}
              onClick={() => handleServiceClick(service)}
              className={`p-8 rounded-3xl ${service.bgColor || 'bg-blue-50'} transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group cursor-pointer`}
            >
              <div className={`w-14 h-14 rounded-2xl ${service.iconBg || 'bg-blue-100'} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {getIcon(service.icon)}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {service.description}
              </p>
              <span className="inline-flex items-center text-[#1e56a0] font-medium group-hover:text-blue-800">
                Learn more
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
