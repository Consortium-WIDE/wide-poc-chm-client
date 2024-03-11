import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChmDataService } from '../../services/chm-data.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.development';
import { FormsModule } from '@angular/forms';
import { WideService } from '../../services/wide.service';

@Component({
  selector: 'app-process-wide-response',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './process-wide-response.component.html',
  styleUrl: './process-wide-response.component.scss'
})
export class ProcessWideResponseComponent implements OnInit {
  retrievedPresentation: any = {};
  nickname: string = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private chmDataService: ChmDataService, private wideService: WideService) { }

  async ngOnInit(): Promise<void> {

  }

  async initiateBackIssuance(payload: any): Promise<void> {
    let wideWindow = window.open(`${environment.wideUri}/popup/start`, 'WIDE', 'width=600, height=800');

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
                  allowMultiples: false,
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
            const issuer = event.data;
            await this.registerUser(issuer.data, payload);
            this.chmDataService.setAuthStatus(true, issuer.wideInternalId, payload.data.nickname, payload.data?.email, payload.data.id);

            this.router.navigateByUrl('/');
          }

          if (event.data.status === 'already_exists') {
            this.beginSignInFlow();
          }
        }
      });

    }
  }

  //When registering a new user, register the POAP they signed up with as their first achievement
  async registerUser(issuer: any, payload: any): Promise<void> {
    const userId = issuer.credentialSubject.chmId;
    //NOTE: userId is equivalent to the data storage token
    await firstValueFrom(this.chmDataService.registerUser(userId, issuer, payload.data));
    //Once user is registered, take their first POAP and 'claim' it to put them on leaderboard
    await firstValueFrom(this.chmDataService.earnAchievement(userId, this.retrievedPresentation.data));
  }

  async issueMembershipCredential(): Promise<void> {
    this.activatedRoute.queryParams.subscribe(async (params) => {
      const token = params['token'];

      if (token) {
        this.retrievedPresentation = await firstValueFrom(this.chmDataService.getDataByToken(token));

        let payload: any =
        {
          issuer: {
            label: 'Crypto Hub Membership',
            type: ["CryptoHubMalta"],
            issuer: environment.hostUri,
            credentialSubject: {
              id: this.retrievedPresentation.data.credentialSubject.id,
              chmId: token,
            }
          }
        }

        const baseData = { id: token, nickname: this.nickname }

        let propertyNamesToExtract = ["event_id", "name", "image_url", "startDate", "eventURL"];

        const filteredProperties = this.retrievedPresentation.data.credentialSubject.issuerDomains.map((issuerDomain: any) => issuerDomain.data.credentials).flat().filter((property: any) => propertyNamesToExtract.includes(property.name));

        const extractedProperties = filteredProperties
          .reduce((accumulator: any, currentValue: any) => {
            accumulator[currentValue.name] = currentValue.value;
            return accumulator;
          }, {});

        payload.data = { ...baseData, ...extractedProperties }

        await this.initiateBackIssuance(payload);
      }

    });
  }

  //Shared with home.component
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
}