import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Job } from '../../shared/interfaces/job.interface';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  http = inject(HttpClient)

  constructor() { }

  getAll(){
    return this.http.get<Job[]>('/jobs');
  }

  getJob(id: string){
    return this.http.get<Job>(`/jobs/${id}`);
  }

}
