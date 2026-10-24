import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useLanding } from '../context/LandingContext';

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);
const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
);
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
);
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
);

import type { OpeningHourItem } from '../types/landing';

interface OpeningHourSlot {
  days: string;
  hours: string;
  isEmergency?: boolean;
}

function parseOpeningHours(raw?: OpeningHourItem[] | string | any, emergencyNote?: string): OpeningHourSlot[] {
  let slots: OpeningHourSlot[] = [];

  if (Array.isArray(raw)) {
    slots = raw.map((item) => {
      if (typeof item === 'string') {
        const colonIdx = item.indexOf(':');
        const isTimeColon = /^\s*\d+[:.]\d+/.test(item);
        if (colonIdx !== -1 && !isTimeColon) {
          return {
            days: item.slice(0, colonIdx).trim(),
            hours: item.slice(colonIdx + 1).trim(),
            isEmergency: false,
          };
        }
        return { days: 'Visiting Hours', hours: item.trim(), isEmergency: false };
      }
      return {
        days: item?.days || item?.day || 'Visiting Hours',
        hours: item?.hours || item?.time || '',
        isEmergency: Boolean(item?.isEmergency),
      };
    });
  } else if (typeof raw === 'string' && raw.trim()) {
    const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    if (lines.length > 1) {
      slots = lines.map((line) => {
        const colonIdx = line.indexOf(':');
        const isTimeColon = /^\s*\d+[:.]\d+/.test(line);
        if (colonIdx !== -1 && !isTimeColon) {
          return {
            days: line.slice(0, colonIdx).trim(),
            hours: line.slice(colonIdx + 1).trim(),
            isEmergency: false,
          };
        }
        return { days: 'Visiting Hours', hours: line, isEmergency: false };
      });
    } else {
      const line = raw.trim();
      const colonIdx = line.indexOf(':');
      const isTimeColon = /^\s*\d+[:.]\d+/.test(line);
      if (colonIdx !== -1 && !isTimeColon) {
        slots = [{
          days: line.slice(0, colonIdx).trim(),
          hours: line.slice(colonIdx + 1).trim(),
          isEmergency: false,
        }];
      } else {
        slots = [{
          days: 'Visiting Hours',
          hours: line,
          isEmergency: false,
        }];
      }
    }
  } else if (typeof raw === 'object' && raw !== null) {
    slots = [{
      days: raw.days || raw.day || 'Visiting Hours',
      hours: raw.hours || raw.time || '',
      isEmergency: Boolean(raw.isEmergency),
    }];
  }

  if (slots.length === 0) {
    slots = [
      { days: 'Monday - Friday', hours: '8:00 AM - 8:00 PM', isEmergency: false },
      { days: 'Saturday', hours: '9:00 AM - 6:00 PM', isEmergency: false },
    ];
  }

  if (emergencyNote && !slots.some((s) => s.isEmergency || s.days.toLowerCase().includes('emergency'))) {
    slots.push({
      days: 'Emergency Care',
      hours: emergencyNote,
      isEmergency: true,
    });
  }

  return slots;
}

export default function Footer() {
  const { content } = useLanding();
  const contact = content?.contact || ({} as any);
  const social = contact.socialLinks || {};
  const openingHoursList = parseOpeningHours(contact.openingHours, contact.emergencyNote);

  return (
    <footer className="bg-gray-900 text-white pt-14 sm:pt-20 pb-8 sm:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 mb-12 sm:mb-16">

          {/* Brand Col */}
          <div className="space-y-5 sm:space-y-6">
            <span className="text-base sm:text-lg font-bold text-white block tracking-tight">
              {contact.centerName || 'Dr. Muazzam Medical Diagnostic Center'}
            </span>
            <p className="text-gray-400 leading-relaxed text-sm max-w-sm">
              {contact.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <a 
                href={social.facebook || '#'} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                className="w-11 h-11 flex items-center justify-center bg-white/10 rounded-full hover:bg-[#1e56a0] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a 
                href={social.twitter || '#'} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Twitter / X"
                className="w-11 h-11 flex items-center justify-center bg-white/10 rounded-full hover:bg-[#1e56a0] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a 
                href={social.instagram || '#'} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="w-11 h-11 flex items-center justify-center bg-white/10 rounded-full hover:bg-[#1e56a0] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a 
                href={social.linkedin || '#'} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                className="w-11 h-11 flex items-center justify-center bg-white/10 rounded-full hover:bg-[#1e56a0] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white tracking-tight">Contact Us</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start space-x-3 text-sm text-gray-400">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{contact.address}</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-400">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a href={`tel:${contact.phone}`} className="hover:text-white transition-colors py-1 min-h-[36px] flex items-center break-all">
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-400">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors py-1 min-h-[36px] flex items-center break-all">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white tracking-tight">Opening Hours</h3>
            <ul className="space-y-3 sm:space-y-4">
              {openingHoursList.map((slot, index) => (
                <li
                  key={index}
                  className={`flex flex-wrap sm:flex-nowrap items-baseline justify-between gap-2 text-sm ${
                    index < openingHoursList.length - 1 ? 'border-b border-white/10 pb-2.5' : ''
                  }`}
                >
                  <span className="text-gray-400 flex-shrink-0">{slot.days}</span>
                  <span className={`text-right ${slot.isEmergency ? 'text-blue-400 font-bold' : 'text-white font-medium'} break-words`}>
                    {slot.hours}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-4 text-center sm:text-left">
          <p>&copy; {new Date().getFullYear()} {contact.copyrightText || 'DMDC. All rights reserved.'}</p>
          <div className="flex flex-wrap justify-center sm:justify-end gap-6">
            <a href="#" className="hover:text-white transition-colors py-1 min-h-[32px] flex items-center">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors py-1 min-h-[32px] flex items-center">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
