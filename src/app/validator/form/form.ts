import { CommonModule } from '@angular/common';
import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ValidatorService } from '../validator-service';
import { ValidatePasswordResponse } from '../models/validatePassword';

interface FormData {
  password: FormControl<string>;
}

@Component({
  selector: 'app-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCard,
  ],
  templateUrl: './form.html',
  styleUrl: './form.scss',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class Form {
  private formBuilder = inject(FormBuilder);
  private validatorService = inject(ValidatorService);

  form: FormGroup<FormData> = this.formBuilder.group({
    password: this.formBuilder.control<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  result = signal<ValidatePasswordResponse | null>(null);
  error = signal<string | null>(null);

  onSubmit(): void {
    if (this.form.invalid) return;

    this.result.set(null);
    this.error.set(null);

    const payload = this.form.getRawValue();

    this.validatorService.validatePassword(payload).subscribe({
      next: (response) => this.result.set(response),
      error: () => this.error.set('Erro ao validar a senha.'),
    });
  }
}
