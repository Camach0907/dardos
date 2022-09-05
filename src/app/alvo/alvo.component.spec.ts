import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlvoComponent } from './alvo.component';

describe('AlvoComponent', () => {
  let component: AlvoComponent;
  let fixture: ComponentFixture<AlvoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlvoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlvoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
