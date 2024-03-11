import { Component, OnInit } from '@angular/core';
import { ChmDataService } from '../../services/chm-data.service';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private chmDataService: ChmDataService) { }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.queryParams.subscribe(async (params) => {
      const token = params['token'];

      if (token) {
        await firstValueFrom(this.chmDataService.authenticate(token));
        this.router.navigateByUrl('/');
      }

    });
  }
}
