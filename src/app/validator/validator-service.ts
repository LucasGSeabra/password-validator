import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ValidatePasswordRequest,
  ValidatePasswordResponse,
} from './models/validatePassword';
import { environment } from '../../environments/environment';

/**
 * Serviço responsável pela comunicação com a API de validação de senhas
 *
 * Este serviço encapsula todas as operações relacionadas à validação de senhas,
 * fornecendo uma interface limpa para comunicação com o backend.
 *
 * Funcionalidades:
 * - Envio de senhas para validação
 * - Tratamento de respostas da API
 * - Gerenciamento de erros de comunicação
 *
 * @service
 * @injectable
 * @providedIn 'root'
 *
 * @example
 * ```typescript
 * constructor(private validatorService: ValidatorService) {}
 *
 * validatePassword(password: string) {
 *   this.validatorService.validatePassword({ password })
 *     .subscribe({
 *       next: (response) => console.log('Validation result:', response),
 *       error: (error) => console.error('Validation failed:', error)
 *     });
 * }
 * ```
 *
 * @author Lucas Gimenez
 * @version 1.0.0
 * @since 2025-06-29
 */
@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  /**
   * URL da API de validação de senhas
   *
   * @private
   * @readonly
   * @type {string}
   * @default 'http://localhost:8080/validar'
   */
  private readonly apiUrl = `${environment.api_url}/validar`;

  /**
   * Construtor do ValidatorService
   *
   * @param {HttpClient} http - Cliente HTTP do Angular para comunicação com APIs
   */
  constructor(private http: HttpClient) {}

  /**
   * Valida uma senha enviando-a para a API de validação
   *
   * Este método envia a senha para o servidor que aplicará as regras de validação
   * definidas (comprimento, caracteres especiais, maiúsculas, minúsculas, números, etc.)
   *
   * @method
   * @param {ValidatePasswordRequest} request - Objeto contendo a senha a ser validada
   * @returns {Observable<ValidatePasswordResponse>} Observable que emite o resultado da validação
   *
   * @example
   * ```typescript
   * const request: ValidatePasswordRequest = { password: 'MinhaSenh@123' };
   *
   * this.validatorService.validatePassword(request).subscribe({
   *   next: (response: ValidatePasswordResponse) => {
   *     if (response.isValid) {
   *       console.log('Senha válida!');
   *     } else {
   *       console.log('Erros encontrados:', response.messages);
   *     }
   *   },
   *   error: (error) => {
   *     console.error('Erro na validação:', error);
   *   }
   * });
   * ```
   *
   * @throws {HttpErrorResponse} Quando ocorre erro na comunicação com a API
   *
   * @see {@link ValidatePasswordRequest} Para estrutura da requisição
   * @see {@link ValidatePasswordResponse} Para estrutura da resposta
   */
  validatePassword(
    request: ValidatePasswordRequest
  ): Observable<ValidatePasswordResponse> {
    return this.http.post<ValidatePasswordResponse>(this.apiUrl, {
      ...request,
    });
  }
}
