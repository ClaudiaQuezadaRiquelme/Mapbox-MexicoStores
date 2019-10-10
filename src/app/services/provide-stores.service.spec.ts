import { TestBed } from '@angular/core/testing';

import { ProvideStoresService } from './provide-stores.service';

describe('ProvideStoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProvideStoresService = TestBed.get(ProvideStoresService);
    expect(service).toBeTruthy();
  });
});
