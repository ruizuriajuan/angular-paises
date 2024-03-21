import { Component, OnInit } from '@angular/core';
import { SearchBoxComponent } from '../../../shared/components/search-box/search-box.component';
import { CountriesService } from '../../services/countries.service';
import { Pais } from '../../interfaces/country.interface';
import { CountryTableComponent } from '../../components/country-table/country-table.component';

@Component({
  selector: 'app-by-capital-page',
  standalone: true,
  imports: [SearchBoxComponent,CountryTableComponent],
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {
  public paises: Pais[] = [];
  public inicialValue: string = '';

  constructor(private countryService: CountriesService){
    console.log('cons',countryService);
    
   }

  ngOnInit(): void {
    this.paises = this.countryService.cacheStore.byCapital.countries;
    this.inicialValue = this.countryService.cacheStore.byCapital.term;
  }

  searchByCapital( term:string)  {
    this.countryService.searchCapital(term)
    .subscribe( paises =>{ this.paises = paises });
  }
}
