import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ChmDataService {
  private apiUrl: string = environment.chmApiUri;

  constructor(private http: HttpClient) { }

  getDataByToken(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/chm/data/${token}`);
  }
}
