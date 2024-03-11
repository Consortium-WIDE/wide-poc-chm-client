import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChmDataService {
  private apiUrl: string = environment.chmApiUri;
  private authStatus: BehaviorSubject<{ loggedIn: boolean, wideCredentialId: string | null, nickname: string, email: string | null, userId: string | null }> =
    new BehaviorSubject<{ loggedIn: boolean, wideCredentialId: string | null, nickname: string, email: string | null, userId: string | null }>({ loggedIn: false, wideCredentialId: null, nickname: '', email: null, userId: null });

  constructor(private http: HttpClient) {
    this.initializeAuthStatus(); // Check login status on service initialization
  }

  private initializeAuthStatus(): void {
    this.checkLoginStatus().subscribe({
      next: (response) => {
        if (response.success) {
          console.log('checkLoginStatus A', response);
          // User already logged in
          this.setAuthStatus(true, response.wideCredentialId, response.nickname, response.email, response.userId);
        } else {
          // User not logged in
          this.setAuthStatus(false, null, '', null, null);
        }
      },
      error: (error) => {
        console.error('Error checking login status:', error);
        this.setAuthStatus(false, null, '', null, null); // Consider the user as not logged in if there's an error
      }
    });
  }

  checkLoginStatus(): Observable<any> {
    return this.http.get(`${this.apiUrl}/chm/user/status`, { withCredentials: true });
  }

  authenticate(token: string): Observable<any> {
    return new Observable(observer => {
      this.checkLoginStatus().subscribe({
        next: (statusResponse) => {
          console.log('checkLoginStatus B', statusResponse);
          if (statusResponse.success) {
            // User already logged in, set auth status and userId
            this.setAuthStatus(true, statusResponse.wideCredentialId, statusResponse.nickname, statusResponse.email, statusResponse.userId);
            observer.next(statusResponse);
            observer.complete();
          } else {
            // User not logged in, proceed with authentication
            this.http.post(`${this.apiUrl}/chm/authenticate`, { authToken: token }, { withCredentials: true })
              .subscribe({
                next: (response: any) => {
                  this.setAuthStatus(true, response.user.wideCredentialId, response.user.nickname, response.user.email, response.user.userId); // Set loggedIn true and userId
                  observer.next(response);
                  observer.complete();
                },
                error: (error) => {
                  this.setAuthStatus(false, null, '', null, null); // Reset the status on error
                  observer.error(error);
                }
              });
          }
        },
        error: (error) => {
          // Error when checking login status, likely need to handle or notify the user
          observer.error(error);
        }
      });
    });
  }

  signOut(): Observable<any> {
    return new Observable(observer => {
      this.http.delete(`${this.apiUrl}/chm/signout`, { withCredentials: true }).subscribe({
        next: (response) => {
          this.setAuthStatus(false, null, '', null, null); // Update auth status to logged out
          observer.next(response);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        }
      });
    });
  }

  setAuthStatus(loggedIn: boolean, wideCredentialId: string | null, nickname: string, email: string | null, userId: string | null): void {
    this.authStatus.next({ loggedIn, wideCredentialId: wideCredentialId, nickname, email, userId });
  }

  getAuthStatus() {
    return this.authStatus.asObservable(); // Allow components to subscribe
  }

  getDataByToken(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/chm/data/${token}`);
  }

  registerUser(userId: string, issuer: any, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/chm/user/register/${userId}`, { wideCredentialId: issuer.wideInternalId, data: data }, { withCredentials: true });
  }

  updateUser(userId: string, payload: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/chm/user/update/${userId}`, payload, { withCredentials: true });
  }

  earnAchievement(userId: string, achievementDetails: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/chm/leaderboard/earnAchievement/${userId}`, achievementDetails, { withCredentials: true });
  }

  getUserAchievements(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/chm/user/achievements/${userId}`, { withCredentials: true });
  }

  getUserRankAndScore(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/chm/leaderboard/user/${userId}`, { withCredentials: true });
  }

  getLeaderboard(n: number = 10): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/chm/leaderboard/top/${n}`, { withCredentials: true });
  }

}
