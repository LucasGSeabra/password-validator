import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth/auth';

/**
 * Componente raiz da aplicação Password Validator
 *
 * Este é o componente principal que inicializa toda a aplicação,
 * fornecendo a estrutura base e o sistema de roteamento.
 *
 * Características:
 * - Componente standalone (sem módulo)
 * - Utiliza Shadow DOM para encapsulamento de estilos
 * - Integra Angular Material para componentes UI
 * - Configura o sistema de roteamento da aplicação
 *
 * @component
 * @standalone
 * @selector app-root
 * @templateUrl ./app.html
 * @styleUrl ./app.scss
 * @encapsulation ViewEncapsulation.ShadowDom
 *
 * @example
 * ```html
 * <!-- No index.html -->
 * <app-root></app-root>
 * ```
 *
 * @author Lucas Gimenez
 * @version 1.0.0
 * @since 2025-06-29
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class App implements OnInit {
  /**
   * Título da aplicação
   *
   * Usado no template para exibir o nome da aplicação na barra de ferramentas
   * e para configuração de metadados
   *
   * @protected
   * @type {string}
   * @default 'password-validator'
   */
  protected title = 'password-validator';

  private authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.fetchToken().subscribe();
  }
}
