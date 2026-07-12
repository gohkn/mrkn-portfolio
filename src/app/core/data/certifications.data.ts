import { Certification } from '../models/era.model';

export const CERTIFICATIONS: readonly Certification[] = [
  {
        name: 'Professional Cloud Developer Certification',
        issuer: 'Google Cloud',
        date: 'Dec 2025',
        iconColor: 'orange',
        iconKey: 'cloud',
        credentialUrl:
                'https://www.credly.com/badges/73e621c6-0df5-40de-ab96-988f03b09985/linked_in_profile',
  },
  {
        name: 'Associate Cloud Engineer Certification',
        issuer: 'Google Cloud',
        date: 'May 2025',
        iconColor: 'orange',
        iconKey: 'cloud',
        credentialUrl:
                'https://www.credly.com/badges/acd0a0b4-8d21-4b4b-8ae5-69caa9c87907/linked_in_profile',
  },
  {
        name: 'GitLab Certified CI/CD Associate',
        issuer: 'GitLab',
        date: 'Feb 2025',
        iconColor: 'purple',
        iconKey: 'settings',
        credentialUrl:
                'https://www.credly.com/badges/ef13751d-17eb-4300-8bc1-9e6bb59e9953/linked_in_profile',
  },
  {
        name: 'GitLab Certified Git Associate',
        issuer: 'GitLab',
        date: 'Nov 2024',
        iconColor: 'purple',
        iconKey: 'settings',
        credentialUrl:
                'https://www.credly.com/badges/b51f0542-5832-4557-abf6-69b914d17fb7/linked_in_profile',
  },
  {
        name: 'Professional Scrum Master™ I (PSM I)',
        issuer: 'Scrum.org',
        date: 'Dec 2024',
        iconColor: 'pink',
        iconKey: 'shield',
        credentialUrl:
                'https://www.credly.com/badges/8ee9744c-7499-429f-9186-f4cce90d77e9/linked_in_profile',
  },
  ] as const;
