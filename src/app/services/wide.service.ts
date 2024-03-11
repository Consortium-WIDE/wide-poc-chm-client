import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WideService {
  private apiUrl = environment.widePoap.wideApiUri;

  constructor(private http: HttpClient) { }

  updateServerConfig(domain: string, config: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/rp/config/${domain}`, config).pipe(
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

