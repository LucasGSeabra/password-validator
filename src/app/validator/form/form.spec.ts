import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { Form } from './form';
import { ValidatorService } from '../validator-service';
import { ValidatePasswordResponse } from '../models/validatePassword';

describe('Form', () => {
  let component: Form;
  let fixture: ComponentFixture<Form>;
  let mockValidatorService: jest.Mocked<ValidatorService>;

  beforeEach(async () => {
    const spy = {
      validatePassword: jest.fn(),
    } as unknown as jest.Mocked<ValidatorService>;

    await TestBed.configureTestingModule({
      imports: [
        Form,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: ValidatorService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(Form);
    component = fixture.componentInstance;
    mockValidatorService = TestBed.inject(
      ValidatorService
    ) as jest.Mocked<ValidatorService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty password', () => {
    expect(component.form.get('password')?.value).toBe('');
    expect(component.form.get('password')?.hasError('required')).toBeTruthy();
  });

  it('should toggle password visibility', () => {
    expect(component.hidePassword()).toBeTruthy();

    component.togglePasswordVisibility();
    expect(component.hidePassword()).toBeFalsy();

    component.togglePasswordVisibility();
    expect(component.hidePassword()).toBeTruthy();
  });

  it('should clear form and reset signals', () => {
    // Set some values
    component.form.patchValue({ password: 'test123' });
    component.result.set({ isValid: true });
    component.error.set('Some error');

    // Clear form
    component.clearForm();

    // Check if everything is reset
    expect(component.form.get('password')?.value).toBe('');
    expect(component.result()).toBeNull();
    expect(component.error()).toBeNull();
  });

  it('should not submit invalid form', () => {
    jest.spyOn(mockValidatorService, 'validatePassword');

    component.onSubmit();

    expect(mockValidatorService.validatePassword).not.toHaveBeenCalled();
  });

  it('should submit valid form and handle success', () => {
    const mockResponse: ValidatePasswordResponse = { isValid: true };
    mockValidatorService.validatePassword.mockReturnValue(of(mockResponse));

    component.form.patchValue({ password: 'ValidPassword123!' });
    component.onSubmit();

    expect(mockValidatorService.validatePassword).toHaveBeenCalledWith({
      password: 'ValidPassword123!',
    });
    expect(component.result()).toEqual(mockResponse);
    expect(component.error()).toBeNull();
  });

  it('should handle validation errors', () => {
    const mockResponse: ValidatePasswordResponse = {
      isValid: false,
      messages: ['Password too weak'],
    };
    mockValidatorService.validatePassword.mockReturnValue(of(mockResponse));

    component.form.patchValue({ password: 'weak' });
    component.onSubmit();

    expect(component.result()).toEqual(mockResponse);
    expect(component.error()).toBeNull();
  });

  it('should handle HTTP errors', () => {
    mockValidatorService.validatePassword.mockReturnValue(
      throwError(() => new Error('Network error'))
    );

    component.form.patchValue({ password: 'test123' });
    component.onSubmit();

    expect(component.result()).toBeNull();
    expect(component.error()).toBe('Erro ao validar a senha.');
  });

  /**
   * Testes adicionais para aumentar cobertura
   */
  it('should handle different HTTP error types', () => {
    // Test with HTTP error response
    const httpError = {
      status: 500,
      statusText: 'Internal Server Error',
      error: { message: 'Server error' },
    };

    mockValidatorService.validatePassword.mockReturnValue(
      throwError(() => httpError)
    );

    component.form.patchValue({ password: 'test123' });
    component.onSubmit();

    expect(component.result()).toBeNull();
    expect(component.error()).toBe('Erro ao validar a senha.');
  });

  it('should handle form state during submission', () => {
    const mockResponse: ValidatePasswordResponse = { isValid: true };
    mockValidatorService.validatePassword.mockReturnValue(of(mockResponse));

    component.form.patchValue({ password: 'ValidPassword123!' });

    // Check form is not pending initially
    expect(component.form.pending).toBeFalsy();

    component.onSubmit();

    expect(component.result()).toEqual(mockResponse);
  });

  it('should preserve password visibility state after form operations', () => {
    // Change visibility
    component.togglePasswordVisibility();
    expect(component.hidePassword()).toBeFalsy();

    // Submit form
    const mockResponse: ValidatePasswordResponse = { isValid: true };
    mockValidatorService.validatePassword.mockReturnValue(of(mockResponse));
    component.form.patchValue({ password: 'test' });
    component.onSubmit();

    // Visibility should be preserved
    expect(component.hidePassword()).toBeFalsy();

    // Clear form
    component.clearForm();

    // Visibility should be preserved after clear
    expect(component.hidePassword()).toBeFalsy();
  });

  it('should handle empty validation response', () => {
    const mockResponse: ValidatePasswordResponse = {
      isValid: false,
      messages: [], // Empty messages array
    };
    mockValidatorService.validatePassword.mockReturnValue(of(mockResponse));

    component.form.patchValue({ password: 'test' });
    component.onSubmit();

    expect(component.result()).toEqual(mockResponse);
    expect(component.error()).toBeNull();
  });

  it('should handle validation response without messages property', () => {
    const mockResponse: ValidatePasswordResponse = {
      isValid: false,
      // No messages property
    };
    mockValidatorService.validatePassword.mockReturnValue(of(mockResponse));

    component.form.patchValue({ password: 'test' });
    component.onSubmit();

    expect(component.result()).toEqual(mockResponse);
    expect(component.error()).toBeNull();
  });

  it('should maintain form validation state correctly', () => {
    // Form should be invalid initially (empty password)
    expect(component.form.invalid).toBeTruthy();
    expect(component.form.get('password')?.hasError('required')).toBeTruthy();

    // Form should be valid with password
    component.form.patchValue({ password: 'test123' });
    expect(component.form.valid).toBeTruthy();
    expect(component.form.get('password')?.hasError('required')).toBeFalsy();

    // Form should be invalid again when cleared
    component.clearForm();
    expect(component.form.invalid).toBeTruthy();
    expect(component.form.get('password')?.hasError('required')).toBeTruthy();
  });

  it('should reset error state on new submission', () => {
    // First submission with error
    mockValidatorService.validatePassword.mockReturnValue(
      throwError(() => new Error('Network error'))
    );
    component.form.patchValue({ password: 'test123' });
    component.onSubmit();
    expect(component.error()).toBe('Erro ao validar a senha.');

    // Second submission should reset error
    const mockResponse: ValidatePasswordResponse = { isValid: true };
    mockValidatorService.validatePassword.mockReturnValue(of(mockResponse));
    component.onSubmit();
    expect(component.error()).toBeNull();
    expect(component.result()).toEqual(mockResponse);
  });
});
