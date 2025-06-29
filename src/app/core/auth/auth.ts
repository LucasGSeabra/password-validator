import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, shareReplay, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenUrl = `${environment.api_url}/auth/token`;
  private tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  getToken$(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  fetchToken(): Observable<string> {
    return this.http.post<{ access_token: string }>(this.tokenUrl, {}).pipe(
      map((response) => response.access_token),
      tap((token) => this.tokenSubject.next(token)),
      shareReplay(1)
    );
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }
}
