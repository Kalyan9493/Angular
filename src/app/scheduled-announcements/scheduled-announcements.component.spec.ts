import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledAnnouncementsComponent } from './scheduled-announcements.component';

describe('ScheduledAnnouncementsComponent', () => {
  let component: ScheduledAnnouncementsComponent;
  let fixture: ComponentFixture<ScheduledAnnouncementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduledAnnouncementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
