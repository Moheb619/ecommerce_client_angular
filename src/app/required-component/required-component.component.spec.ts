import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredComponentComponent } from './required-component.component';

describe('RequiredComponentComponent', () => {
  let component: RequiredComponentComponent;
  let fixture: ComponentFixture<RequiredComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequiredComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequiredComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
