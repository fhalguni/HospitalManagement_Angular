import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookAppointmentComponent } from './add-book-appointment.component';

describe('AddBookAppointmentComponent', () => {
  let component: AddBookAppointmentComponent;
  let fixture: ComponentFixture<AddBookAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBookAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBookAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
