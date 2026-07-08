import { Calendar, ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-72 h-72 rounded-full bg-orange-50/50 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-[#1e56a0] px-4 py-2 rounded-full font-medium text-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-[#1e56a0]"></span>
              <span>Modern Diagnostic & Healthcare Center</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Serving Your Health Needs Is Our <span className="text-[#1e56a0]">Priority</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
              Experience world-class medical care with state-of-the-art diagnostic facilities and compassionate experts dedicated to your well-being.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="flex items-center justify-center space-x-2 bg-[#1e56a0] text-white px-8 py-4 rounded-full font-medium hover:bg-blue-800 transition-all shadow-[0_4px_14px_0_rgba(30,86,160,0.39)] hover:shadow-[0_6px_20px_rgba(30,86,160,0.23)] hover:-translate-y-0.5">
                <Calendar className="w-5 h-5" />
                <span>Make Appointment</span>
              </button>
              <button className="flex items-center justify-center space-x-2 bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-full font-medium hover:bg-gray-50 transition-all hover:border-gray-300">
                <span>Learn More</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative lg:ml-auto">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&q=80&w=800&h=900" 
                alt="Lead Medical Professional" 
                className="w-full object-cover rounded-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 sm:bottom-8 sm:-left-12 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/20 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Dr. Anna Lindemann</p>
                  <p className="text-xs text-gray-500">General Practitioner</p>
                </div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute top-12 -right-4 sm:-right-8 bg-white p-4 rounded-2xl shadow-xl">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-[#1e56a0]">24/7</span>
                <span className="text-xs text-gray-500 font-medium">Emergency Care</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
