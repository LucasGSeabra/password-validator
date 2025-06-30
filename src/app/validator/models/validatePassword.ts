/**
 * @fileoverview Definições de tipos para a API de validação de senhas
 *
 * Este arquivo contém as interfaces TypeScript que definem a estrutura
 * das requisições e respostas da API de validação de senhas.
 *
 * @author Lucas Gimenez
 * @version 1.0.0
 * @since 2025-06-29
 */

/**
 * Interface que define a estrutura da requisição para validação de senha
 *
 * Esta interface é utilizada para enviar dados para a API de validação,
 * garantindo type safety e consistência na estrutura dos dados.
 *
 * @interface ValidatePasswordRequest
 *
 * @example
 * ```typescript
 * const request: ValidatePasswordRequest = {
 *   password: 'MinhaSenh@123'
 * };
 *
 * validatorService.validatePassword(request);
 * ```
 */
export interface ValidatePasswordRequest {
  /**
   * A senha a ser validada
   *
   * Deve conter a senha em texto plano que será enviada para o servidor
   * para validação contra as regras de segurança configuradas.
   *
   * @type {string}
   * @example 'MinhaSenh@123'
   */
  password: string;
}

/**
 * Interface que define a estrutura da resposta da validação de senha
 *
 * Esta interface representa a resposta retornada pela API após o processo
 * de validação, incluindo o status de validade e possíveis mensagens de erro.
 *
 * @interface ValidatePasswordResponse
 *
 * @example
 * ```typescript
 * // Senha válida
 * const validResponse: ValidatePasswordResponse = {
 *   isValid: true,
 *   messages: []
 * };
 *
 * // Senha inválida
 * const invalidResponse: ValidatePasswordResponse = {
 *   isValid: false,
 *   messages: [
 *     'A senha deve ter pelo menos 8 caracteres',
 *     'A senha deve conter pelo menos uma letra maiúscula'
 *   ]
 * };
 * ```
 */
export interface ValidatePasswordResponse {
  /**
   * Indica se a senha atende a todos os critérios de validação
   *
   * - `true`: A senha é válida e atende a todos os requisitos
   * - `false`: A senha não atende a um ou mais critérios
   *
   * @type {boolean}
   */
  isValid: boolean;

  /**
   * Lista de mensagens descrevendo os critérios não atendidos
   *
   * Quando `isValid` é `false`, este array conterá uma lista de strings
   * descrevendo quais critérios de validação a senha não atendeu.
   *
   * Quando `isValid` é `true`, este array estará vazio ou undefined.
   *
   * @type {string[] | undefined}
   * @optional
   *
   * @example
   * [
   *   'A senha deve ter pelo menos 8 caracteres',
   *   'A senha deve conter pelo menos uma letra maiúscula',
   *   'A senha deve conter pelo menos um número'
   * ]
   */
  messages?: string[];
}
