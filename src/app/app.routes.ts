import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'Mr KN — Full-Stack Engineer',
  },
  {
    path: 'story',
    loadComponent: () => import('./features/story/story.component').then((m) => m.StoryComponent),
    title: 'My Story — Mr KN',
  },
  {
    path: 'capabilities',
    loadComponent: () =>
      import('./features/capabilities/capabilities.component').then((m) => m.CapabilitiesComponent),
    title: 'Capabilities — Mr KN',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact.component').then((m) => m.ContactComponent),
    title: 'Contact — Mr KN',
  },
  { path: '**', redirectTo: '' },
];
