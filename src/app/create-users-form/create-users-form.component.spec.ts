import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUsersFormComponent } from './create-users-form.component';

describe('CreateUsersFormComponent', () => {
  let component: CreateUsersFormComponent;
  let fixture: ComponentFixture<CreateUsersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUsersFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUsersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
