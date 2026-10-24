import { useLanding } from '../context/LandingContext';

export default function Stats() {
  const { content } = useLanding();
  const stats = Array.isArray(content?.stats?.items) ? content.stats.items : [];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#1e56a0] relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40V0H40" fill="none" stroke="white" strokeWidth="2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 sm:gap-6 md:gap-8 md:divide-x md:divide-white/20">
          {stats.map((stat, index) => (
            <div key={index} className={`text-center px-2 sm:px-4 md:px-0 ${index === 0 ? '' : 'md:pl-6 lg:pl-8'}`}>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-blue-100 font-medium leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
