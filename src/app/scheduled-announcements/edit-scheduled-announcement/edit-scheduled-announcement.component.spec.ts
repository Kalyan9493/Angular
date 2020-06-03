import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditScheduledAnnouncementComponent } from './edit-scheduled-announcement.component';

describe('EditScheduledAnnouncementComponent', () => {
  let component: EditScheduledAnnouncementComponent;
  let fixture: ComponentFixture<EditScheduledAnnouncementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditScheduledAnnouncementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditScheduledAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
