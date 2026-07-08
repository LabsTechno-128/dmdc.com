import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-[#1e56a0]">CareDiagnostic</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-gray-600 hover:text-[#1e56a0] font-medium transition-colors">Services</a>
            <a href="#about" className="text-gray-600 hover:text-[#1e56a0] font-medium transition-colors">About</a>
            <a href="#doctors" className="text-gray-600 hover:text-[#1e56a0] font-medium transition-colors">Doctors</a>
            <a href="#articles" className="text-gray-600 hover:text-[#1e56a0] font-medium transition-colors">Articles</a>
            <button className="bg-[#1e56a0] text-white px-6 py-2.5 rounded-full font-medium hover:bg-blue-800 transition-all shadow-[0_4px_14px_0_rgba(30,86,160,0.39)] hover:shadow-[0_6px_20px_rgba(30,86,160,0.23)] hover:-translate-y-0.5">
              Portal
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-[#1e56a0] focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <a href="#services" className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-[#1e56a0] hover:bg-gray-50 rounded-md">Services</a>
            <a href="#about" className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-[#1e56a0] hover:bg-gray-50 rounded-md">About</a>
            <a href="#doctors" className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-[#1e56a0] hover:bg-gray-50 rounded-md">Doctors</a>
            <a href="#articles" className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-[#1e56a0] hover:bg-gray-50 rounded-md">Articles</a>
            <div className="pt-4 px-3">
              <button className="w-full bg-[#1e56a0] text-white px-6 py-3 rounded-full font-medium hover:bg-blue-800 transition-colors">
                Portal
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
