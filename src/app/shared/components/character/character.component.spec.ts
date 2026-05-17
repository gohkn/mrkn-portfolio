import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { CharacterComponent } from './character.component';

describe('CharacterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CharacterComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the character image with alt text', () => {
    const fixture = TestBed.createComponent(CharacterComponent);
    fixture.detectChanges();
    const img = (fixture.nativeElement as HTMLElement).querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('alt')).toContain('Mr KN');
  });

  it('should provide a WebP source for modern browsers', () => {
    const fixture = TestBed.createComponent(CharacterComponent);
    fixture.detectChanges();
    const source = (fixture.nativeElement as HTMLElement).querySelector('source');
    expect(source?.getAttribute('type')).toBe('image/webp');
  });
});
