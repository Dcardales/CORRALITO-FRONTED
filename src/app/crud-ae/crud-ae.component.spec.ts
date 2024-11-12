import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRUDAEComponent } from './crud-ae.component';

describe('CRUDAEComponent', () => {
  let component: CRUDAEComponent;
  let fixture: ComponentFixture<CRUDAEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CRUDAEComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CRUDAEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
