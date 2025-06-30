import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ValidatorService } from '../validator-service';
import { ValidatePasswordResponse } from '../models/validatePassword';

/**
 * Interface que define a estrutura do formulário de validação de senha
 * @interface FormData
 */
interface FormData {
  /** Campo de entrada da senha a ser validada */
  password: FormControl<string>;
}

/**
 * Componente responsável por renderizar e gerenciar o formulário de validação de senha.
 *
 * Este componente fornece uma interface completa para:
 * - Entrada de senha com toggle de visibilidade
 * - Validação em tempo real
 * - Exibição de erros específicos
 * - Feedback visual de sucesso/erro
 * - Responsividade completa
 *
 * @component
 * @standalone
 * @selector app-form
 * @templateUrl ./form.html
 * @styleUrl ./form.scss
 *
 * @example
 * ```html
 * <app-form></app-form>
 * ```
 *
 * @author Lucas Gimenez
 * @version 1.0.0
 * @since 2025-06-29
 */
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  /** Serviço para construção de formulários reativos */
  private fb = inject(FormBuilder);

  /** Serviço responsável pela validação de senhas via API */
  private validatorService = inject(ValidatorService);

  /**
   * Formulário reativo para captura e validação da senha
   *
   * Contém validação obrigatória do campo password
   * @type {FormGroup<FormData>}
   */
  form: FormGroup<FormData> = this.fb.group({
    password: this.fb.control<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  /**
   * Signal que armazena o resultado da validação de senha
   *
   * Contém informações sobre se a senha é válida e quais critérios não foram atendidos
   * @type {Signal<ValidatePasswordResponse | null>}
   */
  result = signal<ValidatePasswordResponse | null>(null);

  /**
   * Signal que armazena mensagens de erro gerais
   *
   * Usado para erros de comunicação com a API ou erros não relacionados à validação
   * @type {Signal<string | null>}
   */
  error = signal<string | null>(null);

  /**
   * Signal que controla a visibilidade da senha no campo de input
   *
   * - `true`: senha oculta (tipo password)
   * - `false`: senha visível (tipo text)
   * @type {Signal<boolean>}
   * @default true
   */
  hidePassword = signal<boolean>(true);

  /**
   * Alterna a visibilidade da senha entre oculta e visível
   *
   * Utilizado pelo botão de toggle no campo de senha para permitir
   * que o usuário visualize ou oculte a senha digitada
   *
   * @method
   * @returns {void}
   *
   * @example
   * ```typescript
   * // No template
   * <button (click)="togglePasswordVisibility()">
   *   <mat-icon>{{ hidePassword() ? 'visibility' : 'visibility_off' }}</mat-icon>
   * </button>
   * ```
   */
  togglePasswordVisibility(): void {
    this.hidePassword.update((hidden) => !hidden);
  }

  /**
   * Limpa todos os campos do formulário e reseta os estados
   *
   * Esta função:
   * - Reseta o formulário para valores iniciais
   * - Limpa o resultado da validação
   * - Remove mensagens de erro
   *
   * @method
   * @returns {void}
   *
   * @example
   * ```typescript
   * // Chamado pelo botão "Limpar"
   * <button (click)="clearForm()">Limpar</button>
   * ```
   */
  clearForm(): void {
    this.form.reset();
    this.result.set(null);
    this.error.set(null);
  }

  /**
   * Processa o envio do formulário e executa a validação da senha
   *
   * Fluxo de execução:
   * 1. Verifica se o formulário é válido
   * 2. Limpa resultados anteriores
   * 3. Envia a senha para validação via API
   * 4. Atualiza os signals com o resultado ou erro
   *
   * @method
   * @returns {void}
   *
   * @example
   * ```typescript
   * // Chamado automaticamente pelo submit do form
   * <form (ngSubmit)="onSubmit()">
   *   <!-- campos do formulário -->
   *   <button type="submit">Validar Senha</button>
   * </form>
   * ```
   *
   * @throws {Error} Em caso de falha na comunicação com a API
   */
  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.result.set(null);
    this.error.set(null);

    const payload = this.form.getRawValue();

    this.validatorService.validatePassword(payload).subscribe({
      next: (response) => this.result.set(response),
      error: () => this.error.set('Erro ao validar a senha.'),
    });
  }
}
