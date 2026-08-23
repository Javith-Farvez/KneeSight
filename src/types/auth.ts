export type UserRole =
  | 'Orthopedic Surgeon'
  | 'Musculoskeletal Radiologist'
  | 'Clinical Researcher'
  | 'Resident / Fellow'
  | 'Clinical Specialist';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization: string;
  initials: string;
  avatarUrl?: string;
  status?: 'online' | 'in-surgery' | 'offline';
}

export interface SignupData {
  name: string;
  role: UserRole;
  organization: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms?: boolean;
}
