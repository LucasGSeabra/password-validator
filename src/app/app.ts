import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class App implements OnInit {
  protected title = 'password-validator';
  private authService = inject(AuthService)

  ngOnInit(): void {
    this.authService.fetchToken().subscribe();
  }
}
// OMMHhrEsYom3J2YYZGjdsLcwpn8R0KQE
