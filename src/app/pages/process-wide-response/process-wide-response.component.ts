import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChmDataService } from '../../services/chm-data.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-process-wide-response',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './process-wide-response.component.html',
  styleUrl: './process-wide-response.component.scss'
})
export class ProcessWideResponseComponent implements OnInit {
  data: any = {};

  constructor(private activatedRoute: ActivatedRoute, private chmDataService: ChmDataService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const token = params['token'];

      if (token) {
        this.data = firstValueFrom(this.chmDataService.getDataByToken(token));
      }

    });
  }
}
