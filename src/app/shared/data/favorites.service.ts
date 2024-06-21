
import { Injectable, effect, signal } from '@angular/core';
import { Job } from '../interfaces/job.interface';


@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  favorites = signal<Job['id'][]>(
    window.localStorage.getItem('favorites')
     ? JSON.parse(window.localStorage.getItem('favorites')!)
     : []
  )

  saveLocal = effect(() => window.localStorage.setItem('favorites', JSON.stringify(this.favorites())))

  constructor() { }

  toggle(jobId: number){
    this.favorites().includes(jobId) 
        ? this.favorites.update((ids) => ids.filter((id) => id !== jobId))
        : this.favorites.update((ids) => [jobId, ...ids])
  }
  
}
