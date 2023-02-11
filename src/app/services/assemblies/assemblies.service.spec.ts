import { TestBed } from '@angular/core/testing';

import { AssembliesService } from './assemblies.service';

describe('AssembliesService', () => {
  let service: AssembliesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssembliesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
