import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Job } from '../shared/interfaces/job.interface';
import { FavoritesService } from '../shared/data/favorites.service';
import { JobsListItemComponent } from '../shared/ui/jobs-list-item/jobs-list-item.component';
import { JobsService } from '../shared/data/jobs.service';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [JobsListItemComponent],
  template: `
    <ul>
      @for (job of jobs(); track $index) {
      <app-jobs-list-item
        [job]="job"
        [active]="favoritesService.favorites().includes(job.id)"
        (toggleFavorite)="favoritesService.toggle($event)"/>
      }
    </ul>
  `,
  styles: ``,
})
export class JobsComponent {
  jobsService = inject(JobsService);
  favoritesService = inject(FavoritesService);
  jobs = toSignal<Job[]>(this.jobsService.getAll());
}
