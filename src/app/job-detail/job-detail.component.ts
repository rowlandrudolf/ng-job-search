import { Component, OnInit, Signal, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, catchError, switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Location } from '@angular/common';
import { JobsService } from '../shared/data/jobs.service';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [],
  template: `
  
    <button (click)="location.back()">⬅️ Back</button>
    <br/>
    <img [src]="job()?.companyLogo" [alt]="job()?.companyName">
    <h1>{{job()?.title}}</h1>
    <h3>{{job()?.companyName}}, {{ job()?.location}}</h3>

    <span>Published: {{job()?.publishDate}}</span>
    <small>Ref: {{ job()?.reference }}</small>

    <ul class="pills">
      @for (industry of job()?.industries; track $index) {
        <li [innerHTML]="industry"></li>
      }
    </ul>
    <ul class="pills">
      @for (type of job()?.types; track $index) {
        <li [innerHTML]="type"></li>
      }
    </ul>

    <div [innerHTML]="job()?.description"></div>

  `,
  styles: `
    img{
      width: 128px;
      height: auto;
      float: right;
      border-radius: 8px;
    }
    span {
      display: block;
    }
    .pills {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
    }
    .pills li {
      background: #333;
      border: 1px solid #666;
      border-radius: 15px;
      padding: .3rem 1rem;
      margin: .5rem 0;
    }
  `
})
export class JobDetailComponent {
  activeRoute = inject(ActivatedRoute)
  location = inject(Location)
  router = inject(Router)

  jobsService = inject(JobsService)

  job = toSignal(
    this.activeRoute.params.pipe(
      switchMap(({id}) => { 
        return this.jobsService.getJob(id).pipe(
          catchError((err) => this.handleError(err))
        )
      })
    )
  )

  private handleError(err: Error){
    console.error(err)
    this.router.navigate(['']) 
    return EMPTY
  }

}
