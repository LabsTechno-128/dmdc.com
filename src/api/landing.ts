import { apiClient } from './client';
import type {
  LandingContent,
  SeoMetadata,
  DoctorProfile,
  DoctorAvailability,
  BookAppointmentPayload,
  BookingConfirmation,
} from '../types/landing';

export async function fetchLandingContent(): Promise<LandingContent> {
  return apiClient<LandingContent>('/landing/content');
}

export async function fetchSeoMetadata(): Promise<SeoMetadata> {
  return apiClient<SeoMetadata>('/landing/seo');
}

export async function fetchDoctors(params?: { search?: string; specialty?: string }): Promise<DoctorProfile[]> {
  const query = new URLSearchParams();
  if (params?.search) query.set('search', params.search);
  if (params?.specialty) query.set('specialty', params.specialty);
  const qStr = query.toString();
  return apiClient<DoctorProfile[]>(`/landing/doctors${qStr ? `?${qStr}` : ''}`);
}

export async function fetchDoctorAvailability(doctorId: string, date?: string): Promise<DoctorAvailability> {
  const query = date ? `?date=${encodeURIComponent(date)}` : '';
  return apiClient<DoctorAvailability>(`/landing/doctors/${doctorId}/availability${query}`);
}

export async function bookAppointment(payload: BookAppointmentPayload): Promise<BookingConfirmation> {
  return apiClient<BookingConfirmation>('/landing/appointments/book', {
    method: 'POST',
    body: JSON.stringify(payload),
    retries: 0,
  });
}
