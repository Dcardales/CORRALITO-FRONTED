import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilesPComponent } from './perfiles-p.component';

describe('PerfilesPComponent', () => {
  let component: PerfilesPComponent;
  let fixture: ComponentFixture<PerfilesPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilesPComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerfilesPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
