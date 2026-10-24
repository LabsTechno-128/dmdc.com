import { useState, useEffect, type FC, type FormEvent } from 'react';
import { X, Calendar, Clock, User, Phone, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useLanding } from '../context/LandingContext';
import { fetchDoctorAvailability, bookAppointment } from '../api/landing';
import type { TimeSlot, BookingConfirmation } from '../types/landing';
import SafeImage from './SafeImage';

export const AppointmentModal: FC = () => {
  const {
    appointmentModalOpen,
    selectedDoctorId,
    closeAppointmentModal,
    doctors,
    isLoadingDoctors,
  } = useLanding();

  const [doctorId, setDoctorId] = useState<string>('');
  const [appointmentDate, setAppointmentDate] = useState<string>('');
  const [appointmentTime, setAppointmentTime] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('MALE');
  const [visitReason, setVisitReason] = useState<string>('');

  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState<boolean>(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);

  // Initialize selected doctor & default tomorrow date when modal opens
  useEffect(() => {
    if (appointmentModalOpen) {
      setConfirmation(null);
      setSubmitError(null);
      setSlotsError(null);

      // Pre-select doctor if provided or first available
      if (selectedDoctorId) {
        setDoctorId(selectedDoctorId);
      } else if (doctors.length > 0) {
        setDoctorId(doctors[0].id);
      }

      // Default date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateStr = tomorrow.toISOString().split('T')[0];
      setAppointmentDate(dateStr);
      setAppointmentTime('');
    }
  }, [appointmentModalOpen, selectedDoctorId, doctors]);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && appointmentModalOpen) {
        closeAppointmentModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [appointmentModalOpen, closeAppointmentModal]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (appointmentModalOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [appointmentModalOpen]);

  // Load availability slots when doctorId or appointmentDate changes
  useEffect(() => {
    if (!appointmentModalOpen || !doctorId || !appointmentDate) return;

    let isMounted = true;
    setIsLoadingSlots(true);
    setSlotsError(null);

    fetchDoctorAvailability(doctorId, appointmentDate)
      .then((availability) => {
        if (!isMounted) return;
        setSlots(availability.slots || []);
        // Reset selected time if current selection is not available
        const currentSlot = availability.slots.find((s) => s.time === appointmentTime);
        if (!currentSlot || !currentSlot.available) {
          // Auto select first available slot
          const firstAvail = availability.slots.find((s) => s.available);
          setAppointmentTime(firstAvail ? firstAvail.time : '');
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        console.warn('[AppointmentModal] Failed to load availability slots:', err);
        setSlotsError('Could not retrieve live availability. Please choose another date or contact us.');
        setSlots([]);
      })
      .finally(() => {
        if (isMounted) setIsLoadingSlots(false);
      });

    return () => {
      isMounted = false;
    };
  }, [appointmentModalOpen, doctorId, appointmentDate]);

  if (!appointmentModalOpen) return null;

  const selectedDoctor = doctors.find((d) => d.id === doctorId) || doctors[0];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!doctorId) {
      setSubmitError('Please select a doctor.');
      return;
    }
    if (!appointmentDate) {
      setSubmitError('Please select an appointment date.');
      return;
    }
    if (!appointmentTime) {
      setSubmitError('Please select an available time slot.');
      return;
    }
    if (!name.trim() || name.trim().length < 2) {
      setSubmitError('Please enter a valid patient name (at least 2 characters).');
      return;
    }
    if (!phone.trim() || phone.trim().length < 7) {
      setSubmitError('Please enter a valid phone number for booking confirmation.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await bookAppointment({
        doctorId,
        appointmentDate,
        appointmentTime,
        name: name.trim(),
        phone: phone.trim(),
        age: age ? parseInt(age, 10) : undefined,
        gender: gender || undefined,
        visitReason: visitReason.trim() || undefined,
      });

      setConfirmation(res);
    } catch (err: any) {
      console.warn('[AppointmentModal] Booking failed:', err);
      setSubmitError(err.message || 'Booking submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate date options for the next 14 days
  const dateOptions: { dateStr: string; label: string }[] = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const label = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    dateOptions.push({ dateStr, label });
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAppointmentModal();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="appointment-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden max-h-[92dvh] sm:max-h-[90vh] flex flex-col my-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-3.5 sm:py-5 border-b border-gray-100 bg-slate-50/70">
          <div className="min-w-0 pr-3">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#1e56a0] uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-[#1e56a0]"></span>
              <span>DMDC Healthcare</span>
            </div>
            <h3 id="appointment-modal-title" className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
              {confirmation ? 'Booking Confirmed' : 'Make An Appointment'}
            </h3>
          </div>
          <button
            onClick={closeAppointmentModal}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-200/50 rounded-full transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1 overscroll-contain">
          {confirmation ? (
            /* Success State */
            <div className="text-center py-4 sm:py-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Thank You, {confirmation.patient.name}!</h4>
              <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm leading-relaxed">
                {confirmation.message}
              </p>

              <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200/60 max-w-md mx-auto text-left mb-6 space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200/60">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Booking Ref</span>
                  <span className="font-mono text-sm font-bold text-[#1e56a0] bg-blue-50 px-2.5 py-1 rounded-md">
                    {confirmation.bookingReference}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Doctor</span>
                  <span className="font-semibold text-gray-900 text-right">{confirmation.doctor.name}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Specialty</span>
                  <span className="text-gray-700 text-right">{confirmation.doctor.specialty}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Date & Time</span>
                  <span className="font-semibold text-gray-900 text-right">{confirmation.appointmentDate} at {confirmation.appointmentTime}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Patient Phone</span>
                  <span className="text-gray-700 text-right">{confirmation.patient.phone}</span>
                </div>
                <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-200/60">
                  <span className="text-gray-500">Consultation Fee</span>
                  <span className="font-bold text-gray-900">${confirmation.doctor.consultationFee}</span>
                </div>
              </div>

              <button
                onClick={closeAppointmentModal}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#1e56a0] text-white rounded-full font-medium hover:bg-blue-800 transition-all shadow-md hover:shadow-lg min-h-[44px] cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {submitError && (
                <div className="flex items-start space-x-3 p-3.5 sm:p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl sm:rounded-2xl text-xs sm:text-sm">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* 1. Doctor Selection */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
                  Select Specialist Doctor *
                </label>
                {isLoadingDoctors ? (
                  <div className="p-4 bg-slate-50 rounded-xl sm:rounded-2xl flex items-center space-x-3 text-sm text-gray-500">
                    <Loader2 className="w-5 h-5 animate-spin text-[#1e56a0]" />
                    <span>Loading available doctors...</span>
                  </div>
                ) : (
                  <div className="relative">
                    <select
                      value={doctorId}
                      onChange={(e) => setDoctorId(e.target.value)}
                      className="w-full appearance-none bg-white border border-gray-300 rounded-xl sm:rounded-2xl px-4 py-3 pr-10 text-xs sm:text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#1e56a0] focus:border-transparent cursor-pointer min-h-[44px]"
                    >
                      {doctors.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {doc.name} — {doc.specialty} (${doc.consultationFee})
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                )}

                {/* Selected Doctor Summary Card */}
                {selectedDoctor && (
                  <div className="mt-3 p-3 sm:p-3.5 bg-blue-50/60 rounded-xl sm:rounded-2xl border border-blue-100 flex items-center space-x-3 sm:space-x-4">
                    <SafeImage
                      src={selectedDoctor.image}
                      alt={selectedDoctor.name}
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">{selectedDoctor.name}</p>
                      <p className="text-[11px] sm:text-xs text-[#1e56a0] font-medium truncate">{selectedDoctor.specialty} &bull; {selectedDoctor.degree}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-[10px] sm:text-xs text-gray-500">Fee</p>
                      <p className="text-xs sm:text-sm font-bold text-gray-900">${selectedDoctor.consultationFee}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Date Selection */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2 flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-[#1e56a0]" />
                  <span>Appointment Date *</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {dateOptions.slice(0, 8).map((opt) => {
                    const isSelected = appointmentDate === opt.dateStr;
                    return (
                      <button
                        type="button"
                        key={opt.dateStr}
                        onClick={() => setAppointmentDate(opt.dateStr)}
                        className={`p-2 sm:p-2.5 rounded-xl border text-xs font-medium text-center transition-all min-h-[42px] flex items-center justify-center cursor-pointer ${
                          isSelected
                            ? 'bg-[#1e56a0] text-white border-[#1e56a0] shadow-sm font-semibold'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-[#1e56a0]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Time Slot Selection */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2 flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-[#1e56a0]" />
                    <span>Select Time Slot *</span>
                  </span>
                  {isLoadingSlots && (
                    <span className="text-[11px] sm:text-xs text-gray-500 flex items-center space-x-1">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>Checking...</span>
                    </span>
                  )}
                </label>

                {slotsError ? (
                  <p className="text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-100">{slotsError}</p>
                ) : slots.length === 0 && !isLoadingSlots ? (
                  <p className="text-xs text-gray-500 bg-slate-50 p-3.5 sm:p-4 rounded-xl text-center">
                    No available time slots on this date. Please pick another date.
                  </p>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {slots.map((s) => {
                      const isSelected = appointmentTime === s.time;
                      return (
                        <button
                          type="button"
                          key={s.time}
                          disabled={!s.available}
                          onClick={() => setAppointmentTime(s.time)}
                          className={`py-2 px-1 text-center rounded-xl text-xs font-semibold transition-all min-h-[40px] flex items-center justify-center cursor-pointer ${
                            isSelected
                              ? 'bg-[#1e56a0] text-white shadow-sm'
                              : s.available
                              ? 'bg-slate-50 text-gray-800 border border-slate-200 hover:border-[#1e56a0]'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                          }`}
                        >
                          {s.time}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 4. Patient Information */}
              <div className="pt-2 border-t border-gray-100 space-y-3 sm:space-y-4">
                <h4 className="text-xs sm:text-sm font-semibold text-gray-900">Patient Details</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 pl-10 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e56a0] min-h-[42px]"
                      />
                      <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +1 555-0123"
                        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 pl-10 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e56a0] min-h-[42px]"
                      />
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Age (Optional)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="120"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="e.g. 35"
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e56a0] min-h-[42px]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Gender (Optional)
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e56a0] min-h-[42px] cursor-pointer"
                    >
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Reason for Consultation (Optional)
                  </label>
                  <input
                    type="text"
                    value={visitReason}
                    onChange={(e) => setVisitReason(e.target.value)}
                    placeholder="e.g. Routine checkup, chest discomfort, blood test follow up"
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e56a0] min-h-[42px]"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-gray-100 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeAppointmentModal}
                  className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors min-h-[44px] flex items-center justify-center cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !appointmentTime}
                  className="w-full sm:w-auto px-8 py-3 bg-[#1e56a0] text-white rounded-full text-sm font-semibold hover:bg-blue-800 transition-all shadow-[0_4px_14px_0_rgba(30,86,160,0.39)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 min-h-[44px] cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Confirming Booking...</span>
                    </>
                  ) : (
                    <span>Confirm Appointment</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
