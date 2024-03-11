import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimPoapComponent } from './claim-poap.component';

describe('ClaimPoapComponent', () => {
  let component: ClaimPoapComponent;
  let fixture: ComponentFixture<ClaimPoapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClaimPoapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClaimPoapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
