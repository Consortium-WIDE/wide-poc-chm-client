import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ChmDataService } from '../../services/chm-data.service';
import { WideService } from '../../services/wide.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-claim-poap',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './claim-poap.component.html',
  styleUrl: './claim-poap.component.scss'
})
export class ClaimPoapComponent implements OnInit {
  errorMessage: string | null = null;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private chmDataService: ChmDataService, private wideService: WideService) { }

  async ngOnInit(): Promise<void> {
    const userAuth = await firstValueFrom(this.chmDataService.checkLoginStatus());

    this.activatedRoute.queryParams.subscribe(async (params) => {
      const token = params['token'];

      if (!userAuth.success || !userAuth.userId) {
        console.error('Failed to authenticate user', userAuth);
        this.router.navigateByUrl('/');
      } else {
        const retrievedPresentation = await firstValueFrom(this.chmDataService.getDataByToken(token))

        try {
          await firstValueFrom(this.chmDataService.earnAchievement(userAuth.userId, retrievedPresentation.data))

          this.router.navigateByUrl('/leaderboard');
        } catch (error: any) {
          this.errorMessage = error.error;
        }
      }
    });
  }

  goToLeaderboard(): void {
    this.router.navigateByUrl('/leaderboard');
  }

}
