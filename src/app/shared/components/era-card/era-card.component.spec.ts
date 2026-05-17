import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { EraCardComponent } from './era-card.component';

describe('EraCardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EraCardComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  function setRequiredInputs(fixture: ReturnType<typeof TestBed.createComponent<EraCardComponent>>): void {
    fixture.componentRef.setInput('date', '2020 – 2022');
    fixture.componentRef.setInput('iconColor', 'cyan');
    fixture.componentRef.setInput('iconKey', 'code');
    fixture.componentRef.setInput('title', 'Test Era');
    fixture.componentRef.setInput('description', 'A description for testing.');
    fixture.componentRef.setInput('tags', ['Angular', 'TypeScript']);
  }

  it('should create with required inputs', () => {
    const fixture = TestBed.createComponent(EraCardComponent);
    setRequiredInputs(fixture);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render title and description', () => {
    const fixture = TestBed.createComponent(EraCardComponent);
    setRequiredInputs(fixture);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.era-title')?.textContent).toContain('Test Era');
    expect(el.querySelector('.era-desc')?.textContent).toContain('A description for testing.');
  });

  it('should render one pill per tag', () => {
    const fixture = TestBed.createComponent(EraCardComponent);
    setRequiredInputs(fixture);
    fixture.detectChanges();
    const pills = (fixture.nativeElement as HTMLElement).querySelectorAll('.pill-tag');
    expect(pills.length).toBe(2);
  });

  it('should hide footer when footerItems is empty', () => {
    const fixture = TestBed.createComponent(EraCardComponent);
    setRequiredInputs(fixture);
    fixture.detectChanges();
    const footer = (fixture.nativeElement as HTMLElement).querySelector('.era-footer');
    expect(footer).toBeNull();
  });

  it('should render footer items separated by dots', () => {
    const fixture = TestBed.createComponent(EraCardComponent);
    setRequiredInputs(fixture);
    fixture.componentRef.setInput('footerItems', ['One', 'Two', 'Three']);
    fixture.detectChanges();
    const dots = (fixture.nativeElement as HTMLElement).querySelectorAll('.dot');
    expect(dots.length).toBe(2);
  });
});
