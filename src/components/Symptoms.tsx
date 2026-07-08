import { CheckCircle2 } from 'lucide-react';

export default function Symptoms() {
  const reasons = [
    "World-class medical equipment and facilities",
    "Highly qualified and experienced specialists",
    "24/7 Emergency care and support",
    "Seamless online booking and consultation",
    "Accurate and fast diagnostic results",
    "Patient-centric approach to healthcare"
  ];

  return (
    <section id="about" className="py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <div className="relative">
            <div className="absolute inset-0 bg-[#1e56a0] rounded-[2rem] transform translate-x-4 translate-y-4 opacity-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800&h=900" 
              alt="Modern Hospital Facility" 
              className="relative rounded-[2rem] shadow-xl w-full object-cover h-[600px]"
            />
            
            {/* Quick Info Badge */}
            <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center space-x-4">
                <div className="bg-[#1e56a0] text-white p-3 rounded-full">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Fast Response</h4>
                  <p className="text-sm text-gray-600">Ambulance arrives in under 15 mins</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <div className="inline-flex items-center space-x-2 text-orange-500 font-semibold mb-4">
              <span>Why Choose Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              We Are Committed To Delivering The Best Medical Care
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our state-of-the-art facility combines cutting-edge medical technology with compassionate care to provide you with the most accurate diagnostics and effective treatments available.
            </p>

            <ul className="space-y-4 mb-8">
              {reasons.map((reason, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-[#1e56a0] flex-shrink-0 mr-3" />
                  <span className="text-gray-700 font-medium">{reason}</span>
                </li>
              ))}
            </ul>

            <button className="bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              Learn More About Us
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
