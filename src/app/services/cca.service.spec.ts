import { TestBed } from '@angular/core/testing';

import { CcaService } from './cca.service';

describe('CcaService', () => {
  let service: CcaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CcaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
