import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { WideService } from '../../services/wide.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private wideService: WideService) { }

  beginPresentationFlow(): void {
    const domain = "cryptohub";
    const authUrl = `${environment.wide.serverPresentationUrl}?domain=${domain}`;

    // Update the server config
    this.wideService.updateServerConfig(domain).subscribe(
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
