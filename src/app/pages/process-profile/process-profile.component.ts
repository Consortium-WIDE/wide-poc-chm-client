import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChmDataService } from '../../services/chm-data.service';
import { first, firstValueFrom, forkJoin } from 'rxjs';

@Component({
  selector: 'app-process-profile',
  standalone: true,
  imports: [],
  templateUrl: './process-profile.component.html',
  styleUrl: './process-profile.component.scss'
})
export class ProcessProfileComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private chmDataService: ChmDataService) { }

  async ngOnInit(): Promise<void> {
    const params$ = this.activatedRoute.params;
    const queryParams$ = this.activatedRoute.queryParams;

    const both$ = forkJoin({
      params: params$.pipe(first()),
      queryParams: queryParams$.pipe(first())
    });

    const result = await firstValueFrom(both$);
    const operationType = result.params['operationType'];
    const token = result.queryParams['token'];

    if (token) {
      const data = await firstValueFrom(this.chmDataService.getDataByToken(token));
      this.router.navigateByUrl('/profile', { state: { update: { operation: operationType, data: data } } });
    }


  }
}
