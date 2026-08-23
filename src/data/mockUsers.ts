import { User } from '@/types/auth';

export const DEMO_USERS: User[] = [
  {
    id: 'user-01',
    name: 'Dr. Sarah Jenkins, MD',
    email: 'sarah.jenkins@kneesight.demo',
    role: 'Orthopedic Surgeon',
    organization: 'St. Jude Orthopedic Center',
    initials: 'SJ',
    status: 'online',
  },
  {
    id: 'user-02',
    name: 'Dr. Marcus Chen, MD',
    email: 'marcus.chen@kneesight.demo',
    role: 'Musculoskeletal Radiologist',
    organization: 'Metropolitan Imaging Institute',
    initials: 'MC',
    status: 'online',
  },
  {
    id: 'user-03',
    name: 'Dr. Elena Vance, PhD',
    email: 'elena.vance@kneesight.demo',
    role: 'Clinical Researcher',
    organization: 'BioMotion Knee Lab',
    initials: 'EV',
    status: 'online',
  },
];

export const DEFAULT_DEMO_USER = DEMO_USERS[0];
