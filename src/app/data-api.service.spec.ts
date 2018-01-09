import { TestBed, inject } from '@angular/core/testing';

import { DataAPIService } from './data-api.service';

describe('DataApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataAPIService]
    });
  });

  it('should be created', inject([DataAPIService], (service: DataAPIService) => {
    expect(service).toBeTruthy();
  }));
});
