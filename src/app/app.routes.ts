import { Routes } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { JobDetailComponent } from './job-detail/job-detail.component';

export const routes: Routes = [
    {
        path: '',
        component: JobsComponent
    },
    {
        path: 'favorites',
        component: FavoritesComponent
    },
    {
        path: 'details/:id',
        component: JobDetailComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
