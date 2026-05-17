import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { CapabilitiesComponent } from './capabilities.component';
import { CAPABILITIES } from '@core/data/capabilities.data';

describe('CapabilitiesComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapabilitiesComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CapabilitiesComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render one card per capability', () => {
    const fixture = TestBed.createComponent(CapabilitiesComponent);
    fixture.detectChanges();
    const cards = (fixture.nativeElement as HTMLElement).querySelectorAll('app-era-card');
    expect(cards.length).toBe(CAPABILITIES.length);
  });
});
