import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChmDataService } from '../../services/chm-data.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.development';
import { WideService } from '../../services/wide.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  isLoggedIn: boolean = false;
  user: any;
  leaderboard: { userId: string; nickname: string, score: number }[] = [];

  constructor(private router: Router, private chmDataService: ChmDataService, private wideService: WideService) {}

  async ngOnInit(): Promise<void> {
    this.chmDataService.getAuthStatus().subscribe(status => {
      this.isLoggedIn = status.loggedIn;
      this.user = status;

      if (!this.isLoggedIn) {
        this.router.navigateByUrl('/');
      } else {
        this.loadLeaderboard();
      }
    });

  }

  loadLeaderboard(): void {
    this.chmDataService.getLeaderboard().subscribe( (data: any) => {
      this.leaderboard = data;
    });
  }

  claimPoap(): void {
    const domain = "cryptohub-poap-claim";
    const authUrl = `${environment.widePoap.serverPresentationUrl}?domain=${domain}`;

    // Update the server config
    this.wideService.updateServerConfig(domain, environment.widePoap.wideConfig).subscribe(
      () => {
        // Config updated successfully, now redirect
        window.location.href = authUrl;
      },
      error => {
        // Handle error scenario
        console.error('Error updating server config:', error);
        // Optionally, redirect or notify the user of the error
      }
    );
  }

  signOut(): void {
    this.chmDataService.signOut().subscribe({
      next: (response) => {
        console.log('Logged out successfully:', response);
        // Here you might want to redirect the user to the login page
        // or update the UI to reflect the logged-out state
      },
      error: (error) => {
        console.error('Logout failed:', error);
        // Optionally handle errors, such as by displaying a notification
      }
    });
  }

  editProfile(): void {
    this.router.navigateByUrl('profile');
  }
}