import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ValidatePasswordRequest,
  ValidatePasswordResponse,
} from './models/validatePassword';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  private readonly apiUrl = `${environment.api_url}/validar`;

  constructor(private http: HttpClient) {}

  validatePassword(
    request: ValidatePasswordRequest
  ): Observable<ValidatePasswordResponse> {
    return this.http.post<ValidatePasswordResponse>(this.apiUrl, {
      ...request,
    });
  }
}
