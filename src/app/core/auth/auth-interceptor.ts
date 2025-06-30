import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth';

/**
 * Interceptor de autenticação que adiciona o token Bearer nas requisições HTTP
 * @param req - Requisição HTTP interceptada
 * @param next - Próximo handler na cadeia de interceptors
 * @returns Observable da resposta HTTP
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // Adiciona o header Authorization apenas se o token existe e não está vazio
  if(token) {
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(authReq);
  }

  return next(req);
};
