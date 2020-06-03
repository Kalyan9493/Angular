import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewScheduledAnnouncementComponent } from './view-scheduled-announcement.component';

describe('ViewScheduledAnnouncementComponent', () => {
  let component: ViewScheduledAnnouncementComponent;
  let fixture: ComponentFixture<ViewScheduledAnnouncementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewScheduledAnnouncementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewScheduledAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
