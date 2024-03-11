import { TestBed } from '@angular/core/testing';

import { WideService } from './wide.service';

describe('WideService', () => {
  let service: WideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
