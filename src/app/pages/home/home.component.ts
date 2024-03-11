import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { WideService } from '../../services/wide.service';
import { ChmDataService } from '../../services/chm-data.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  userId: string | null = null;

  constructor(private router: Router, private wideService: WideService, private chmDataService: ChmDataService) { }

  ngOnInit(): void {
    this.chmDataService.getAuthStatus().subscribe(status => {
      this.isLoggedIn = status.loggedIn;
      this.userId = status.userId;

      if (status.loggedIn) {
        this.router.navigateByUrl('leaderboard');
      }
    });
  }

  beginPresentationFlow(): void {
    const domain = "cryptohub";
    const authUrl = `${environment.wideRegisterUserPoap.serverPresentationUrl}?domain=${domain}`;

    // Update the server config
    this.wideService.updateServerConfig(domain, environment.wideRegisterUserPoap.wideConfig).subscribe(
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

  //Shared with process-wide-response.component
  beginSignInFlow(): void {
    const domain = "cryptohub_signin";
    const authUrl = `${environment.wideMembership.serverPresentationUrl}?domain=${domain}`;

    // Update the server config
    this.wideService.updateServerConfig(domain, environment.wideMembership.wideConfig).subscribe(
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
}
