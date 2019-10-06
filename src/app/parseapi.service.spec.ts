import { TestBed } from '@angular/core/testing';

import { ParseapiService } from './parseapi.service';

describe('ParseapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParseapiService = TestBed.get(ParseapiService);
    expect(service).toBeTruthy();
  });
});
