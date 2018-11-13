import { TestBed, inject } from '@angular/core/testing';

import { CygNetApiService } from './cygnet-api.service';

describe('CygnetApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CygNetApiService]
    });
  });

  it('should be created', inject([CygNetApiService], (service: CygNetApiService) => {
    expect(service).toBeTruthy();
  }));
});
