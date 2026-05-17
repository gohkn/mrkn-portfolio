import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [provideZonelessChangeDetection(), provideAnimationsAsync()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should start with invalid form (empty required fields)', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
    // Access protected member through any-free pattern using component instance
    const component = fixture.componentInstance as unknown as {
      form: { invalid: boolean };
    };
    expect(component.form.invalid).toBe(true);
  });

  it('should default active swatch to white', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const component = fixture.componentInstance as unknown as {
      activeSwatch: () => string;
    };
    expect(component.activeSwatch()).toBe('white');
  });

  it('should update active swatch when selected', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const component = fixture.componentInstance as unknown as {
      selectSwatch: (c: string) => void;
      activeSwatch: () => string;
    };
    component.selectSwatch('cyan');
    expect(component.activeSwatch()).toBe('cyan');
  });
});
