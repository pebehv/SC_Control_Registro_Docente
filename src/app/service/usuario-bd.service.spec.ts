import { TestBed } from '@angular/core/testing';

import { UsuarioBdService } from './usuario-bd.service';

describe('UsuarioBdService', () => {
  let service: UsuarioBdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioBdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
