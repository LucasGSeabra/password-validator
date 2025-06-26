import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

interface FormData {
  senha: FormControl<string>;
}

@Component({
  selector: 'app-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  form: FormGroup<FormData>;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group<FormData>({
      senha: this.fb.control<string>('', { nonNullable: true }),
    });
  }

  onSubmit(): void {
    const dados = this.form.value;
  }
}
