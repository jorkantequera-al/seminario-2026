import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardHomeGuard } from './guard-home-guard';

describe('guardHomeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardHomeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
