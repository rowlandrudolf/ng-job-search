import { Component, EventEmitter, computed, input, Output } from '@angular/core';
import { Job } from '../../../shared/interfaces/job.interface';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-jobs-list-item',
  standalone: true,
  imports: [RouterLink, NgClass],
  template: `
    <li>
        <img [src]="job().companyLogo" [alt]="job().companyName">
        <div>
          <h2><a [routerLink]="['/details', job().id]">{{job().title}}</a></h2>
          <p>{{ job().companyName}} <br/><small> Reference: {{ job().reference }}</small></p>   
        </div>
        <button [ngClass]="active() ? 'active' : ''" (click)="toggleFavorite.emit(job().id)"> 
          <span 
            id="icon-star-{{job().id}}" 
            class="icon-star" 
            [ngClass]="active() ? 'active' : ''"></span> 
        </button>
  `,
  styles: `
  li {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }
  li div {
    flex-grow: 1;
    padding: 1rem;
  }
  img {
    width: 64px;
    height: 100%;
    border-radius: 8px;
  }
  button {
    border-radius: 8px;

  }
  button.active {
    background: #555;
    border-color: yellow;
  }
  button span.active{
    color: yellow;
  }
  `
})
export class JobsListItemComponent {
  job = input.required<Job>();
  active = input.required<boolean>();
  @Output() toggleFavorite = new EventEmitter<Job['id']>();
}
