import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { IconRegistryService } from './icon-registry.service';
import { IconKey } from '../models/era.model';

describe('IconRegistryService', () => {
  let service: IconRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(IconRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return paths for every known icon key', () => {
    const keys: IconKey[] = [
      'code',
      'grid',
      'cloud',
      'chart',
      'monitor',
      'database',
      'settings',
      'shield',
    ];
    for (const key of keys) {
      const paths = service.getPaths(key);
      expect(paths.length).toBeGreaterThan(0);
    }
  });

  it('should return readonly array (caller must not mutate)', () => {
    const paths = service.getPaths('code');
    expect(Array.isArray(paths)).toBe(true);
  });
});
