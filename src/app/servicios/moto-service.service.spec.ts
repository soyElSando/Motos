import { TestBed } from '@angular/core/testing';

import { MotoServiceService } from './moto-service.service';

describe('MotoServiceService', () => {
  let service: MotoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
