/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { AdventureService } from './adventure.service';

describe('Service: Adventure', () => {
  beforeEach(() => {
    addProviders([AdventureService]);
  });

  it('should ...',
    inject([AdventureService],
      (service: AdventureService) => {
        expect(service).toBeTruthy();
      }));
});
