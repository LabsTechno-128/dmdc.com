import { Activity, Stethoscope, Pill, HeartPulse } from 'lucide-react';

const services = [
  {
    title: 'Covid-19 Test',
    description: 'Fast and reliable PCR and rapid antigen testing with quick result delivery.',
    icon: <Activity className="w-6 h-6 text-orange-500" />,
    bgColor: 'bg-orange-50',
    iconBg: 'bg-orange-100',
  },
  {
    title: 'Online Consultation',
    description: 'Connect with our specialists from the comfort of your home via video call.',
    icon: <Stethoscope className="w-6 h-6 text-blue-500" />,
    bgColor: 'bg-blue-50',
    iconBg: 'bg-blue-100',
  },
  {
    title: 'Buy Medicine',
    description: 'Order prescribed medicines online with fast home delivery service.',
    icon: <Pill className="w-6 h-6 text-green-500" />,
    bgColor: 'bg-green-50',
    iconBg: 'bg-green-100',
  },
  {
    title: 'Check-up Booking',
    description: 'Schedule comprehensive health check-ups and radiology services easily.',
    icon: <HeartPulse className="w-6 h-6 text-purple-500" />,
    bgColor: 'bg-purple-50',
    iconBg: 'bg-purple-100',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Core Medical Services</h2>
          <p className="text-lg text-gray-600">
            We offer a wide range of diagnostic and healthcare services tailored to meet your unique needs with precision and care.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`p-8 rounded-3xl ${service.bgColor} transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group cursor-pointer`}
            >
              <div className={`w-14 h-14 rounded-2xl ${service.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {service.description}
              </p>
              <a href="#" className="inline-flex items-center text-[#1e56a0] font-medium group-hover:text-blue-800">
                Learn more
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
