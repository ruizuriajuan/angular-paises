import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Pais } from '../../interfaces/country.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {
  public pais?:Pais;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountriesService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) =>
          this.countryService.searchCountryByCode(id))
      ).subscribe(pais => {
        if(!pais) return 0;
        return this.pais = pais;
      });
  }

}
