import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { authInterceptor } from './auth-interceptor';

/**
 * Testes para o interceptor de autenticação
 * Verifica se o token de autorização é adicionado corretamente nas requisições
 */
describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);

    // Limpa o localStorage antes de cada teste
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  /**
   * Testa se o token é adicionado quando existe no localStorage
   */
  it('should add authorization header when token exists', () => {
    // Given - token no localStorage
    const token = 'test-token-123';
    localStorage.setItem('access_token', token);

    // When - faz uma requisição HTTP
    httpClient.get('/test').subscribe();

    // Then - verifica se o header Authorization foi adicionado
    const req = httpMock.expectOne('/test');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);

    req.flush({ success: true });
  });

  /**
   * Testa se a requisição passa sem modificação quando não há token
   */
  it('should not add authorization header when token does not exist', () => {
    // Given - sem token no localStorage
    expect(localStorage.getItem('access_token')).toBeNull();

    // When - faz uma requisição HTTP
    httpClient.get('/test').subscribe();

    // Then - verifica se não há header Authorization
    const req = httpMock.expectOne('/test');
    expect(req.request.headers.get('Authorization')).toBeNull();

    req.flush({ success: true });
  });

  /**
   * Testa se não adiciona header quando token está vazio ou contém apenas espaços
   */
  it('should not add authorization header when token is empty or whitespace', () => {
    // Given - token vazio
    localStorage.setItem('access_token', '');
    httpClient.get('/test1').subscribe();

    // Given - token com apenas espaços
    localStorage.setItem('access_token', '   ');
    httpClient.get('/test2').subscribe();

    // Then - verifica se não há header Authorization em ambos os casos
    const req1 = httpMock.expectOne('/test1');
    const req2 = httpMock.expectOne('/test2');

    expect(req1.request.headers.get('Authorization')).toBeNull();
    expect(req2.request.headers.get('Authorization')).toBeNull();

    req1.flush({ success: true });
    req2.flush({ success: true });
  });
});
