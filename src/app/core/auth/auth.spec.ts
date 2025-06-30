import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch token successfully', () => {
    const mockToken = 'test-token-123';
    const mockResponse = { access_token: mockToken };

    service.fetchToken().subscribe((token) => {
      expect(token).toBe(mockToken);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/token');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should return token observable', () => {
    const token$ = service.getToken$();
    expect(token$).toBeDefined();

    token$.subscribe((token) => {
      expect(token).toBeNull(); // Initial value
    });
  });

  it('should handle token fetch error', () => {
    service.fetchToken().subscribe({
      next: () => fail('Should have failed'),
      error: (error) => {
        expect(error).toBeDefined();
      },
    });

    const req = httpMock.expectOne('http://localhost:8080/api/token');
    req.flush('Error occurred', { status: 500, statusText: 'Server Error' });
  });

  /**
   * Testa o método getToken() que retorna o valor atual do token
   */
  it('should return current token value', () => {
    // Initially should be null
    expect(service.getToken()).toBeNull();

    // After fetching token, should return the token value
    const mockToken = 'test-token-456';
    const mockResponse = { access_token: mockToken };

    service.fetchToken().subscribe();

    const req = httpMock.expectOne('http://localhost:8080/api/token');
    req.flush(mockResponse);

    // Now should return the fetched token
    expect(service.getToken()).toBe(mockToken);
  });

  /**
   * Testa se o token observable é atualizado após fetchToken
   */
  it('should update token observable when token is fetched', () => {
    const mockToken = 'observable-test-token';
    const mockResponse = { access_token: mockToken };

    let observedToken: string | null = null;

    // Subscribe to token observable
    service.getToken$().subscribe((token) => {
      observedToken = token;
    });

    // Initially should be null
    expect(observedToken).toBeNull();

    // Fetch token
    service.fetchToken().subscribe();

    const req = httpMock.expectOne('http://localhost:8080/api/token');
    req.flush(mockResponse);

    // Observable should emit the new token
    expect(observedToken).toBe(mockToken);
  });
});
