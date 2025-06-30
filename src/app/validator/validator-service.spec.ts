import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ValidatorService } from './validator-service';
import {
  ValidatePasswordRequest,
  ValidatePasswordResponse,
} from './models/validatePassword';

describe('ValidatorService', () => {
  let service: ValidatorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ValidatorService],
    });
    service = TestBed.inject(ValidatorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should validate password successfully', () => {
    const mockRequest: ValidatePasswordRequest = { password: 'Test123!' };
    const mockResponse: ValidatePasswordResponse = {
      isValid: true,
      messages: [],
    };

    service.validatePassword(mockRequest).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8082/validar');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ request: mockRequest });
    req.flush(mockResponse);
  });

  it('should handle validation errors', () => {
    const mockRequest: ValidatePasswordRequest = { password: 'weak' };
    const mockResponse: ValidatePasswordResponse = {
      isValid: false,
      messages: ['Senha muito fraca', 'Precisa de números'],
    };

    service.validatePassword(mockRequest).subscribe((response) => {
      expect(response.isValid).toBeFalsy();
      expect(response.messages?.length).toBe(2);
    });

    const req = httpMock.expectOne('http://localhost:8082/validar');
    req.flush(mockResponse);
  });

  it('should handle HTTP errors', () => {
    const mockRequest: ValidatePasswordRequest = { password: 'test' };

    service.validatePassword(mockRequest).subscribe({
      next: () => fail('Should have failed'),
      error: (error) => {
        expect(error).toBeDefined();
      },
    });

    const req = httpMock.expectOne('http://localhost:8082/validar');
    req.flush('Server error', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });

  /**
   * Testes adicionais para aumentar cobertura
   */
  it('should handle network timeout errors', () => {
    const mockRequest: ValidatePasswordRequest = { password: 'test' };

    service.validatePassword(mockRequest).subscribe({
      next: () => fail('Should have failed'),
      error: (error) => {
        expect(error).toBeDefined();
      },
    });

    const req = httpMock.expectOne('http://localhost:8082/validar');
    req.flush('Request timeout', {
      status: 408,
      statusText: 'Request Timeout',
    });
  });

  it('should handle unauthorized errors', () => {
    const mockRequest: ValidatePasswordRequest = { password: 'test' };

    service.validatePassword(mockRequest).subscribe({
      next: () => fail('Should have failed'),
      error: (error) => {
        expect(error).toBeDefined();
      },
    });

    const req = httpMock.expectOne('http://localhost:8082/validar');
    req.flush('Unauthorized', {
      status: 401,
      statusText: 'Unauthorized',
    });
  });

  it('should handle bad request errors', () => {
    const mockRequest: ValidatePasswordRequest = { password: 'test' };

    service.validatePassword(mockRequest).subscribe({
      next: () => fail('Should have failed'),
      error: (error) => {
        expect(error).toBeDefined();
      },
    });

    const req = httpMock.expectOne('http://localhost:8082/validar');
    req.flush(
      { error: 'Invalid request format' },
      {
        status: 400,
        statusText: 'Bad Request',
      }
    );
  });

  it('should handle empty password validation', () => {
    const mockRequest: ValidatePasswordRequest = { password: '' };
    const mockResponse: ValidatePasswordResponse = {
      isValid: false,
      messages: ['Senha é obrigatória'],
    };

    service.validatePassword(mockRequest).subscribe((response) => {
      expect(response.isValid).toBeFalsy();
      expect(response.messages).toContain('Senha é obrigatória');
    });

    const req = httpMock.expectOne('http://localhost:8082/validar');
    expect(req.request.body).toEqual({ request: mockRequest });
    req.flush(mockResponse);
  });

  it('should handle very long password validation', () => {
    const longPassword = 'a'.repeat(1000); // 1000 character password
    const mockRequest: ValidatePasswordRequest = { password: longPassword };
    const mockResponse: ValidatePasswordResponse = {
      isValid: false,
      messages: ['Senha muito longa'],
    };

    service.validatePassword(mockRequest).subscribe((response) => {
      expect(response.isValid).toBeFalsy();
      expect(response.messages).toContain('Senha muito longa');
    });

    const req = httpMock.expectOne('http://localhost:8082/validar');
    expect(req.request.body.request.password).toBe(longPassword);
    req.flush(mockResponse);
  });

  it('should handle response with multiple validation messages', () => {
    const mockRequest: ValidatePasswordRequest = { password: 'abc' };
    const mockResponse: ValidatePasswordResponse = {
      isValid: false,
      messages: [
        'Senha deve ter pelo menos 8 caracteres',
        'Senha deve conter pelo menos uma letra maiúscula',
        'Senha deve conter pelo menos um número',
        'Senha deve conter pelo menos um caractere especial',
      ],
    };

    service.validatePassword(mockRequest).subscribe((response) => {
      expect(response.isValid).toBeFalsy();
      expect(response.messages?.length).toBe(4);
      expect(response.messages).toEqual(
        expect.arrayContaining([
          'Senha deve ter pelo menos 8 caracteres',
          'Senha deve conter pelo menos uma letra maiúscula',
          'Senha deve conter pelo menos um número',
          'Senha deve conter pelo menos um caractere especial',
        ])
      );
    });

    const req = httpMock.expectOne('http://localhost:8082/validar');
    req.flush(mockResponse);
  });

  it('should handle response without messages array', () => {
    const mockRequest: ValidatePasswordRequest = { password: 'test' };
    const mockResponse: ValidatePasswordResponse = {
      isValid: true,
      // No messages property
    };

    service.validatePassword(mockRequest).subscribe((response) => {
      expect(response.isValid).toBeTruthy();
      expect(response.messages).toBeUndefined();
    });

    const req = httpMock.expectOne('http://localhost:8082/validar');
    req.flush(mockResponse);
  });
});
