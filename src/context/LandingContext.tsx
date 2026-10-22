import { createContext, useContext, useEffect, useState, useCallback, type FC, type ReactNode } from 'react';
import type { LandingContent, SeoMetadata, DoctorProfile } from '../types/landing';
import { fetchLandingContent, fetchSeoMetadata, fetchDoctors } from '../api/landing';
import { FALLBACK_LANDING_CONTENT, FALLBACK_SEO_METADATA } from '../data/fallbackContent';

interface LandingContextValue {
  content: LandingContent;
  seo: SeoMetadata;
  doctors: DoctorProfile[];
  isLoadingContent: boolean;
  isLoadingDoctors: boolean;
  contentError: string | null;
  doctorsError: string | null;
  appointmentModalOpen: boolean;
  selectedDoctorId: string | null;
  openAppointmentModal: (doctorId?: string) => void;
  closeAppointmentModal: () => void;
  refetchContent: () => Promise<void>;
  refetchDoctors: () => Promise<void>;
}

const LandingContext = createContext<LandingContextValue | undefined>(undefined);

export const LandingProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<LandingContent>(FALLBACK_LANDING_CONTENT);
  const [seo, setSeo] = useState<SeoMetadata>(FALLBACK_SEO_METADATA);
  const [doctors, setDoctors] = useState<DoctorProfile[]>([]);
  const [isLoadingContent, setIsLoadingContent] = useState(true);
  const [isLoadingDoctors, setIsLoadingDoctors] = useState(true);
  const [contentError, setContentError] = useState<string | null>(null);
  const [doctorsError, setDoctorsError] = useState<string | null>(null);

  // Appointment Modal State
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);

  const openAppointmentModal = useCallback((doctorId?: string) => {
    setSelectedDoctorId(doctorId || null);
    setAppointmentModalOpen(true);
  }, []);

  const closeAppointmentModal = useCallback(() => {
    setAppointmentModalOpen(false);
    setSelectedDoctorId(null);
  }, []);

  const loadContent = useCallback(async () => {
    setIsLoadingContent(true);
    setContentError(null);
    try {
      const [contentData, seoData] = await Promise.allSettled([
        fetchLandingContent(),
        fetchSeoMetadata(),
      ]);

      if (contentData.status === 'fulfilled') {
        setContent(contentData.value);
      } else {
        console.warn('[LandingProvider] Content fetch failed, using fallback copy:', contentData.reason);
        setContentError('Unable to sync live content; rendering cached baseline.');
      }

      if (seoData.status === 'fulfilled') {
        setSeo(seoData.value);
      } else {
        console.warn('[LandingProvider] SEO fetch failed, using fallback metadata:', seoData.reason);
      }
    } catch (err: any) {
      console.warn('[LandingProvider] Unexpected error loading content:', err);
      setContentError(err?.message || 'Failed to load content');
    } finally {
      setIsLoadingContent(false);
    }
  }, []);

  const loadDoctors = useCallback(async () => {
    setIsLoadingDoctors(true);
    setDoctorsError(null);
    try {
      const doctorsList = await fetchDoctors();
      setDoctors(doctorsList);
    } catch (err: any) {
      console.warn('[LandingProvider] Doctors fetch failed:', err);
      setDoctorsError(err?.message || 'Unable to retrieve specialists list');
    } finally {
      setIsLoadingDoctors(false);
    }
  }, []);

  useEffect(() => {
    loadContent();
    loadDoctors();
  }, [loadContent, loadDoctors]);

  return (
    <LandingContext.Provider
      value={{
        content,
        seo,
        doctors,
        isLoadingContent,
        isLoadingDoctors,
        contentError,
        doctorsError,
        appointmentModalOpen,
        selectedDoctorId,
        openAppointmentModal,
        closeAppointmentModal,
        refetchContent: loadContent,
        refetchDoctors: loadDoctors,
      }}
    >
      {children}
    </LandingContext.Provider>
  );
};

export function useLanding(): LandingContextValue {
  const ctx = useContext(LandingContext);
  if (!ctx) {
    throw new Error('useLanding must be used within a LandingProvider');
  }
  return ctx;
}
