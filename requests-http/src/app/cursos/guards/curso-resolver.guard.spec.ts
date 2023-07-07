import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { cursoResolverGuard } from './curso-resolver.guard';

describe('cursoResolverGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => cursoResolverGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
