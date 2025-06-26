import { TestBed } from '@angular/core/testing';

import { EntidadBdService } from './entidad-bd.service';

describe('EntidadBdService', () => {
  let service: EntidadBdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntidadBdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
