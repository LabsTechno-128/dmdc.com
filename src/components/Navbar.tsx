import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanding } from '../context/LandingContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { content, openAppointmentModal } = useLanding();
  const contact = content.contact;

  // Close mobile drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 sm:h-20 items-center">
            <a href="#" className="flex-shrink-0 flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1e56a0] rounded-lg">
              <img src="/logo.jpeg" alt="Logo" className="h-9 sm:h-10 w-auto mr-2 rounded-md object-contain" />
              <span className="text-xl sm:text-2xl font-bold text-[#1e56a0] tracking-tight">{contact.shortName || 'DMDC'}</span>
            </a>

            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <a href="#services" className="text-gray-600 hover:text-[#1e56a0] font-medium transition-colors focus:outline-none focus-visible:text-[#1e56a0]">Services</a>
              <a href="#about" className="text-gray-600 hover:text-[#1e56a0] font-medium transition-colors focus:outline-none focus-visible:text-[#1e56a0]">About</a>
              <a href="#doctors" className="text-gray-600 hover:text-[#1e56a0] font-medium transition-colors focus:outline-none focus-visible:text-[#1e56a0]">Doctors</a>
              <a href="#articles" className="text-gray-600 hover:text-[#1e56a0] font-medium transition-colors focus:outline-none focus-visible:text-[#1e56a0]">Articles</a>
              <button 
                onClick={() => openAppointmentModal()}
                className="bg-[#1e56a0] text-white px-5 sm:px-6 py-2.5 rounded-full font-medium hover:bg-blue-800 transition-all shadow-[0_4px_14px_0_rgba(30,86,160,0.39)] hover:shadow-[0_6px_20px_rgba(30,86,160,0.23)] hover:-translate-y-0.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1e56a0]"
              >
                Portal
              </button>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 -mr-2 text-gray-600 hover:text-[#1e56a0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1e56a0] rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer transition-colors"
                aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-xl max-h-[calc(100dvh-4rem)] sm:max-h-[calc(100dvh-5rem)] overflow-y-auto">
            <div className="px-4 pt-3 pb-6 space-y-1">
              <a 
                href="#services" 
                onClick={() => setIsOpen(false)}
                className="flex items-center px-3 py-3 text-base font-medium text-gray-700 hover:text-[#1e56a0] hover:bg-blue-50/60 rounded-xl transition-colors min-h-[44px]"
              >
                Services
              </a>
              <a 
                href="#about" 
                onClick={() => setIsOpen(false)}
                className="flex items-center px-3 py-3 text-base font-medium text-gray-700 hover:text-[#1e56a0] hover:bg-blue-50/60 rounded-xl transition-colors min-h-[44px]"
              >
                About
              </a>
              <a 
                href="#doctors" 
                onClick={() => setIsOpen(false)}
                className="flex items-center px-3 py-3 text-base font-medium text-gray-700 hover:text-[#1e56a0] hover:bg-blue-50/60 rounded-xl transition-colors min-h-[44px]"
              >
                Doctors
              </a>
              <a 
                href="#articles" 
                onClick={() => setIsOpen(false)}
                className="flex items-center px-3 py-3 text-base font-medium text-gray-700 hover:text-[#1e56a0] hover:bg-blue-50/60 rounded-xl transition-colors min-h-[44px]"
              >
                Articles
              </a>
              <div className="pt-3 px-1">
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    openAppointmentModal();
                  }}
                  className="w-full bg-[#1e56a0] text-white px-6 py-3.5 rounded-full font-medium hover:bg-blue-800 transition-colors shadow-md min-h-[48px] flex items-center justify-center cursor-pointer"
                >
                  Portal
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Backdrop overlay for mobile menu */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-slate-900/30 backdrop-blur-xs md:hidden"
          aria-hidden="true"
        />
      )}
    </>
  );
}
