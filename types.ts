
export type Language = 'fr' | 'en' | 'de';

export enum ProjectCategory {
  ALL = 'Toutes',
  GALLERY = 'Galerie',
  LOGOTYPE = 'Logotype',
  BRANDING = 'Brand Identity',
  SOCIAL = 'Social Media Management',
  PACKAGING = 'Packaging',
  UIUX = 'UI/UX Web Design'
}

export interface Project {
  id: string;
  title: { fr: string; en: string; de: string };
  category: ProjectCategory;
  image: string; 
  mediaType: 'image' | 'video';
  description: { fr: string; en: string; de: string };
  caseStudy: { fr: string; en: string; de: string };
}

export interface BlogComment {
  id: string;
  author: string;
  text: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: { fr: string; en: string; de: string };
  content: { fr: string; en: string; de: string };
  date: string;
  image: string;
  mediaType: 'image' | 'video';
  likes: number;
  comments: BlogComment[];
}

export interface Appointment {
  id: string;
  name: string;
  email: string;
  date: string;
  time?: string; // Added time
  description?: string; // Added description
  services: string[];
  status: 'pending' | 'confirmed' | 'cancelled'; // Added cancelled
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  whatsapp: string;
}

export interface AppSettings {
  socialLinks: SocialLinks;
  logoTagline: { fr: string; en: string; de: string };
}

export interface AppState {
  projects: Project[];
  posts: BlogPost[];
  appointments: Appointment[];
  settings: AppSettings;
}
