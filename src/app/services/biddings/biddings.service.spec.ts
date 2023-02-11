import { TestBed } from '@angular/core/testing';

import { BiddingsService } from './biddings.service';

describe('BiddingsService', () => {
  let service: BiddingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BiddingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
