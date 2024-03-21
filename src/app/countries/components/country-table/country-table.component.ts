import { Component, Input } from '@angular/core';
import { Pais } from '../../interfaces/country.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'country-table',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './country-table.component.html',
  styleUrl: './country-table.component.css'
})
export class CountryTableComponent {
  @Input()
  public paises: Pais[] = [];

}
