export interface HeroContent {
  badge: string;
  title: string;
  highlightText: string;
  subtitle: string;
  ctaButtonText: string;
  secondaryButtonText: string;
  emergencyBadgeNumber: string;
  emergencyBadgeText: string;
  doctorCardName: string;
  doctorCardRole: string;
  heroImage: string;
}

export interface AboutContent {
  tag: string;
  title: string;
  description: string;
  reasons: string[];
  badgeTitle: string;
  badgeText: string;
  ctaText: string;
  image: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  bgColor: string;
  iconBg: string;
  linkUrl: string;
}

export interface ServicesContent {
  title: string;
  subtitle: string;
  items: ServiceItem[];
}

export interface StatItem {
  value: string;
  label: string;
}

export interface StatsContent {
  items: StatItem[];
}

export interface ArticleItem {
  id: string;
  title: string;
  category: string;
  image: string;
  date: string;
  author: string;
  linkUrl: string;
}

export interface ArticlesContent {
  title: string;
  subtitle: string;
  items: ArticleItem[];
}

export interface OpeningHourItem {
  days: string;
  hours: string;
  isEmergency: boolean;
}

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
}

export interface ContactContent {
  centerName: string;
  shortName: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  emergencyNote: string;
  openingHours: OpeningHourItem[];
  socialLinks: SocialLinks;
  copyrightText: string;
}

export interface SectionVisibility {
  hero: boolean;
  services: boolean;
  about: boolean;
  stats: boolean;
  doctors: boolean;
  articles: boolean;
  appointment: boolean;
}

export interface LandingContent {
  hero: HeroContent;
  about: AboutContent;
  services: ServicesContent;
  stats: StatsContent;
  articles: ArticlesContent;
  contact: ContactContent;
  sectionVisibility?: SectionVisibility;
  updatedAt?: string;
}

export interface SeoMetadata {
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  keywords: string;
  robots: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: string;
  twitterCard: string;
  twitterSite?: string;
  structuredData?: Record<string, any>;
}

export interface DoctorProfile {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  specialty: string;
  degree: string;
  rating: string;
  reviewsCount: string;
  image: string;
  bgColor: string;
  bio: string;
  availability: string;
  consultationFee: number;
  followUpFee: number;
  department: string;
  experience: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  reason?: string;
}

export interface DoctorAvailability {
  doctorId: string;
  doctorName: string;
  specialty: string;
  consultationFee: number;
  date: string;
  slots: TimeSlot[];
}

export interface BookAppointmentPayload {
  doctorId: string;
  appointmentDate: string;
  appointmentTime: string;
  name: string;
  phone: string;
  age?: number;
  gender?: string;
  visitReason?: string;
  notes?: string;
}

export interface BookingConfirmation {
  appointmentId: string;
  bookingReference: string;
  doctor: {
    id: string;
    name: string;
    specialty: string;
    consultationFee: number;
  };
  patient: {
    name: string;
    phone: string;
  };
  appointmentDate: string;
  appointmentTime: string;
  status: string;
  message: string;
}
