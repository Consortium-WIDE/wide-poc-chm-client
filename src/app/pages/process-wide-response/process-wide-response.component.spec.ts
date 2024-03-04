import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessWideResponseComponent } from './process-wide-response.component';

describe('ProcessWideResponseComponent', () => {
  let component: ProcessWideResponseComponent;
  let fixture: ComponentFixture<ProcessWideResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessWideResponseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessWideResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
