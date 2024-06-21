import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop'
import { Job } from '../shared/interfaces/job.interface';

import { FavoritesService } from '../shared/data/favorites.service';
import { JobsListItemComponent } from '../shared/ui/jobs-list-item/jobs-list-item.component';
import { JobsService } from '../shared/data/jobs.service';



@Component({
  selector: 'app-favorite-jobs',
  standalone: true,
  imports: [
    JobsListItemComponent
  ],
  template: ` 
      @if(favorites()?.length == 0){
        <p>No favorites selected!</p>
      }@else {
        <ul>
        @for (job of favorites(); track $index) {
          <app-jobs-list-item 
            [job]="job" 
            [active]="favoritesService.favorites().includes(job.id)"
            (toggleFavorite)="favoritesService.toggle($event)"/>
        }
        </ul>
      }
  `,
  styles: ``
})
export class FavoritesComponent {
  jobsService = inject(JobsService);
  favoritesService = inject(FavoritesService);
  jobs = toSignal<Job[]>(this.jobsService.getAll());
  favorites = computed(() => this.jobs()?.filter((job) => this.favoritesService.favorites().includes(job.id)))
}
