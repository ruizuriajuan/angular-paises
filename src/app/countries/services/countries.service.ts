import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Pais, Region } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Regions } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {
    private apiUrl: string = 'https://restcountries.com/v3.1';

    public cacheStore: CacheStore = {
        byCapital: { term: '', countries: [] },
        byCountries: { term: '', countries: [] },
        byRegion: { region: '', countries: [] },
    }

    constructor(private http: HttpClient) { 
        this.loadFromLocalStorage();
    }

    private saveToLocalStorage() {
        localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
    }

    private loadFromLocalStorage() {
        if (!localStorage.getItem('cacheStore')) return;
        this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
    }

    private getPaisesRequest(url: string): Observable<Pais[]> {
        return this.http.get<Pais[]>(url)
            .pipe(
                catchError(error => of([])),
                //delay(2000)
            );
    }

    searchCapital(query: string): Observable<Pais[]> {
        const url = `${this.apiUrl}/capital/${query}`;
        return this.getPaisesRequest(url)
            .pipe(
                tap(paises => this.cacheStore.byCapital = { term: query, countries: paises }),
                tap( ()=> this.saveToLocalStorage() )
            )
    }

    searchRegion(query: Regions): Observable<Pais[]> {
        const url = `${this.apiUrl}/region/${query}`;
        return this.getPaisesRequest(url)
            .pipe(
                tap(paises => this.cacheStore.byRegion = { region: query, countries: paises }),
                tap( ()=> this.saveToLocalStorage() )
            )
    }

    searchPais(query: string): Observable<Pais[]> {
        const url = `${this.apiUrl}/name/${query}`;
        return this.getPaisesRequest(url)
            .pipe(
                tap(paises => this.cacheStore.byCountries = { term: query, countries: paises }),
                tap( ()=> this.saveToLocalStorage() )
            )

    }

    searchCountryByCode(code: string): Observable<Pais | null> {
        const url = `${this.apiUrl}/alpha/${code}`;
        return this.http.get<Pais[]>(url)
            .pipe(
                map(paises => paises.length > 0 ? paises[0] : null),
                catchError(error => of(null))
            );
    }
}