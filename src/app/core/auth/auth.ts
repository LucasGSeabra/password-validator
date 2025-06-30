import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, shareReplay, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * Serviço responsável pela comunicação com a API de autenticação
 *
 * Este serviço encapsula todas as operações relacionadas à autenticação da aplicação,
 * fornecendo uma interface limpa para comunicação com o backend.
 *
 * Funcionalidades:
 * - Solicitação de token de autenticação
 * - Armazenamento e fornecimento do token atual
 * - Compartilhamento reativo do token com outros componentes
 *
 * @service
 * @injectable
 * @providedIn 'root'
 *
 * @example
 * ```typescript
 * constructor(private authService: AuthService) {}
 *
 * ngOnInit() {
 *   this.authService.fetchToken().subscribe({
 *     next: (token) => console.log('Token obtido:', token),
 *     error: (err) => console.error('Erro ao obter token:', err)
 *   });
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
export class AuthService {
  /**
   * URL da API de autenticação
   *
   * @private
   * @readonly
   * @type {string}
   * @default 'http://localhost:8080/auth/token'
   */
  private readonly tokenUrl = `${environment.api_url}/auth/token`;

  /**
   * Subject responsável por armazenar e emitir o token atual
   *
   * @private
   * @type {BehaviorSubject<string | null>}
   */
  private tokenSubject = new BehaviorSubject<string | null>(null);

  /**
   * Construtor do AuthService
   *
   * @param {HttpClient} http - Cliente HTTP do Angular para comunicação com APIs
   */
  constructor(private http: HttpClient) {}

  /**
   * Retorna o token atual armazenado localmente
   *
   * @method
   * @returns {string | null} Token atual ou null se não estiver disponível
   *
   * @example
   * ```typescript
   * const token = this.authService.getToken();
   * ```
   */
  getToken(): string | null {
    return this.tokenSubject.value;
  }

  /**
   * Requisita um novo token à API de autenticação
   *
   * Este método envia uma requisição POST para a API e, ao obter sucesso,
   * atualiza o token armazenado localmente.
   *
   * @method
   * @returns {Observable<string>} Observable que emite o token de autenticação
   *
   * @example
   * ```typescript
   * this.authService.fetchToken().subscribe({
   *   next: (token: string) => console.log('Token recebido:', token),
   *   error: (error) => console.error('Erro ao buscar token:', error)
   * });
   * ```
   *
   * @throws {HttpErrorResponse} Quando ocorre erro na comunicação com a API
   */
  fetchToken(): Observable<string> {
    return this.http.post<{ access_token: string }>(this.tokenUrl, {}).pipe(
      map((response) => response.access_token),
      tap((token) => this.tokenSubject.next(token)),
      shareReplay(1)
    );
  }
}
