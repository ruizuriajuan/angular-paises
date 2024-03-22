import { Component, OnInit } from '@angular/core';
import { SearchBoxComponent } from '../../../shared/components/search-box/search-box.component';
import { CountriesService } from '../../services/countries.service';
import { Pais } from '../../interfaces/country.interface';
import { CountryTableComponent } from '../../components/country-table/country-table.component';
import { CommonModule } from '@angular/common';
import { Regions } from '../../interfaces/region.type';



@Component({
  selector: 'app-by-region-page',
  standalone: true,
  imports: [SearchBoxComponent,CountryTableComponent,CommonModule],
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit {
  public regiones: Regions[] = ['America','Africa','Europe','Asia','Oceania'];
  public placeholderRegion = 'Buscar por region';
  public paises: Pais[] = [];
  public inicialValue?: Regions ;
  
  constructor(private countryService: CountriesService){ }

  ngOnInit(): void {
    this.paises = this.countryService.cacheStore.byRegion.countries;
    this.inicialValue = this.countryService.cacheStore.byRegion.region;
  }

  searchByRegion( term:Regions)  {
    this.inicialValue = term;
    this.countryService.searchRegion(term)
    .subscribe( paises =>{ this.paises = paises });
  }
}
