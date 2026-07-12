import { Injectable } from '@angular/core';
import { IconKey } from '../models/era.model';

/**
 * Provides a lookup of icon path data keyed by `IconKey`.
 *
 * Why this exists:
 * - Avoids `bypassSecurityTrustHtml` in templates (SonarQube flags it as security-sensitive).
 * - Centralises icon paths; new icons go in one place.
 * - Strongly typed: invalid icon keys fail at compile time.
 *
 * The returned value is rendered through Angular's structural template directives,
 * not through `[innerHTML]`. See `<app-icon>` component.
 */
@Injectable({ providedIn: 'root' })
export class IconRegistryService {
  private readonly icons: Readonly<Record<IconKey, string[]>> = {
    code: ['M16 18l6-6-6-6', 'M8 6l-6 6 6 6'],
    grid: ['M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z'],
    cloud: ['M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z'],
    chart: ['M3 3v18h18', 'm19 9-5 5-4-4-3 3'],
    monitor: ['M2 3h20v14H2z', 'M8 21h8', 'M12 17v4'],
    database: [
      'M12 2c4.97 0 9 1.34 9 3v14c0 1.66-4.03 3-9 3s-9-1.34-9-3V5c0-1.66 4.03-3 9-3z',
      'M3 5c0 1.66 4.03 3 9 3s9-1.34 9-3',
      'M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3',
    ],
    settings: [
      'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
      'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z',
    ],
    shield: ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'],
  };

  getPaths(key: IconKey): readonly string[] {
    return this.icons[key];
  }
}
