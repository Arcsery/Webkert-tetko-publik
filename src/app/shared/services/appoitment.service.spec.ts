import { TestBed } from '@angular/core/testing';

import { AppoitmentService } from './appoitment.service';

describe('AppoitmentService', () => {
  let service: AppoitmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppoitmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
