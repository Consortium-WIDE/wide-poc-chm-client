import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WideService {
  private configCache: { [domain: string]: any } = {};
  private apiUrl = environment.wide.wideApiUri;

  constructor(private http: HttpClient) { }

  fetchOAuthConfig(): Observable<any> {
    const domain = environment.wide.domain;

    // Check if config is already cached
    if (this.configCache[domain]) {
      return of(this.configCache[domain]);
    }

    // If not cached, fetch from server
    return this.http.get(`${this.apiUrl}/rp/config/${domain}`).pipe(
      tap(config => {
        // Cache the config for future use
        this.configCache[domain] = config;
      }),
      catchError(this.handleError('getConfig', []))
    );
  }

  updateServerConfig(domain: string): Observable<any> {
    const wideConfig = environment.wide.wideConfig;

    return this.http.post(`${this.apiUrl}/rp/config/${domain}`, wideConfig).pipe(
      catchError(this.handleError('updateServerConfig', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}

