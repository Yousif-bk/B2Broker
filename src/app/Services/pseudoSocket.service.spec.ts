import { TestBed } from '@angular/core/testing';
import { PseudoSocketService } from './pseudoSocket.service';


describe('ServicsService', () => {
  let service: PseudoSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PseudoSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
