import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachTaskComponent } from './each-task.component';

describe('EachTaskComponent', () => {
  let component: EachTaskComponent;
  let fixture: ComponentFixture<EachTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EachTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EachTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
