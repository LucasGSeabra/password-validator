import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ValidatePasswordRequest,
  ValidatePasswordResponse,
} from './models/validatePassword';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  private readonly apiUrl = 'http://localhost:8082/validar';

  constructor(private http: HttpClient) {}

  validatePassword(
    request: ValidatePasswordRequest
  ): Observable<ValidatePasswordResponse> {
    return this.http.post<ValidatePasswordResponse>(this.apiUrl, { request });
  }
}
