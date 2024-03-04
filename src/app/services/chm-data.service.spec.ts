import { TestBed } from '@angular/core/testing';

import { ChmDataService } from './chm-data.service';

describe('ChmDataService', () => {
  let service: ChmDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChmDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
