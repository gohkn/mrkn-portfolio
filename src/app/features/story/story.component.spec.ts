import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { StoryComponent } from './story.component';
import { ERAS } from '@core/data/eras.data';

describe('StoryComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoryComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(StoryComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render one era card per data entry', () => {
    const fixture = TestBed.createComponent(StoryComponent);
    fixture.detectChanges();
    const cards = (fixture.nativeElement as HTMLElement).querySelectorAll('app-era-card');
    expect(cards.length).toBe(ERAS.length);
  });
});
