import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideZonelessChangeDetection } from '@angular/core';

import { BottomNavComponent } from './bottom-nav.component';

describe('BottomNavComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomNavComponent],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BottomNavComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render five navigation items', () => {
    const fixture = TestBed.createComponent(BottomNavComponent);
    fixture.detectChanges();
    const items = (fixture.nativeElement as HTMLElement).querySelectorAll('.nav-item');
    expect(items.length).toBe(5);
  });

  it('should prevent default on scroll-to-top click', () => {
    const fixture = TestBed.createComponent(BottomNavComponent);
    const event = new MouseEvent('click');
    const spy = spyOn(event, 'preventDefault');
    fixture.componentInstance.scrollToTop(event);
    expect(spy).toHaveBeenCalled();
  });
});
