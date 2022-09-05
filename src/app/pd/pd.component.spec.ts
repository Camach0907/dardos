import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdComponent } from './pd.component';

describe('PdComponent', () => {
  let component: PdComponent;
  let fixture: ComponentFixture<PdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
