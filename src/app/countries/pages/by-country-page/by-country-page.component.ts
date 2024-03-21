import { Component, OnInit } from '@angular/core';
import { SearchBoxComponent } from '../../../shared/components/search-box/search-box.component';
import { CountriesService } from '../../services/countries.service';
import { Pais } from '../../interfaces/country.interface';
import { CountryTableComponent } from '../../components/country-table/country-table.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-by-country-page',
  standalone: true,
  imports: [SearchBoxComponent,CommonModule,CountryTableComponent,LoadingSpinnerComponent],
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {
  public placeholderCountry = 'Buscar por pais';
  public paises: Pais[] = [];
  public isLoading:boolean = false; 
  public inicialValue: string = '';

  constructor(private countryService: CountriesService){   }
  
  ngOnInit(): void {
    this.paises = this.countryService.cacheStore.byCountries.countries;
    this.inicialValue = this.countryService.cacheStore.byCountries.term;
  }

  searchByPais( term:string)  {
    this.isLoading = true;
    this.countryService.searchPais(term)
    .subscribe( paises =>{ 
      this.paises = paises 
      this.isLoading = false;
    });
  }
}
