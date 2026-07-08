import { Star } from 'lucide-react';

const doctors = [
  {
    name: 'Dr. Sarah Jenkins',
    specialty: 'Cardiologist',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=500',
    bgColor: 'bg-blue-50'
  },
  {
    name: 'Dr. Michael Chen',
    specialty: 'Neurologist',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=500',
    bgColor: 'bg-orange-50'
  },
  {
    name: 'Dr. Emily Watson',
    specialty: 'Pediatrician',
    rating: '5.0',
    image: 'https://images.unsplash.com/photo-1594824436998-d8ea05152823?auto=format&fit=crop&q=80&w=400&h=500',
    bgColor: 'bg-purple-50'
  },
  {
    name: 'Dr. James Martinez',
    specialty: 'Orthopedic Surgeon',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400&h=500',
    bgColor: 'bg-green-50'
  }
];

export default function Experts() {
  return (
    <section id="doctors" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Top Specialists</h2>
            <p className="text-lg text-gray-600">
              Our team of highly skilled medical professionals is dedicated to providing you with the highest standard of care.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <button className="text-[#1e56a0] font-semibold hover:text-blue-800 flex items-center space-x-2">
              <span>View All Doctors</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doctor, index) => (
            <div key={index} className="group rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white">
              <div className={`relative h-64 ${doctor.bgColor} pt-4 px-4 overflow-hidden`}>
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-full h-full object-cover object-top rounded-t-2xl transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
                <p className="text-[#1e56a0] font-medium mb-4">{doctor.specialty}</p>
                <div className="flex items-center justify-center space-x-1 mb-6 text-sm font-semibold text-gray-700">
                  <Star className="w-4 h-4 text-orange-400 fill-current" />
                  <span>{doctor.rating}</span>
                  <span className="text-gray-400 font-normal">(120+ Reviews)</span>
                </div>
                <button className="w-full py-3 rounded-full border border-gray-200 text-gray-700 font-semibold hover:bg-[#1e56a0] hover:text-white hover:border-[#1e56a0] transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
