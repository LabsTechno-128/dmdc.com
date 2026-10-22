import { Star } from 'lucide-react';
import { useLanding } from '../context/LandingContext';
import SafeImage from './SafeImage';

export default function Experts() {
  const { doctors, isLoadingDoctors, doctorsError, openAppointmentModal } = useLanding();

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
            <button 
              onClick={() => openAppointmentModal()}
              className="text-[#1e56a0] font-semibold hover:text-blue-800 flex items-center space-x-2 cursor-pointer"
            >
              <span>View All Doctors</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Loading State Skeleton */}
        {isLoadingDoctors && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-3xl border border-gray-100 bg-white p-4 animate-pulse">
                <div className="h-60 bg-slate-100 rounded-2xl mb-4"></div>
                <div className="h-5 bg-slate-200 rounded-md w-3/4 mx-auto mb-2"></div>
                <div className="h-4 bg-slate-100 rounded-md w-1/2 mx-auto mb-4"></div>
                <div className="h-10 bg-slate-100 rounded-full w-full"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error or Empty State */}
        {!isLoadingDoctors && doctors.length === 0 && (
          <div className="text-center py-12 px-4 bg-slate-50 rounded-3xl border border-gray-100 max-w-xl mx-auto">
            <p className="text-gray-600 font-medium mb-3">
              {doctorsError || 'Specialist doctor schedules are currently being updated.'}
            </p>
            <button
              onClick={() => openAppointmentModal()}
              className="px-6 py-2.5 bg-[#1e56a0] text-white rounded-full text-sm font-semibold hover:bg-blue-800 transition-colors"
            >
              Inquire for Appointment
            </button>
          </div>
        )}

        {/* Real Doctors Grid from Backend API */}
        {!isLoadingDoctors && doctors.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {doctors.map((doctor, index) => (
              <div 
                key={doctor.id || index} 
                className="group rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white"
              >
                <div className={`relative h-64 ${doctor.bgColor || 'bg-blue-50'} pt-4 px-4 overflow-hidden`}>
                  <SafeImage 
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
                    <span>{doctor.rating || '4.9'}</span>
                    <span className="text-gray-400 font-normal">({doctor.reviewsCount || '120+ Reviews'})</span>
                  </div>
                  <button 
                    onClick={() => openAppointmentModal(doctor.id)}
                    className="w-full py-3 rounded-full border border-gray-200 text-gray-700 font-semibold hover:bg-[#1e56a0] hover:text-white hover:border-[#1e56a0] transition-colors cursor-pointer"
                  >
                    Book Consultation
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
