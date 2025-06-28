import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenUrl = 'http://localhost:8080/api/token';
  private tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  getToken$(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  fetchToken(): Observable<string> {
    return this.http.post<{ access_token: string }>(this.tokenUrl, {}).pipe(
      map((response) => response.access_token),
      tap((token) => this.tokenSubject.next(token))
    );
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }
}
