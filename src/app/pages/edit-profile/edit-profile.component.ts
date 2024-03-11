import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChmDataService } from '../../services/chm-data.service';
import { WideService } from '../../services/wide.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment.development';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit {
  isLoggedIn: boolean = false;
  userNickname: any;
  user: any;
  pendingChanges: boolean = false;

  constructor(private router: Router, private chmDataService: ChmDataService, private wideService: WideService) { }

  async ngOnInit(): Promise<void> {
    this.chmDataService.getAuthStatus().subscribe(status => {
      console.log('getAuthStatus', status);
      this.isLoggedIn = status.loggedIn;
      this.user = status;
    });

    const user = await firstValueFrom(this.chmDataService.checkLoginStatus());

    this.userNickname = user.nickname;

    if (!this.isLoggedIn) {
      this.router.navigateByUrl('/');
    }

    let state = null;

    if (this.router.getCurrentNavigation()) {
      // If coming directly via router.navigate()
      state = this.router.getCurrentNavigation()?.extras.state as any;
    } else {
      // If page is refreshed or navigated via URL
      state = history.state;
    }

    if (state?.update) {
      //We received data to update.
      if (state.update.operation == 'email') {
        //We must update the email from the provided credential.
        //This is super simplified and trivialised for the POC, it assumes only the email is fetched and it is the 1st credential
        const email = state.update.data.data.credentialSubject.issuerDomains[0].data.credentials[0].value;
        this.user.email = email;

        this.pendingChanges = true;
      }
    }
  }

  beginOauthFlow(): void {
    const domain = "cryptohub_profile";
    const authUrl = `${environment.wideClaimEmail.serverPresentationUrl}?domain=${domain}`;

    // Update the server config
    this.wideService.updateServerConfig(domain, environment.wideClaimEmail.wideConfig).subscribe(
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

  async updateUserProfile(): Promise<void> {
    //Clone the user object
    let userData = JSON.parse(JSON.stringify(this.user));

    const wideCredentialId = this.user.wideCredentialId;

    delete userData['userId'];
    delete userData['loggedIn'];
    delete userData['wideCredentialId'];

    await this.updateWideCredential(wideCredentialId, userData);

    //Refresh User - Confirm this is not needed.
    //this.user = await firstValueFrom(this.chmDataService.checkLoginStatus());

    this.userNickname = this.user.nickname;
    this.pendingChanges = false;
  }

  async updateWideCredential(wideCredentialId: string, payload: any): Promise<void> {
    console.log(`update credential with id ${wideCredentialId}`, payload);
    let wideWindow = window.open(`${environment.wideUri}/update/start`, 'WIDE', 'width=600, height=800');

    if (!wideWindow) {
      //TODO: Add popups / toasts
      alert('Popup was blocked. Please allow popups for this website.');
    } else {

      window.addEventListener('message', async (event) => {
        // Always check the origin for security reasons
        if (event.origin === environment.wideUri) {
          if (event.data.status === 'ready') {
            // Ensure the popup is not blocked and is fully loaded
            if (wideWindow) {
              // Create and send the message to WIDE popup
              const backIssuanceRequest = {
                config: {
                  wideCredentialId: wideCredentialId,
                  logoUri: environment.popupConfig.logoUri,
                  source: environment.popupConfig.sourceName
                },
                payload: payload
              }

              wideWindow.postMessage(backIssuanceRequest, environment.wideUri);
            } else {
              alert('cannot post message');
            }
          }

          if (event.data.status === 'closed') {
            debugger;
            const issuer = event.data;
            await firstValueFrom(this.chmDataService.updateUser(this.user.userId, payload));
            this.chmDataService.setAuthStatus(true, issuer.wideInternalId, payload.data.nickname, payload.data?.email, payload.data.id);

            this.router.navigateByUrl('/');
          }
        }
      });

    }
  }

  goToLeaderboard(): void {
    this.router.navigateByUrl('/leaderboard');
  }
}
