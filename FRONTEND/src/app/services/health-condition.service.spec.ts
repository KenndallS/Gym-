import { TestBed } from '@angular/core/testing';

import { HealthConditionService } from './health-condition.service';

describe('HealthConditionService', () => {
  let service: HealthConditionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthConditionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
